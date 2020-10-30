<template>
  <div class="el-table__header-wrapper" v-if="showHeader">
    <table>
      <table-colgroup></table-colgroup>
      <thead>
        <table-header-row v-for="i in headerRowCount" :key="i" />
        <!-- <tr>
          <th v-for="col in columns" :key="col.key">
            <div>{{ col.props.label }}</div>
          </th>
        </tr> -->
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
