import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoute from '@/components/layout/PrivateRoute'
import AppLayout from '@/components/layout/AppLayout'
import ToastContainer from '@/components/ui/Toast'
import { Loader2 } from 'lucide-react'

const LoginPage = lazy(() => import('@/pages/Login/LoginPage'))
const DashboardPage = lazy(() => import('@/pages/Dashboard/DashboardPage'))
const CustomersPage = lazy(() => import('@/pages/Customers/CustomersPage'))
const LeadsPage = lazy(() => import('@/pages/Leads/LeadsPage'))
const ActivityPage = lazy(() => import('@/pages/Activity/ActivityPage'))
const ReportsPage = lazy(() => import('@/pages/Reports/ReportsPage'))
const CatalogPage = lazy(() => import('@/pages/Catalog/CatalogPage'))
const ProductDetailPage = lazy(() => import('@/pages/Catalog/ProductDetailPage'))
const BrandsPage = lazy(() => import('@/pages/Catalog/BrandsPage'))
const CategoriesPage = lazy(() => import('@/pages/Catalog/CategoriesPage'))
const ImportPage = lazy(() => import('@/pages/Catalog/ImportPage'))
const EquipmentRegistryPage = lazy(() => import('@/pages/Equipment/EquipmentRegistryPage'))
const ForkliftDetailPage = lazy(() => import('@/pages/Equipment/ForkliftDetailPage'))
const QuotationListPage = lazy(() => import('@/pages/Quotations/QuotationListPage'))
const QuotationDetailPage = lazy(() => import('@/pages/Quotations/QuotationDetailPage'))
const QuotationFormPage = lazy(() => import('@/pages/Quotations/QuotationFormPage'))
const RentalContractListPage = lazy(() => import('@/pages/Rental/RentalContractListPage'))
const RentalContractDetailPage = lazy(() => import('@/pages/Rental/RentalContractDetailPage'))
const RentalContractFormPage = lazy(() => import('@/pages/Rental/RentalContractFormPage'))
const MovementListPage = lazy(() => import('@/pages/Movement/MovementListPage'))
const MovementDetailPage = lazy(() => import('@/pages/Movement/MovementDetailPage'))
const MovementForm = lazy(() => import('@/pages/Movement/MovementForm'))
const MaintenanceDashboardPage = lazy(() => import('@/pages/Maintenance/MaintenanceDashboardPage'))
const WorkOrderListPage = lazy(() => import('@/pages/Maintenance/WorkOrderListPage'))
const WorkOrderDetailPage = lazy(() => import('@/pages/Maintenance/WorkOrderDetailPage'))
const MaintenanceSchedulePage = lazy(() => import('@/pages/Maintenance/MaintenanceSchedulePage'))
const BillingDashboardPage = lazy(() => import('@/pages/Billing/BillingDashboardPage'))
const InvoiceListPage = lazy(() => import('@/pages/Billing/InvoiceListPage'))
const InvoiceDetailPage = lazy(() => import('@/pages/Billing/InvoiceDetailPage'))
const PaymentListPage = lazy(() => import('@/pages/Billing/PaymentListPage'))
const PaymentDetailPage = lazy(() => import('@/pages/Billing/PaymentDetailPage'))
const DepositListPage = lazy(() => import('@/pages/Billing/DepositListPage'))
const DepositDetailPage = lazy(() => import('@/pages/Billing/DepositDetailPage'))
const RevenueRecognitionPage = lazy(() => import('@/pages/Billing/RevenueRecognitionPage'))
const FinanceDashboardPage = lazy(() => import('@/pages/Billing/FinanceDashboardPage'))
const PaymentPage = lazy(() => import('@/pages/Billing/PaymentPage'))
const DepositPage = lazy(() => import('@/pages/Billing/DepositPage'))
const StatementPage = lazy(() => import('@/pages/Billing/StatementPage'))
const InventoryDashboardPage = lazy(() => import('@/pages/Inventory/InventoryDashboardPage'))
const SparePartListPage = lazy(() => import('@/pages/Inventory/SparePartListPage'))
const SparePartDetailPage = lazy(() => import('@/pages/Inventory/SparePartDetailPage'))
const WarehousePage = lazy(() => import('@/pages/Inventory/WarehousePage'))
const PurchaseOrderPage = lazy(() => import('@/pages/Inventory/PurchaseOrderPage'))
const ExecutiveDashboardPage = lazy(() => import('@/pages/Executive/ExecutiveDashboardPage'))

function PageLoader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
      <Loader2 size={24} className="spin" style={{ color: 'var(--color-text-muted)' }} />
    </div>
  )
}

const Placeholder = ({ name }: { name: string }) => (
  <div style={{ padding: 32, color: 'var(--color-text-muted)', fontSize: 15 }}>
    <strong>{name}</strong> — coming soon.
  </div>
)

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Suspense fallback={<PageLoader />}><LoginPage /></Suspense>} />

        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Suspense fallback={<PageLoader />}><DashboardPage /></Suspense>} />
            <Route path="/customers" element={<Suspense fallback={<PageLoader />}><CustomersPage /></Suspense>} />
            <Route path="/leads"    element={<Suspense fallback={<PageLoader />}><LeadsPage /></Suspense>} />
            <Route path="/activity" element={<Suspense fallback={<PageLoader />}><ActivityPage /></Suspense>} />
            <Route path="/reports"  element={<Suspense fallback={<PageLoader />}><ReportsPage /></Suspense>} />
            <Route path="/settings" element={<Placeholder name="Settings" />} />

            <Route path="/catalog"                element={<Suspense fallback={<PageLoader />}><CatalogPage /></Suspense>} />
            <Route path="/catalog/products/:id"   element={<Suspense fallback={<PageLoader />}><ProductDetailPage /></Suspense>} />
            <Route path="/catalog/brands"          element={<Suspense fallback={<PageLoader />}><BrandsPage /></Suspense>} />
            <Route path="/catalog/categories"      element={<Suspense fallback={<PageLoader />}><CategoriesPage /></Suspense>} />
            <Route path="/catalog/import"          element={<Suspense fallback={<PageLoader />}><ImportPage /></Suspense>} />

            <Route path="/equipment"              element={<Suspense fallback={<PageLoader />}><EquipmentRegistryPage /></Suspense>} />
            <Route path="/equipment/:id"          element={<Suspense fallback={<PageLoader />}><ForkliftDetailPage /></Suspense>} />

            <Route path="/quotations"             element={<Suspense fallback={<PageLoader />}><QuotationListPage /></Suspense>} />
            <Route path="/quotations/new"         element={<Suspense fallback={<PageLoader />}><QuotationFormPage /></Suspense>} />
            <Route path="/quotations/:id"         element={<Suspense fallback={<PageLoader />}><QuotationDetailPage /></Suspense>} />

            <Route path="/rental-contracts"       element={<Suspense fallback={<PageLoader />}><RentalContractListPage /></Suspense>} />
            <Route path="/rental-contracts/new"   element={<Suspense fallback={<PageLoader />}><RentalContractFormPage /></Suspense>} />
            <Route path="/rental-contracts/:id"   element={<Suspense fallback={<PageLoader />}><RentalContractDetailPage /></Suspense>} />

            <Route path="/movements"              element={<Suspense fallback={<PageLoader />}><MovementListPage /></Suspense>} />
            <Route path="/movements/new"          element={<Suspense fallback={<PageLoader />}><MovementForm /></Suspense>} />
            <Route path="/movements/:id"          element={<Suspense fallback={<PageLoader />}><MovementDetailPage /></Suspense>} />

            <Route path="/billing"                         element={<Suspense fallback={<PageLoader />}><BillingDashboardPage /></Suspense>} />
            <Route path="/billing/invoices"                element={<Suspense fallback={<PageLoader />}><InvoiceListPage /></Suspense>} />
            <Route path="/billing/invoices/:id"            element={<Suspense fallback={<PageLoader />}><InvoiceDetailPage /></Suspense>} />
            <Route path="/billing/payments"                element={<Suspense fallback={<PageLoader />}><PaymentListPage /></Suspense>} />
            <Route path="/billing/payments/:id"            element={<Suspense fallback={<PageLoader />}><PaymentDetailPage /></Suspense>} />
            <Route path="/billing/deposits"                element={<Suspense fallback={<PageLoader />}><DepositListPage /></Suspense>} />
            <Route path="/billing/deposits/:id"            element={<Suspense fallback={<PageLoader />}><DepositDetailPage /></Suspense>} />
            <Route path="/billing/revenue-recognitions"    element={<Suspense fallback={<PageLoader />}><RevenueRecognitionPage /></Suspense>} />
            <Route path="/billing/finance"                 element={<Suspense fallback={<PageLoader />}><FinanceDashboardPage /></Suspense>} />
            <Route path="/billing/payments-unified"        element={<Suspense fallback={<PageLoader />}><PaymentPage /></Suspense>} />
            <Route path="/billing/deposits-unified"        element={<Suspense fallback={<PageLoader />}><DepositPage /></Suspense>} />
            <Route path="/billing/statements"              element={<Suspense fallback={<PageLoader />}><StatementPage /></Suspense>} />

            <Route path="/maintenance"                    element={<Suspense fallback={<PageLoader />}><MaintenanceDashboardPage /></Suspense>} />
            <Route path="/maintenance/work-orders"        element={<Suspense fallback={<PageLoader />}><WorkOrderListPage /></Suspense>} />
            <Route path="/maintenance/work-orders/new"    element={<Placeholder name="New Work Order" />} />
            <Route path="/maintenance/work-orders/:id"    element={<Suspense fallback={<PageLoader />}><WorkOrderDetailPage /></Suspense>} />
            <Route path="/maintenance/schedules"          element={<Suspense fallback={<PageLoader />}><MaintenanceSchedulePage /></Suspense>} />

            <Route path="/inventory"                      element={<Suspense fallback={<PageLoader />}><InventoryDashboardPage /></Suspense>} />
            <Route path="/inventory/parts"                element={<Suspense fallback={<PageLoader />}><SparePartListPage /></Suspense>} />
            <Route path="/inventory/parts/new"            element={<Placeholder name="New Spare Part" />} />
            <Route path="/inventory/parts/:id"            element={<Suspense fallback={<PageLoader />}><SparePartDetailPage /></Suspense>} />
            <Route path="/inventory/warehouses"           element={<Suspense fallback={<PageLoader />}><WarehousePage /></Suspense>} />
            <Route path="/inventory/purchase-orders"      element={<Suspense fallback={<PageLoader />}><PurchaseOrderPage /></Suspense>} />

            <Route path="/executive"                     element={<Suspense fallback={<PageLoader />}><ExecutiveDashboardPage /></Suspense>} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  )
}
