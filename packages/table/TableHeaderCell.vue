<template>
  <th :colspan="colSpan" :rowspan="rowSpan">{{ content }}</th>
</template>

<script>
import { useTableHeaderCellStore } from './utils'
export default {
  name: 'ElTableHeaderCell',
  props: {
    column: {}
  },
  setup(props, context) {
    // const s = useTableCellStore(props, context)
    // console.log(/cecll/, s)
    // return s
    return useTableHeaderCellStore(props, context)
  }
}
</script>
