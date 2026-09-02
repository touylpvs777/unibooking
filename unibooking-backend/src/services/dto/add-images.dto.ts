import { ArrayMaxSize, ArrayMinSize, IsArray, IsUrl } from 'class-validator';

/**
 * Attaches already-uploaded image URLs to a service -- the client uploads
 * bytes via POST /uploads/multiple first (see UploadsController), then
 * posts the resulting URLs here. `require_tld: false` so a local dev
 * upload (http://localhost:3001/uploads/...) validates the same as a real
 * production host.
 */
export class AddImagesDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsUrl({ require_tld: false }, { each: true })
  urls!: string[];
}
