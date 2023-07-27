# Custom Data Table

Custom Data Table is a Vue.js component that provides a customizable and interactive data table with pagination and selection capabilities.

## Installation

Install the package using npm:

npm install vuetify3-data-table

## Usage

Import and register the `Vuetify3DataTable` component in your Vue.js application:

```vue
<template>
  <div>
    <vuetify3-data-table
      :headers="headers"
      :items="employees"
      :loading="loadingEmployees"
      :pagination="pagination"
      @update:items-per-page="perPage = $event"
      @update:page="page = $event"
      :show-select="activeSelect"
      v-model="selectedEmployees"
      color="teal"
      lang="fa"
    >
      <!-- Your custom table slots -->
      <template v-slot:mobile="{ item }">
        <span style="font-size: 1.2rem" class="font-weight-medium">{{
          item.mobile ? item.mobile : '---'
        }}</span>
      </template>
    </vuetify3-data-table>
  </div>
</template>

<script>
import { Vuetify3DataTable } from 'vuetify3-data-table'
import 'vuetify3-data-table/styles.css'
const headers = [
  {
    text: 'Full Name',
    value: 'fullName',
    sortable: false
  },
  {
    text: 'Mobile',
    value: 'mobile',
    align: 'center',
    sortable: false
  },

  {
    text: 'Action',
    value: 'actionOne',
    sortable: false,
    align: 'center'
  }
]
</script>
```

Make sure to replace the placeholder table headers and data with your own.

## Props

headers (Array): An array of objects representing the table headers with the following properties:

text (String): The text to display in the table header.
value (String): The corresponding property name in the data item for the column.
align (String): The alignment of the column content (left, center, or right).
sortable (Boolean): Set to true if the column is sortable.
items (Array): An array of objects representing the data items to display in the table.

loading (Boolean): Indicates whether the table is currently loading data.

pagination (Object): An object containing pagination settings with the following properties:

total (Number): The total number of items.
perPage (Number): The number of items per page.
currentPage (Number): The current page number.
lastPage (Number): The last page number.
nextPageUrl (String): The URL for the next page.
previousPageUrl (String): The URL for the previous page.

color (String): The color theme for the table (e.g., teal, blue, red).

showSelect (Boolean): Set to true to show checkboxes for selecting items.

v-model (Array): An array that binds the selected items.

lang (string): Default on English and use lang="fa" for Persian

## Events

The component emits the following events:

update:items-per-page: Triggered when the number of items per page changes. The new value is passed as the event payload.

update:page: Triggered when the current page changes. The new page number is passed as the event payload.

update:modelValue: Triggered when the selected items change. The new array of selected items is passed as the event payload.

## Styling

You can customize the appearance of the table by modifying the provided CSS classes in your application.
