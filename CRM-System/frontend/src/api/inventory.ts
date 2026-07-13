import client from './client'
import type { SparePart, SparePartListResponse, SparePartCreate, PartListParams, Warehouse, InventoryBalance, InventoryTransaction, PurchaseOrder, POListResponse, DashboardSummary } from '@/types/inventory'

const B = '/inventory'

export const getDashboard = () => client.get<DashboardSummary>(`${B}/dashboard`)

export const getParts = (params?: PartListParams) => client.get<SparePartListResponse>(`${B}/parts`, { params })
export const getPart = (id: number) => client.get<SparePart>(`${B}/parts/${id}`)
export const createPart = (data: SparePartCreate) => client.post<SparePart>(`${B}/parts`, data)
export const updatePart = (id: number, data: Record<string, unknown>) => client.put<SparePart>(`${B}/parts/${id}`, data)

export const getWarehouses = () => client.get<Warehouse[]>(`${B}/warehouses`)
export const createWarehouse = (data: { code: string; name: string; address?: string }) => client.post<Warehouse>(`${B}/warehouses`, data)

export const getBalances = (params?: { spare_part_id?: number; warehouse_id?: number }) => client.get<InventoryBalance[]>(`${B}/balances`, { params })
export const getTransactions = (params?: { spare_part_id?: number; warehouse_id?: number }) => client.get<InventoryTransaction[]>(`${B}/transactions`, { params })
export const createTransaction = (data: { transaction_type: string; spare_part_id: number; warehouse_id: number; quantity: number; unit_cost?: number; notes?: string }) => client.post<InventoryTransaction>(`${B}/transactions`, data)

export const getPurchaseOrders = (params?: { status?: string; page?: number; page_size?: number }) => client.get<POListResponse>(`${B}/purchase-orders`, { params })
export const getPurchaseOrder = (id: number) => client.get<PurchaseOrder>(`${B}/purchase-orders/${id}`)
export const createPurchaseOrder = (data: Record<string, unknown>) => client.post<PurchaseOrder>(`${B}/purchase-orders`, data)
export const submitPO = (id: number) => client.post<PurchaseOrder>(`${B}/purchase-orders/${id}/submit`)
export const receivePO = (id: number, items: { item_id: number; quantity_received: number }[]) => client.post<PurchaseOrder>(`${B}/purchase-orders/${id}/receive`, items)

export const consumePart = (data: { spare_part_id: number; warehouse_id: number; quantity: number; work_order_id?: number; forklift_id?: number; notes?: string }) => client.post(`${B}/consume`, data)
export const getConsumptions = (params?: { spare_part_id?: number; work_order_id?: number }) => client.get(`${B}/consumptions`, { params })
