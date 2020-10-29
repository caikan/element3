<template>
  <tr :class="classes">
    <table-cell
      v-for="column in state.columns"
      :key="column.id"
      :column="column"
    />
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
