export function resolveMediaUrl(url?: string | null): string {
  if (!url) return '';
  // ຖ້າເປັນ URL ເຕັມຢູ່ແລ້ວ
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  // ຖ້າຮູບຢູ່ໃນໂຟນເດີ public ຂອງ Frontend ໃຫ້ໃຊ້ path ນັ້ນເລີຍ
  if (url.startsWith('/images/')) {
    return url;
  }
  // ກໍລະນີອື່ນໆ ເຊັ່ນຮູບທີ່ອັບໂຫຼດເຂົ້າ Backend
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8001';
  return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
}