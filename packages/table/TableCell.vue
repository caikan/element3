<template>
  <td>{{ content }}</td>
</template>

<script>
import { useTableCellState } from './utils'
export default {
  name: 'ElTableCell',
  props: {
    column: {}
  },
  setup(props, context) {
    // const s = useTableCellState(props, context)
    // console.log(/cecll/, s)
    // return s
    return useTableCellState(props, context)
  }
}
</script>
