<template>
  <tr :class="getClass()">
    <table-cell v-for="cell in cells" :key="cell.id" :cell="cell" />
  </tr>
</template>

<script>
import { useTableRowStore } from './utils'
import TableCell from './TableCell'
export default {
  components: { TableCell },
  name: 'ElTableRow',
  props: {
    data: {},
    index: Number
  },
  setup(props, context) {
    return useTableRowStore(props, context)
  }
}
</script>
