<template>
  <div class="el-table__header-wrapper" v-if="showHeader">
    <table>
      <table-colgroup></table-colgroup>
      <thead>
        <table-header-row v-for="(row, i) in headerRows" :key="i" :index="i" />
      </thead>
    </table>
  </div>
</template>

<script>
import TableHeaderRow from './TableHeaderRow'
import TableColgroup from './TableColgroup'
import { useTableStore } from './utils'
export default {
  components: {
    TableHeaderRow,
    TableColgroup
  },
  name: 'ElTableHeader',

  setup() {
    return useTableStore()
  }
}
</script>
