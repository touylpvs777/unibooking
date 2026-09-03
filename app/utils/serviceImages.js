// Backend ServiceType -> a real local photo to show when a listing has no
// uploaded cover yet (see coverImageFor() below). Picked from what's already
// in public/images/ rather than the old placehold.co text placeholders, so
// cards never depend on an external service just to render a box with a name
// in it. INSURANCE has no per-listing supplier photos at all (it's not a
// physical thing to photograph), so it always shows this banner.
const DEFAULT_SERVICE_IMAGES = {
  HOTEL: '/images/9112_ho_00_p_2048x1536.jpg',
  FLIGHT: '/images/RDPL-34199@PEK_(20231016151056).jpg',
  TRAIN: '/images/Train.jpeg',
  BUS: '/images/book-taxi.png',
  CAR_RENTAL: '/images/car-rental.jpg',
  TOUR: '/images/Wat-Phu-Laos.jpg',
  PACKAGE: '/images/patuxay.jpeg',
  INSURANCE: '/images/Gemini_Generated_Image_er2g79er2g79er2g.jpeg'
}

// Generic fallback for any ServiceType not listed above (or an unexpected
// value from the API) -- a neutral Laos landscape rather than a blank tile.
const FALLBACK_IMAGE = '/images/hero-bg.jpg'

export function defaultImageForType(type) {
  return DEFAULT_SERVICE_IMAGES[type] || FALLBACK_IMAGE
}

// `images` is the oldest upload first (the cover photo) -- see
// ServicesService's searchResultInclude/allImagesInclude on the backend.
// Falls back to a type-appropriate default so a listing with no photos yet
// never renders a broken/empty image.
export function coverImageFor(service) {
  return service?.images?.[0]?.url || defaultImageForType(service?.type)
}
