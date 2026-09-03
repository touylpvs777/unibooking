<template>
  <div class="supplier-inventory">
    <div class="supplier-inventory__header">
      <h1 class="supplier-inventory__title">{{ $t('supplier.inventoryTitle') }}</h1>
      <a-button type="primary" @click="openAddModal">
        <template #icon><PlusOutlined /></template>
        {{ $t('supplier.addItemButton') }}
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
            {{ nextAvailability(record) ? `${formatPrice(nextAvailability(record).price)} ${$t('common.kip')}` : '—' }}
          </template>

          <template v-else-if="column.key === 'availableUnits'">
            {{ nextAvailability(record) ? `${nextAvailability(record).availableUnits} ${$t('supplier.unitsSuffix')}` : $t('supplier.priceNotSet') }}
          </template>

          <template v-else-if="column.key === 'isActive'">
            <a-tag :color="record.isActive ? 'success' : 'default'">
              {{ record.isActive ? $t('supplier.openForBooking') : $t('supplier.closedForBooking') }}
            </a-tag>
          </template>

          <template v-else-if="column.key === 'actions'">
            <a-space>
              <a-button size="small" @click="openImagesModal(record)">
                <template #icon><PictureOutlined /></template>
                {{ $t('supplier.imagesButton') }}
              </a-button>
              <a-button size="small" @click="handleEdit">
                <template #icon><EditOutlined /></template>
                {{ $t('common.edit') }}
              </a-button>
              <a-popconfirm
                :title="$t('supplier.deleteConfirmTitle')"
                :ok-text="$t('common.delete')"
                :cancel-text="$t('common.cancel')"
                @confirm="handleDelete(record)"
              >
                <a-button
                  size="small"
                  danger
                  :loading="inventoryStore.deactivatingId === record.id"
                >
                  <template #icon><DeleteOutlined /></template>
                  {{ $t('common.delete') }}
                </a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>

    <a-modal
      v-model:open="isAddModalOpen"
      :title="$t('supplier.addItemButton')"
      :confirm-loading="inventoryStore.isSubmitting"
      :ok-text="$t('common.save')"
      :cancel-text="$t('common.cancel')"
      @ok="handleSubmit"
      @cancel="closeAddModal"
    >
      <a-form ref="formRef" layout="vertical" :model="form">
        <a-form-item :label="$t('supplier.itemTypeLabel')" name="type" :rules="[{ required: true, message: $t('supplier.itemTypeRequired') }]">
          <a-select v-model:value="form.type" :placeholder="$t('supplier.selectTypePlaceholder')">
            <a-select-option value="HOTEL">{{ $t('common.serviceTypes.room') }}</a-select-option>
            <a-select-option value="TOUR">{{ $t('common.serviceTypes.tour') }}</a-select-option>
            <a-select-option value="CAR_RENTAL">{{ $t('common.serviceTypes.carRental') }}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :label="$t('common.columns.name')"
          name="name"
          :rules="[
            { required: true, message: $t('supplier.nameRequired') },
            { min: 3, message: $t('supplier.nameMinLength') }
          ]"
        >
          <a-input v-model:value="form.name" :placeholder="$t('supplier.namePlaceholder')" />
        </a-form-item>

        <a-form-item
          :label="$t('supplier.descriptionLabel')"
          name="description"
          :rules="[
            { required: true, message: $t('supplier.descriptionRequired') },
            { min: 10, message: $t('supplier.descriptionMinLength') }
          ]"
        >
          <a-textarea v-model:value="form.description" :rows="3" :placeholder="$t('supplier.descriptionPlaceholder')" />
        </a-form-item>

        <a-form-item :label="$t('search.locationLabel')" name="location" :rules="[{ required: true, message: $t('supplier.locationRequired') }]">
          <a-input v-model:value="form.location" :placeholder="$t('supplier.locationPlaceholder')" />
        </a-form-item>

        <template v-if="form.type === 'HOTEL'">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item
                :label="$t('serviceDetail.starRatingLabel')"
                name="starRating"
                :rules="[{ required: true, type: 'number', min: 1, max: 5, message: $t('supplier.starRatingHint') }]"
              >
                <a-input-number v-model:value="form.starRating" :min="1" :max="5" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                :label="$t('hotels.propertyTypeLabel')"
                name="propertyType"
                :rules="[{ required: true, message: $t('supplier.propertyTypeRequired') }]"
              >
                <a-select v-model:value="form.propertyType" :placeholder="$t('supplier.selectPlaceholder')">
                  <a-select-option value="HOTEL">{{ $t('common.propertyTypes.hotel') }}</a-select-option>
                  <a-select-option value="RESORT">{{ $t('common.propertyTypes.resort') }}</a-select-option>
                  <a-select-option value="VILLA">{{ $t('common.propertyTypes.villa') }}</a-select-option>
                  <a-select-option value="GUESTHOUSE">{{ $t('common.propertyTypes.guesthouse') }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>

          <a-form-item :label="$t('supplier.amenitiesLabel')" name="amenities">
            <a-select v-model:value="form.amenities" mode="tags" :placeholder="$t('supplier.amenitiesPlaceholder')" />
          </a-form-item>
        </template>

        <template v-else-if="form.type === 'TOUR'">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item
                :label="$t('supplier.durationDaysLabel')"
                name="durationDays"
                :rules="[{ required: true, type: 'number', min: 1, message: $t('supplier.durationRequired') }]"
              >
                <a-input-number v-model:value="form.durationDays" :min="1" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                :label="$t('explore.categoryTitle')"
                name="category"
                :rules="[{ required: true, message: $t('supplier.categoryRequired') }]"
              >
                <a-input v-model:value="form.category" :placeholder="$t('supplier.categoryPlaceholder')" />
              </a-form-item>
            </a-col>
          </a-row>

          <a-form-item
            :label="$t('serviceDetail.difficultyLabel')"
            name="difficulty"
            :rules="[{ required: true, message: $t('supplier.difficultyRequired') }]"
          >
            <a-select v-model:value="form.difficulty" :placeholder="$t('supplier.selectPlaceholder')">
              <a-select-option value="EASY">{{ $t('common.difficulties.easy') }}</a-select-option>
              <a-select-option value="MODERATE">{{ $t('common.difficulties.moderate') }}</a-select-option>
              <a-select-option value="HARD">{{ $t('common.difficulties.hard') }}</a-select-option>
            </a-select>
          </a-form-item>

          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item
                :label="$t('supplier.minGroupSizeLabel')"
                name="minGroupSize"
                :rules="[{ required: true, type: 'number', min: 1, message: $t('supplier.minGroupSizeRequired') }]"
              >
                <a-input-number v-model:value="form.minGroupSize" :min="1" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                :label="$t('supplier.maxGroupSizeLabel')"
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
                :label="$t('serviceDetail.vehicleTypeLabel')"
                name="vehicleType"
                :rules="[{ required: true, message: $t('supplier.vehicleTypeRequired') }]"
              >
                <a-select v-model:value="form.vehicleType" :placeholder="$t('supplier.selectPlaceholder')">
                  <a-select-option value="SEDAN">{{ $t('common.vehicleTypes.sedan') }}</a-select-option>
                  <a-select-option value="SUV">{{ $t('common.vehicleTypes.suv') }}</a-select-option>
                  <a-select-option value="VAN">{{ $t('common.vehicleTypes.van') }}</a-select-option>
                  <a-select-option value="PICKUP">{{ $t('common.vehicleTypes.pickup') }}</a-select-option>
                  <a-select-option value="MOTORBIKE">{{ $t('common.vehicleTypes.motorbike') }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                :label="$t('serviceDetail.transmissionLabel')"
                name="transmission"
                :rules="[{ required: true, message: $t('supplier.transmissionRequired') }]"
              >
                <a-select v-model:value="form.transmission" :placeholder="$t('supplier.selectPlaceholder')">
                  <a-select-option value="MANUAL">{{ $t('common.transmissions.manual') }}</a-select-option>
                  <a-select-option value="AUTOMATIC">{{ $t('common.transmissions.automatic') }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>

          <a-form-item
            :label="$t('serviceDetail.seatingCapacityLabel')"
            name="seatingCapacity"
            :rules="[{ required: true, type: 'number', min: 1, message: $t('supplier.seatingCapacityRequired') }]"
          >
            <a-input-number v-model:value="form.seatingCapacity" :min="1" style="width: 100%" />
          </a-form-item>
        </template>
      </a-form>
    </a-modal>

    <a-modal
      v-model:open="isImagesModalOpen"
      :title="$t('supplier.imagesModalTitle')"
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

        <a-empty v-if="!activeService.images?.length" :description="$t('supplier.noImages')" />
        <div v-else class="image-manager__grid">
          <div v-for="img in activeService.images" :key="img.id" class="image-manager__item">
            <img :src="img.url" :alt="activeService.name" class="image-manager__thumb">
            <a-popconfirm
              :title="$t('supplier.deleteImageConfirm')"
              :ok-text="$t('common.delete')"
              :cancel-text="$t('common.cancel')"
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
          {{ $t('supplier.uploadButton') }}
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

const { t } = useI18n()
const inventoryStore = useInventoryStore()

const columns = computed(() => [
  { title: t('common.columns.name'), dataIndex: 'name', key: 'name' },
  { title: t('common.columns.type'), key: 'type' },
  { title: t('supplier.priceColumn'), key: 'price' },
  { title: t('supplier.availableUnitsColumn'), key: 'availableUnits' },
  { title: t('common.columns.status'), key: 'isActive' },
  { title: t('common.columns.actions'), key: 'actions' }
])

// Backend ServiceType: HOTEL/FLIGHT/TRAIN/BUS/TOUR/CAR_RENTAL/PACKAGE. Only
// HOTEL/TOUR/CAR_RENTAL are creatable from this form (see form.type's
// options below) -- the rest are shown here only in case a FLIGHT/TRAIN/BUS/
// PACKAGE service already exists from elsewhere and shows up in the table.
const TYPE_COLOR_MAP = {
  HOTEL: 'blue',
  TOUR: 'gold',
  CAR_RENTAL: 'purple',
  FLIGHT: 'cyan',
  TRAIN: 'green',
  BUS: 'orange',
  PACKAGE: 'default'
}
const TYPE_KEY_MAP = {
  HOTEL: 'room',
  TOUR: 'tour',
  CAR_RENTAL: 'carRental',
  FLIGHT: 'flight',
  TRAIN: 'train',
  BUS: 'bus',
  PACKAGE: 'package'
}

function typeTagMeta(type) {
  return {
    color: TYPE_COLOR_MAP[type] || 'default',
    text: TYPE_KEY_MAP[type] ? t(`common.serviceTypes.${TYPE_KEY_MAP[type]}`) : type
  }
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
    return Promise.reject(t('supplier.maxGroupSizeRequired'))
  }
  if (form.minGroupSize !== undefined && value < form.minGroupSize) {
    return Promise.reject(t('supplier.maxGroupSizeInvalid'))
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
    message.success(t('supplier.itemAddedMessage'))
    closeAddModal()
  } catch {
    // inventoryStore.error is already set and shown via the a-alert above
  }
}

// --- Row actions -----------------------------------------------------------

// No PATCH/edit-service endpoint exists yet -- honest placeholder, same
// "not ready yet" pattern as checkout.vue's disabled payment channels.
function handleEdit() {
  message.info(t('common.notReadyYet'))
}

async function handleDelete(record) {
  try {
    await inventoryStore.deactivateService(record.id)
    message.success(t('supplier.itemDeletedMessage'))
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
    message.success(t('supplier.imagesUploadedMessage'))
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
    message.success(t('supplier.imageDeletedMessage'))
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
