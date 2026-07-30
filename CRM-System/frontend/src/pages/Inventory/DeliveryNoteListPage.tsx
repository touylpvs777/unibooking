import { useTranslation } from 'react-i18next'
import { FileOutput } from 'lucide-react'
import ModulePlaceholderList from '@/components/layout/ModulePlaceholderList'

export default function DeliveryNoteListPage() {
  const { t } = useTranslation()
  return (
    <ModulePlaceholderList
      title={t('deliveryNotes.list.title')}
      subtitle={t('deliveryNotes.list.subtitle')}
      icon={FileOutput}
      flow={{
        steps: [
          { labelKey: 'nav.items.salesOrders', to: '/sales-orders' },
          { labelKey: 'nav.items.deliveryNotes', to: '/inventory/delivery-notes' },
          { labelKey: 'nav.items.goodsIssue', to: '/inventory/goods-issue' },
        ],
        currentIndex: 1,
      }}
      columns={[
        t('deliveryNotes.table.number'),
        t('deliveryNotes.table.customer'),
        t('deliveryNotes.table.soRef'),
        t('deliveryNotes.table.deliveryDate'),
        t('deliveryNotes.table.warehouse'),
        t('common.status'),
      ]}
      emptyMessage={t('deliveryNotes.list.empty')}
    />
  )
}
