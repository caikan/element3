<template>
  <colgroup>
    <col v-for="col in columns" :key="col.key" />
  </colgroup>
</template>

<script>
import { useTableState } from './utils'
export default {
  name: 'ElTableColgroup',

  setup() {
    return useTableState()
  }
}
</script>
