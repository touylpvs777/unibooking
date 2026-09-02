<template>
  <div class="supplier-inventory">
    <div class="supplier-inventory__header">
      <h1 class="supplier-inventory__title">ຈັດການສິນຄ້າ</h1>
      <a-button type="primary" @click="openAddModal">
        <template #icon><PlusOutlined /></template>
        Add Item
      </a-button>
    </div>

    <a-alert
      v-if="inventoryStore.error"
      type="error"
      :message="inventoryStore.error"
      show-icon
      closable
      class="supplier-inventory__error"
      @close="inventoryStore.error = null"
    />

    <a-card :bordered="false">
      <a-table
        :columns="columns"
        :data-source="inventoryStore.services"
        :loading="inventoryStore.isLoading"
        row-key="id"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'type'">
            <a-tag :color="typeTagMeta(record.type).color">
              {{ typeTagMeta(record.type).text }}
            </a-tag>
          </template>

          <template v-else-if="column.key === 'price'">
            {{ nextAvailability(record) ? `${formatPrice(nextAvailability(record).price)} ກີບ` : '—' }}
          </template>

          <template v-else-if="column.key === 'availableUnits'">
            {{ nextAvailability(record) ? `${nextAvailability(record).availableUnits} ໜ່ວຍ` : 'ຍັງບໍ່ໄດ້ຕັ້ງລາຄາ' }}
          </template>

          <template v-else-if="column.key === 'isActive'">
            <a-tag :color="record.isActive ? 'success' : 'default'">
              {{ record.isActive ? 'ເປີດໃຫ້ຈອງ' : 'ປິດຮັບຈອງ' }}
            </a-tag>
          </template>

          <template v-else-if="column.key === 'actions'">
            <a-space>
              <a-button size="small" @click="openImagesModal(record)">
                <template #icon><PictureOutlined /></template>
                Images
              </a-button>
              <a-button size="small" @click="handleEdit">
                <template #icon><EditOutlined /></template>
                Edit
              </a-button>
              <a-popconfirm
                title="ລຶບສິນຄ້ານີ້ອອກຈາກລາຍການ?"
                ok-text="ລຶບ"
                cancel-text="ຍົກເລີກ"
                @confirm="handleDelete(record)"
              >
                <a-button
                  size="small"
                  danger
                  :loading="inventoryStore.deactivatingId === record.id"
                >
                  <template #icon><DeleteOutlined /></template>
                  Delete
                </a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>

    <a-modal
      v-model:open="isAddModalOpen"
      title="Add Item"
      :confirm-loading="inventoryStore.isSubmitting"
      ok-text="ບັນທຶກ"
      cancel-text="ຍົກເລີກ"
      @ok="handleSubmit"
      @cancel="closeAddModal"
    >
      <a-form ref="formRef" layout="vertical" :model="form">
        <a-form-item label="ປະເພດສິນຄ້າ" name="type" :rules="[{ required: true, message: 'ກະລຸນາເລືອກປະເພດ' }]">
          <a-select v-model:value="form.type" placeholder="ເລືອກປະເພດ">
            <a-select-option value="HOTEL">Room</a-select-option>
            <a-select-option value="TOUR">Tour</a-select-option>
            <a-select-option value="CAR_RENTAL">Car Rental</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          label="ຊື່"
          name="name"
          :rules="[
            { required: true, message: 'ກະລຸນາປ້ອນຊື່' },
            { min: 3, message: 'ຊື່ຕ້ອງມີຢ່າງໜ້ອຍ 3 ຕົວອັກສອນ' }
          ]"
        >
          <a-input v-model:value="form.name" placeholder="ຕົວຢ່າງ: Deluxe Double Room" />
        </a-form-item>

        <a-form-item
          label="ລາຍລະອຽດ"
          name="description"
          :rules="[
            { required: true, message: 'ກະລຸນາປ້ອນລາຍລະອຽດ' },
            { min: 10, message: 'ລາຍລະອຽດຕ້ອງມີຢ່າງໜ້ອຍ 10 ຕົວອັກສອນ' }
          ]"
        >
          <a-textarea v-model:value="form.description" :rows="3" placeholder="ອະທິບາຍສິນຄ້ານີ້..." />
        </a-form-item>

        <a-form-item label="ສະຖານທີ່" name="location" :rules="[{ required: true, message: 'ກະລຸນາປ້ອນສະຖານທີ່' }]">
          <a-input v-model:value="form.location" placeholder="ຕົວຢ່າງ: Vientiane, Laos" />
        </a-form-item>

        <template v-if="form.type === 'HOTEL'">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item
                label="ລະດັບດາວ"
                name="starRating"
                :rules="[{ required: true, type: 'number', min: 1, max: 5, message: '1-5 ດາວ' }]"
              >
                <a-input-number v-model:value="form.starRating" :min="1" :max="5" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="ປະເພດທີ່ພັກ"
                name="propertyType"
                :rules="[{ required: true, message: 'ກະລຸນາເລືອກປະເພດທີ່ພັກ' }]"
              >
                <a-select v-model:value="form.propertyType" placeholder="ເລືອກ">
                  <a-select-option value="HOTEL">Hotel</a-select-option>
                  <a-select-option value="RESORT">Resort</a-select-option>
                  <a-select-option value="VILLA">Villa</a-select-option>
                  <a-select-option value="GUESTHOUSE">Guesthouse</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>

          <a-form-item label="ສິ່ງອຳນວຍຄວາມສະດວກ (ບໍ່ບັງຄັບ)" name="amenities">
            <a-select v-model:value="form.amenities" mode="tags" placeholder="ພິມແລ້ວກົດ Enter ເພື່ອເພີ່ມ" />
          </a-form-item>
        </template>

        <template v-else-if="form.type === 'TOUR'">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item
                label="ໄລຍະເວລາ (ວັນ)"
                name="durationDays"
                :rules="[{ required: true, type: 'number', min: 1, message: 'ຢ່າງໜ້ອຍ 1 ວັນ' }]"
              >
                <a-input-number v-model:value="form.durationDays" :min="1" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="ໝວດໝູ່"
                name="category"
                :rules="[{ required: true, message: 'ກະລຸນາປ້ອນໝວດໝູ່' }]"
              >
                <a-input v-model:value="form.category" placeholder="ຕົວຢ່າງ: Adventure" />
              </a-form-item>
            </a-col>
          </a-row>

          <a-form-item
            label="ລະດັບຄວາມຍາກ"
            name="difficulty"
            :rules="[{ required: true, message: 'ກະລຸນາເລືອກລະດັບຄວາມຍາກ' }]"
          >
            <a-select v-model:value="form.difficulty" placeholder="ເລືອກ">
              <a-select-option value="EASY">Easy</a-select-option>
              <a-select-option value="MODERATE">Moderate</a-select-option>
              <a-select-option value="HARD">Hard</a-select-option>
            </a-select>
          </a-form-item>

          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item
                label="ຈຳນວນຄົນຕ່ຳສຸດ"
                name="minGroupSize"
                :rules="[{ required: true, type: 'number', min: 1, message: 'ຢ່າງໜ້ອຍ 1 ຄົນ' }]"
              >
                <a-input-number v-model:value="form.minGroupSize" :min="1" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="ຈຳນວນຄົນສູງສຸດ"
                name="maxGroupSize"
                :rules="[{ required: true, validator: validateMaxGroupSize }]"
              >
                <a-input-number v-model:value="form.maxGroupSize" :min="1" style="width: 100%" />
              </a-form-item>
            </a-col>
          </a-row>
        </template>

        <template v-else-if="form.type === 'CAR_RENTAL'">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item
                label="ປະເພດລົດ"
                name="vehicleType"
                :rules="[{ required: true, message: 'ກະລຸນາເລືອກປະເພດລົດ' }]"
              >
                <a-select v-model:value="form.vehicleType" placeholder="ເລືອກ">
                  <a-select-option value="SEDAN">Sedan</a-select-option>
                  <a-select-option value="SUV">SUV</a-select-option>
                  <a-select-option value="VAN">Van</a-select-option>
                  <a-select-option value="PICKUP">Pickup</a-select-option>
                  <a-select-option value="MOTORBIKE">Motorbike</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="ເກຍ"
                name="transmission"
                :rules="[{ required: true, message: 'ກະລຸນາເລືອກເກຍ' }]"
              >
                <a-select v-model:value="form.transmission" placeholder="ເລືອກ">
                  <a-select-option value="MANUAL">Manual</a-select-option>
                  <a-select-option value="AUTOMATIC">Automatic</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>

          <a-form-item
            label="ຈຳນວນບ່ອນນັ່ງ"
            name="seatingCapacity"
            :rules="[{ required: true, type: 'number', min: 1, message: 'ຢ່າງໜ້ອຍ 1 ບ່ອນນັ່ງ' }]"
          >
            <a-input-number v-model:value="form.seatingCapacity" :min="1" style="width: 100%" />
          </a-form-item>
        </template>
      </a-form>
    </a-modal>

    <a-modal
      v-model:open="isImagesModalOpen"
      title="ຈັດການຮູບພາບ"
      :footer="null"
      @cancel="closeImagesModal"
    >
      <div v-if="activeService" class="image-manager">
        <a-alert
          v-if="inventoryStore.error"
          type="error"
          :message="inventoryStore.error"
          show-icon
          closable
          class="image-manager__error"
          @close="inventoryStore.error = null"
        />

        <a-empty v-if="!activeService.images?.length" description="ຍັງບໍ່ມີຮູບພາບ" />
        <div v-else class="image-manager__grid">
          <div v-for="img in activeService.images" :key="img.id" class="image-manager__item">
            <img :src="img.url" :alt="activeService.name" class="image-manager__thumb">
            <a-popconfirm
              title="ລຶບຮູບນີ້?"
              ok-text="ລຶບ"
              cancel-text="ຍົກເລີກ"
              @confirm="handleRemoveImage(img.id)"
            >
              <a-button
                size="small"
                danger
                shape="circle"
                class="image-manager__remove"
                :loading="inventoryStore.removingImageId === img.id"
              >
                <template #icon><DeleteOutlined /></template>
              </a-button>
            </a-popconfirm>
          </div>
        </div>

        <input
          ref="fileInputRef"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          hidden
          @change="handleFilesSelected"
        >
        <a-button
          type="primary"
          block
          :loading="inventoryStore.isUploadingImages"
          class="image-manager__upload-btn"
          @click="fileInputRef?.click()"
        >
          <template #icon><UploadOutlined /></template>
          ອັບໂຫລດຮູບພາບ (ສູງສຸດ 5 ຮູບຕໍ່ຄັ້ງ)
        </a-button>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { PlusOutlined, EditOutlined, DeleteOutlined, PictureOutlined, UploadOutlined } from '@ant-design/icons-vue'
import { useInventoryStore } from '~/stores/inventory'

definePageMeta({ layout: 'supplier', middleware: ['supplier'] })

const inventoryStore = useInventoryStore()

const columns = [
  { title: 'ຊື່', dataIndex: 'name', key: 'name' },
  { title: 'ປະເພດ', key: 'type' },
  { title: 'ລາຄາ', key: 'price' },
  { title: 'ຈຳນວນທີ່ວ່າງ', key: 'availableUnits' },
  { title: 'ສະຖານະ', key: 'isActive' },
  { title: 'ຈັດການ', key: 'actions' }
]

// Backend ServiceType: HOTEL/FLIGHT/TRAIN/BUS/TOUR/CAR_RENTAL/PACKAGE. Only
// HOTEL/TOUR/CAR_RENTAL are creatable from this form (see form.type's
// options below) -- the rest are shown here only in case a FLIGHT/TRAIN/BUS/
// PACKAGE service already exists from elsewhere and shows up in the table.
const TYPE_TAG_MAP = {
  HOTEL: { color: 'blue', text: 'Room' },
  TOUR: { color: 'gold', text: 'Tour' },
  CAR_RENTAL: { color: 'purple', text: 'Car Rental' },
  FLIGHT: { color: 'cyan', text: 'Flight' },
  TRAIN: { color: 'green', text: 'Train' },
  BUS: { color: 'orange', text: 'Bus' },
  PACKAGE: { color: 'default', text: 'Package' }
}

function typeTagMeta(type) {
  return TYPE_TAG_MAP[type] || { color: 'default', text: type }
}

function formatPrice(value) {
  return new Intl.NumberFormat('lo-LA').format(value || 0)
}

// GET /services/me includes at most one InventoryPricing row per service --
// the nearest upcoming date, if any (see ServicesService.findMyServices).
// A freshly created service has none until pricing is set separately.
function nextAvailability(record) {
  return record.inventory?.[0] ?? null
}

// --- Add Item modal ------------------------------------------------------

const isAddModalOpen = ref(false)
const formRef = ref(null)

const EMPTY_FORM = {
  type: undefined,
  name: '',
  description: '',
  location: '',
  // HOTEL
  starRating: undefined,
  propertyType: undefined,
  amenities: [],
  // TOUR
  durationDays: undefined,
  category: '',
  difficulty: undefined,
  minGroupSize: undefined,
  maxGroupSize: undefined,
  // CAR_RENTAL
  vehicleType: undefined,
  transmission: undefined,
  seatingCapacity: undefined
}

const form = reactive({ ...EMPTY_FORM })

async function validateMaxGroupSize(_rule, value) {
  if (value === undefined || value === null) {
    return Promise.reject('ກະລຸນາປ້ອນຈຳນວນຄົນສູງສຸດ')
  }
  if (form.minGroupSize !== undefined && value < form.minGroupSize) {
    return Promise.reject('ຈຳນວນຄົນສູງສຸດຕ້ອງບໍ່ໜ້ອຍກວ່າຈຳນວນຄົນຕ່ຳສຸດ')
  }
  return Promise.resolve()
}

function openAddModal() {
  Object.assign(form, EMPTY_FORM, { amenities: [] })
  isAddModalOpen.value = true
}

function closeAddModal() {
  isAddModalOpen.value = false
  formRef.value?.resetFields()
}

// Strips the form down to exactly the fields the chosen vertical's DTO
// declares -- the backend's ValidationPipe has forbidNonWhitelisted: true,
// so sending e.g. TOUR fields alongside a HOTEL submission would 400.
function buildPayload() {
  const base = {
    name: form.name,
    description: form.description,
    location: form.location
  }

  if (form.type === 'HOTEL') {
    return {
      ...base,
      starRating: form.starRating,
      propertyType: form.propertyType,
      ...(form.amenities?.length ? { amenities: form.amenities } : {})
    }
  }
  if (form.type === 'TOUR') {
    return {
      ...base,
      durationDays: form.durationDays,
      category: form.category,
      difficulty: form.difficulty,
      minGroupSize: form.minGroupSize,
      maxGroupSize: form.maxGroupSize
    }
  }
  // CAR_RENTAL
  return {
    ...base,
    vehicleType: form.vehicleType,
    transmission: form.transmission,
    seatingCapacity: form.seatingCapacity
  }
}

async function handleSubmit() {
  try {
    await formRef.value.validate()
  } catch {
    return // antd already highlights the offending fields
  }

  try {
    await inventoryStore.createService(form.type, buildPayload())
    message.success('ເພີ່ມສິນຄ້າສຳເລັດ')
    closeAddModal()
  } catch {
    // inventoryStore.error is already set and shown via the a-alert above
  }
}

// --- Row actions -----------------------------------------------------------

// No PATCH/edit-service endpoint exists yet -- honest placeholder, same
// "not ready yet" pattern as checkout.vue's disabled payment channels.
function handleEdit() {
  message.info('ຄຸນສົມບັດນີ້ຍັງບໍ່ພ້ອມໃຊ້ງານ.')
}

async function handleDelete(record) {
  try {
    await inventoryStore.deactivateService(record.id)
    message.success('ລຶບສິນຄ້ານີ້ແລ້ວ')
  } catch {
    // inventoryStore.error is already set and shown via the a-alert above
  }
}

// --- Images modal ----------------------------------------------------------
// Tracked by id, not the row object itself -- looked up fresh from
// inventoryStore.services on every render so the modal stays in sync with
// uploadServiceImages/removeServiceImage's in-place mutations of that array.
const isImagesModalOpen = ref(false)
const activeServiceId = ref(null)
const fileInputRef = ref(null)
const activeService = computed(
  () => inventoryStore.services.find((s) => s.id === activeServiceId.value) || null
)

function openImagesModal(record) {
  activeServiceId.value = record.id
  isImagesModalOpen.value = true
}

function closeImagesModal() {
  isImagesModalOpen.value = false
  activeServiceId.value = null
  inventoryStore.error = null
  if (fileInputRef.value) fileInputRef.value.value = ''
}

async function handleFilesSelected(event) {
  const files = Array.from(event.target.files || [])
  if (!files.length || !activeServiceId.value) return

  try {
    await inventoryStore.uploadServiceImages(activeServiceId.value, files)
    message.success('ອັບໂຫລດຮູບພາບສຳເລັດ')
  } catch {
    // inventoryStore.error is already set and shown via the a-alert above
  } finally {
    event.target.value = ''
  }
}

async function handleRemoveImage(imageId) {
  if (!activeServiceId.value) return

  try {
    await inventoryStore.removeServiceImage(activeServiceId.value, imageId)
    message.success('ລຶບຮູບພາບແລ້ວ')
  } catch {
    // inventoryStore.error is already set and shown via the a-alert above
  }
}

onMounted(() => inventoryStore.fetchServices())
</script>

<style scoped>
.supplier-inventory__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.supplier-inventory__title {
  margin: 0;
  color: #14294f;
}

.supplier-inventory__error {
  margin-bottom: 16px;
}

.image-manager__error {
  margin-bottom: 16px;
}

.image-manager__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.image-manager__item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 1 / 1;
}

.image-manager__thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.image-manager__remove {
  position: absolute;
  top: 6px;
  right: 6px;
}

.image-manager__upload-btn {
  margin-top: 4px;
}
</style>
