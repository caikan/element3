<template>
  <table class="el-table__body" cellspacing="0" cellpadding="0" border="0">
    <table-colgroup></table-colgroup>
    <tbody>
      <table-row
        v-for="(row, i) in state.tableData"
        :key="row.keyTODO"
        :data="row"
        :index="i"
      />
    </tbody>
  </table>
</template>

<script>
import TableRow from './TableRow'
import TableColgroup from './TableColgroup.vue'
import { useTableStore } from './utils'

export default {
  components: {
    TableRow,
    TableColgroup
  },
  name: 'ElTableBody',

  setup() {
    return useTableStore()
  }
}
</script>
