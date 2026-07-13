import logging
import uuid
from pathlib import Path

from fastapi import APIRouter, File, HTTPException, UploadFile, status

from app.core.config import settings
from app.core.permissions import PermissionName, require_permission
from app.models.user import User

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/uploads", tags=["Uploads"])

ALLOWED_MIME_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp",
}

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}

DANGEROUS_EXTENSIONS = {
    ".exe", ".bat", ".cmd", ".sh", ".ps1", ".dll", ".so",
    ".php", ".py", ".rb", ".js", ".html", ".htm", ".svg",
}


def _validate_file(file: UploadFile) -> None:
    if file.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"File type '{file.content_type}' is not allowed. Accepted: JPEG, PNG, WebP.",
        )

    filename = file.filename or ""
    ext = Path(filename).suffix.lower()
    if ext in DANGEROUS_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Executable files are not allowed.",
        )
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Extension '{ext}' is not allowed. Accepted: {', '.join(sorted(ALLOWED_EXTENSIONS))}.",
        )


@router.post(
    "/images",
    status_code=status.HTTP_201_CREATED,
    summary="Upload an image",
    response_model=dict,
)
async def upload_image(
    file: UploadFile = File(..., description="Image file (JPEG, PNG, WebP, max 5 MB)"),
    _: User = require_permission(PermissionName.FORKLIFT_UPDATE),
):
    _validate_file(file)

    max_bytes = settings.MAX_UPLOAD_SIZE_MB * 1024 * 1024
    content = await file.read()
    if len(content) > max_bytes:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File size exceeds {settings.MAX_UPLOAD_SIZE_MB} MB limit.",
        )

    upload_dir = Path(settings.UPLOAD_DIR)
    upload_dir.mkdir(parents=True, exist_ok=True)

    ext = Path(file.filename or "image.jpg").suffix.lower()
    unique_name = f"{uuid.uuid4().hex}{ext}"
    file_path = upload_dir / unique_name

    file_path.write_bytes(content)

    url = f"/uploads/images/{unique_name}"
    logger.info("Image uploaded: %s (%d bytes)", url, len(content))

    return {
        "url": url,
        "filename": unique_name,
        "original_name": file.filename,
        "size": len(content),
        "content_type": file.content_type,
    }
