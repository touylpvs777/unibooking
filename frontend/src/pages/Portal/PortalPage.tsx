import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  LayoutDashboard,
  Users,
  FileText,
  ShoppingCart,
  Truck,
  ClipboardList,
  Wrench,
  Box,
  Receipt,
  Settings,
  Package,
  Car,
  LogOut,
  Warehouse
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import ThemeToggle from '@/components/ui/ThemeToggle'

interface ModuleCard {
  id: string
  titleLo: string
  titleEn: string
  descLo: string
  descEn: string
  icon: React.ElementType
  colorCls: string
  bgCls: string
  path: string
}

const MODULES: ModuleCard[] = [
  {
    id: 'dashboard',
    titleLo: 'ພາບລວມ (Dashboard)',
    titleEn: 'Overview Dashboard',
    descLo: 'ເບິ່ງສະຖິຕິ ແລະ ຂໍ້ມູນພາບລວມທັງໝົດຂອງອົງກອນ',
    descEn: 'View overall statistics and company overview',
    icon: LayoutDashboard,
    colorCls: 'text-blue-600 dark:text-blue-400',
    bgCls: 'bg-blue-50 dark:bg-blue-900/20',
    path: '/dashboard',
  },
  {
    id: 'store',
    titleLo: 'ລົດຟອກລິບ & ອາໄຫຼ່',
    titleEn: 'Forklift & Parts Store',
    descLo: 'ຈັດການສິນຄ້າ, ສັ່ງຊື້ ແລະ ເບິ່ງລາຍການອາໄຫຼ່',
    descEn: 'Manage products, orders and browse spare parts',
    icon: ShoppingCart,
    colorCls: 'text-emerald-600 dark:text-emerald-400',
    bgCls: 'bg-emerald-50 dark:bg-emerald-900/20',
    path: '/forklift-store',
  },
  {
    id: 'crm',
    titleLo: 'ຈັດການລູກຄ້າ (CRM)',
    titleEn: 'Customer Management',
    descLo: 'ຈັດການຂໍ້ມູນລູກຄ້າ, ປະຫວັດ ແລະ ການຕິດຕໍ່',
    descEn: 'Manage customer records, history and interactions',
    icon: Users,
    colorCls: 'text-indigo-600 dark:text-indigo-400',
    bgCls: 'bg-indigo-50 dark:bg-indigo-900/20',
    path: '/customers',
  },
  {
    id: 'sales',
    titleLo: 'ການຂາຍ (Sales)',
    titleEn: 'Sales Orders',
    descLo: 'ຈັດການໃບສະເໜີລາຄາ ແລະ ໃບສັ່ງຊື້',
    descEn: 'Manage quotations and sales orders',
    icon: FileText,
    colorCls: 'text-amber-600 dark:text-amber-400',
    bgCls: 'bg-amber-50 dark:bg-amber-900/20',
    path: '/sales-orders',
  },
  {
    id: 'rental',
    titleLo: 'ລະບົບເຊົ່າລົດ (Rental)',
    titleEn: 'Rental System',
    descLo: 'ຈັດການສັນຍາເຊົ່າ ແລະ ຕິດຕາມລົດເຊົ່າ',
    descEn: 'Manage rental contracts and track fleets',
    icon: ClipboardList,
    colorCls: 'text-teal-600 dark:text-teal-400',
    bgCls: 'bg-teal-50 dark:bg-teal-900/20',
    path: '/rental-contracts',
  },
  {
    id: 'inventory',
    titleLo: 'ສາງສິນຄ້າ (Inventory)',
    titleEn: 'Inventory Control',
    descLo: 'ຄຸ້ມຄອງສະຕ໋ອກ, ຮັບເຂົ້າ ແລະ ເບີກອອກ',
    descEn: 'Stock control, goods receipt and issue',
    icon: Box,
    colorCls: 'text-violet-600 dark:text-violet-400',
    bgCls: 'bg-violet-50 dark:bg-violet-900/20',
    path: '/inventory',
  },
  {
    id: 'maintenance',
    titleLo: 'ງານສ້ອມແປງ (Maintenance)',
    titleEn: 'Maintenance & Service',
    descLo: 'ຈັດການໃບສັ່ງງານສ້ອມແປງ ແລະ ບຳລຸງຮັກສາ',
    descEn: 'Manage work orders and preventive maintenance',
    icon: Wrench,
    colorCls: 'text-rose-600 dark:text-rose-400',
    bgCls: 'bg-rose-50 dark:bg-rose-900/20',
    path: '/maintenance',
  },
  {
    id: 'finance',
    titleLo: 'ບັນຊີ & ການເງິນ (Finance)',
    titleEn: 'Billing & Finance',
    descLo: 'ຈັດການໃບເກັບເງິນ, ການຮັບຊຳລະ ແລະ ລາຍຮັບ',
    descEn: 'Manage invoices, payments and revenues',
    icon: Receipt,
    colorCls: 'text-cyan-600 dark:text-cyan-400',
    bgCls: 'bg-cyan-50 dark:bg-cyan-900/20',
    path: '/billing',
  },
]

export default function PortalPage() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const user = useAuthStore(s => s.user)
  const logout = useAuthStore(s => s.logout)

  const isLao = (i18n.language || 'lo') === 'lo'

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      {/* Top Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#005BAC] rounded-xl flex items-center justify-center shadow-sm">
            <Warehouse className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">DK Services ERP</h1>
            <p className="text-[11px] text-slate-500 font-medium">Enterprise Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <button
            onClick={() => i18n.changeLanguage(isLao ? 'en' : 'lo')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm font-semibold"
          >
            {isLao ? 'EN' : 'ລາວ'}
          </button>

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1" />

          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{user?.full_name || 'Admin User'}</span>
              <span className="text-[10px] text-[#005BAC] bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full font-bold">
                {user?.role || 'administrator'}
              </span>
            </div>
            <button
              onClick={() => logout()}
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
              title={isLao ? 'ອອກຈາກລະບົບ' : 'Logout'}
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3">
            {isLao ? 'ເລືອກໂມດູນທີ່ຕ້ອງການ' : 'Select a Module'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            {isLao ? 'ກະລຸນາເລືອກລະບົບທີ່ທ່ານຕ້ອງການເຂົ້າໃຊ້ງານໃນມື້ນີ້.' : 'Please select the system module you want to access.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {MODULES.map((module) => (
            <button
              key={module.id}
              onClick={() => navigate(module.path)}
              className="group text-left bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              {/* Ready Status Badge */}
              <div className="absolute top-5 right-5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {isLao ? 'ພ້ອມໃຊ້' : 'Ready'}
              </div>

              <div className={['w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 duration-300', module.bgCls].join(' ')}>
                <module.icon className={module.colorCls} size={28} />
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#005BAC] dark:group-hover:text-blue-400 transition-colors">
                {isLao ? module.titleLo : module.titleEn}
              </h3>
              
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                {isLao ? module.descLo : module.descEn}
              </p>

              <div className="flex items-center text-[#005BAC] dark:text-blue-400 text-xs font-bold gap-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                {isLao ? 'ເປີດໂມດູນ' : 'Open Module'}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}
