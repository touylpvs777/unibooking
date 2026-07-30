import { useTranslation } from 'react-i18next'
import { FileCheck2 } from 'lucide-react'
import ModulePlaceholderList from '@/components/layout/ModulePlaceholderList'

export default function SalesOrderListPage() {
  const { t } = useTranslation()
  return (
    <ModulePlaceholderList
      title={t('salesOrders.list.title')}
      subtitle={t('salesOrders.list.subtitle')}
      icon={FileCheck2}
      flow={{
        steps: [
          { labelKey: 'nav.items.quotations', to: '/quotations' },
          { labelKey: 'nav.items.salesOrders', to: '/sales-orders' },
          { labelKey: 'nav.items.deliveryNotes', to: '/inventory/delivery-notes' },
        ],
        currentIndex: 1,
      }}
      columns={[
        t('salesOrders.table.number'),
        t('salesOrders.table.customer'),
        t('salesOrders.table.quotationRef'),
        t('salesOrders.table.orderDate'),
        t('common.status'),
        t('common.total'),
      ]}
      emptyMessage={t('salesOrders.list.empty')}
    />
  )
}
