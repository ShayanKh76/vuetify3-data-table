<template>
  <div class="custom-data-table">
    <v-table fixed-header>
      <thead>
        <tr>
          <th>
            <v-checkbox
              v-if="showSelect"
              v-model="selectAll"
              hide-details
              :color="color"
            ></v-checkbox>
          </th>
          <th>ردیف</th>
          <th v-for="column in headers" :key="column.value" :style="`text-align:${column.align}`">
            {{ column.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td colspan="100%" style="padding: 0; height: 4px; border: none">
            <v-progress-linear indeterminate :color="color"></v-progress-linear>
          </td>
        </tr>

        <tr v-for="(item, index) in items" :key="index">
          <td style="padding: 0 4px">
            <v-checkbox
              v-if="showSelect"
              v-model="selectedItems"
              :value="item"
              hide-details
              :color="color"
            ></v-checkbox>
          </td>
          <td>{{ index + 1 }}</td>
          <td v-for="column in headers" :key="column.value" :style="`text-align:${column.align}`">
            <!-- Check if a slot exists for the current column -->
            <slot :name="column.value" v-bind="{ item }">
              <!-- If no slot, display the default content -->
              {{ item[column.value] }}
            </slot>
          </td>
        </tr>
        <tr>
          <td colspan="100%" style="padding: 0; border: none">
            <div
              :style="`display: flex;  ${lang == 'fa' ? 'direction:ltr' : ''}`"
              class="table__pagination"
              v-if="pagination"
            >
              <div
                class="text-center"
                :style="`display: flex;
                  align-items: center;
                  direction: ltr;${lang == 'fa' ? 'rotate: 180deg;' : ''}
                  `"
              >
                <v-btn variant="text" :disabled="pagination.currentPage == 1" @click="prePage"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-chevron-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                    /></svg
                ></v-btn>
                <v-btn
                  variant="text"
                  @click="nextPage"
                  :disabled="pagination.currentPage == pagination.lastPage"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-chevron-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    /></svg
                ></v-btn>
              </div>
              <div class="d-flex">
                <div
                  :style="`margin: 24px 12px 0 12px;${
                    lang == 'fa' ? 'direction:rtl' : 'direction:ltr'
                  }`"
                  v-if="
                    pagination.currentPage &&
                    pagination.perPage &&
                    pagination.lastPage &&
                    pagination.total
                  "
                >
                  {{ (pagination.currentPage - 1) * pagination.perPage + 1
                  }}{{ lang == 'fa' ? 'تا' : ' -' }}
                  {{
                    pagination.currentPage == pagination.lastPage
                      ? pagination.total
                      : pagination.currentPage * pagination.perPage
                  }}
                  {{ lang == 'fa' ? 'از' : 'of' }} {{ pagination.total }}
                </div>
                <div style="width: 53px" class="ml-6">
                  <v-select
                    v-model="perPage"
                    variant="underlined"
                    :items="[5, 10, 15, 20, 30]"
                    dense
                  ></v-select>
                </div>
                <span style="margin: 24px 0 0 12px">{{
                  lang == 'fa' ? 'ردیف در صفحه:' : ':Items per page'
                }}</span>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
<script lang="ts" setup>
import { ref, inject, watch } from 'vue'
export interface Headers {
  text: string
  value: string
  align: string
  sortable: boolean
}
export interface Pagination {
  total: number | null
  perPage: number | null
  currentPage: number | null
  lastPage: number | null
  nextPageUrl: string | null
  previousPageUrl: string | null
}
const emit = defineEmits(['update:items-per-page', 'update:page', 'update:modelValue'])
const props = defineProps({
  headers: { type: Object as () => Headers[] },
  items: {
    type: Array as () => any[],
    default: () => []
  },
  loading: Boolean,
  pagination: {
    type: Object as () => Pagination,
    default: () => {
      return {
        perPage: 20,
        currentPage: 1,
        lastPage: 1
      }
    }
  },
  color: { type: String, default: 'teal' },
  showSelect: Boolean,
  modelValue: {
    type: Array,
    default: () => []
  },
  lang: {
    type: String,
    default: () => 'en'
  }
})
const page = ref<number | null>()
const perPage = ref<number | null>()
const selectAll = ref()
const selectedItems = ref(props.modelValue)
watch(
  () => props.pagination?.currentPage,
  () => {
    page.value = props.pagination.currentPage
  }
)
watch(
  () => props.pagination?.perPage,
  () => {
    perPage.value = props.pagination.perPage
  }
)
watch(
  () => perPage.value,
  () => {
    emit('update:items-per-page', perPage.value)
  }
)
watch(
  () => page.value,
  () => {
    emit('update:page', page.value)
  }
)
watch(
  () => selectedItems.value,
  () => {
    emit('update:modelValue', selectedItems.value)
  }
)
watch(
  () => props.modelValue,
  () => {
    selectedItems.value = props.modelValue
  }
)
watch(
  () => selectAll.value,
  () => {
    if (selectAll.value == true) {
      selectedItems.value = props.items
    } else {
      selectedItems.value = []
    }
  }
)
const nextPage = () => {
  page.value = page.value! + 1
}
const prePage = () => {
  page.value = page.value! - 1
}
</script>
<style lang="scss">
.custom-data-table {
  border-radius: 8px;
  .v-table {
    padding: 4px;
    border-radius: 14px;
    margin-bottom: 44px;
  }
  .v-pagination__item {
    display: none;
  }
  // .table__pagination .v-btn__content {
  //   rotate: 180deg;
  // }
  .table__pagination .v-select__selection-text {
    font-size: 14px !important;
  }
  .v-table__wrapper {
    padding: 4px;
  }
}
</style>
