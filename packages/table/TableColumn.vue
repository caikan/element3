<template>
  <div>col: {{ label }}</div>
</template>

<script>
import { useTableColumnStore } from './utils'
export default {
  name: 'ElTableColumn',

  props: {
    label: String,
    prop: String,
    width: [String, Number]
  },

  setup(props, context) {
    // console.log(/tableColumnStore/, /shit/)
    return useTableColumnStore(props, context)
  }
}
</script>
