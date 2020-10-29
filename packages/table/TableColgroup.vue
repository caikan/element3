<template>
  <colgroup>
    <col v-for="col in columns" :key="col.key" />
  </colgroup>
</template>

<script>
import { useTableStore } from './utils'
export default {
  name: 'ElTableColgroup',

  setup() {
    return useTableStore()
  }
}
</script>
