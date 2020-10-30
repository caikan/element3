<template>
  <td>{{ content }}</td>
</template>

<script>
import { useTableCellStore } from './utils'
export default {
  name: 'ElTableCell',
  props: {
    cell: {}
  },
  setup(props, context) {
    // const s = useTableCellStore(props, context)
    // console.log(/cecll/, s)
    // return s
    return useTableCellStore(props, context)
  }
}
</script>
