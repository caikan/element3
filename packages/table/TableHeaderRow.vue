<template>
  <tr :class="getClass()">
    <table-header-cell v-for="(cell, i) in cells" :key="i"></table-header-cell>
    <!-- <table-cell
      v-for="column in state.columns"
      :key="column.id"
      :column="column"
    /> -->
  </tr>
</template>

<script>
import TableHeaderCell from './TableHeaderCell'
import { useTableHeaderRowStore } from './utils'
export default {
  components: { TableHeaderCell },
  name: 'ElTableHeaderCell',
  props: {
    index: Number
  },
  setup(props, context) {
    return useTableHeaderRowStore(props, context)
  }
}
</script>
