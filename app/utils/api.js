// ລວມສູນກາງ API Endpoints ທັງໝົດຂອງ UniBooking ໄວ້ບ່ອນດຽວ ເພື່ອງ່າຍຕໍ່ການແກ້ໄຂ/ຄົ້ນຫາ
// Matches unibooking-backend's actual controllers -- no global route prefix there.

// Auth (unibooking-backend/src/auth/auth.controller.ts)
export const API_LOGIN = '/auth/login';
export const API_REGISTER = '/auth/register';
export const API_LOGOUT = '/auth/logout';
export const API_ME = '/auth/me';

// Services -- generic catalog (unibooking-backend/src/services/services.controller.ts)
export const API_SEARCH_SERVICES = '/services/search';
// Supplier portal: the current user's own Services (any type), and
// soft-deleting one (sets isActive: false -- see ServicesService.deactivate,
// a real Prisma delete would cascade onto real customers' booking history).
export const API_MY_SERVICES = '/services/me';
export const apiServiceDeactivate = (serviceId) => `/services/${serviceId}/deactivate`;
// Supplier portal: attach already-uploaded image URLs to a service, or
// remove one -- see unibooking-backend/src/services/dto/add-images.dto.ts.
export const apiServiceImages = (serviceId) => `/services/${serviceId}/images`;
export const apiServiceImage = (serviceId, imageId) => `/services/${serviceId}/images/${imageId}`;
// Public -- the Service Details page (?startDate=&endDate= optionally
// included as query params, not part of the path -- see ServicesService.findOne).
export const apiServiceDetail = (serviceId) => `/services/${serviceId}`;

// Vertical-specific create endpoints -- each atomically creates the parent
// Service row plus its vertical detail row (HotelDetails/TourDetails/
// CarRentalDetails). Used by the supplier portal's "Add Item" form.
export const API_CREATE_HOTEL = '/hotels';
export const API_CREATE_TOUR = '/tours';
export const API_CREATE_CAR_RENTAL = '/car-rentals';

// Vertical search APIs -- each targets Service+InventoryPricing with its own
// filter set (unibooking-backend/src/{hotels,transport,tours,car-rentals}/)
export const API_SEARCH_HOTELS = '/hotels/search';
export const API_SEARCH_TRANSPORT = '/transport/search';
export const API_SEARCH_TOURS = '/tours/search';
export const API_SEARCH_CAR_RENTALS = '/car-rentals/search';

// Bookings (unibooking-backend/src/bookings/bookings.controller.ts)
export const API_CREATE_BOOKING = '/bookings';
export const API_GET_MY_BOOKINGS = '/bookings/me';
// Supplier portal: every booking containing at least one of the current
// supplier's services (see BookingsService.findForSupplier).
export const API_SUPPLIER_BOOKINGS = '/bookings/supplier';

// Payments (unibooking-backend/src/payments/payments.controller.ts)
export const API_CREATE_CHECKOUT = '/payments/checkout';
export const apiPaymentStatus = (bookingId) => `/payments/status/${bookingId}`;

// Uploads (unibooking-backend/src/uploads/uploads.controller.ts) -- raw file
// bytes only, no domain link. The supplier portal uploads here first, then
// attaches the returned url(s) to a service via apiServiceImages above.
export const API_UPLOAD_MULTIPLE = '/uploads/multiple';

// Reviews (unibooking-backend/src/reviews/reviews.controller.ts)
export const API_CREATE_REVIEW = '/reviews';
export const apiServiceReviews = (serviceId) => `/services/${serviceId}/reviews`;
// Supplier dashboard's "Average Rating" stat -- across every service the
// caller's supplier profile owns.
export const API_SUPPLIER_RATING_SUMMARY = '/reviews/supplier-summary';

// Videos (unibooking-backend/src/videos/videos.controller.ts)
export const API_LATEST_VIDEOS = '/videos/latest';

// Admin (unibooking-backend/src/admin/admin.controller.ts) -- ADMIN role only
export const API_ADMIN_STATS = '/admin/stats';
export const API_ADMIN_BOOKINGS = '/admin/bookings';
export const apiAdminUpdateUserRole = (userId) => `/admin/users/${userId}/role`;
export const apiAdminUpdateUserStatus = (userId) => `/admin/users/${userId}/status`;

// Users (unibooking-backend/src/users/users.controller.ts) -- ADMIN-only listing
export const API_USERS = '/users';
