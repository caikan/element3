import { computed, reactive } from 'vue'
import { useTableRowStore } from './utils'

export default function createTableCellStore(props, context) {
  const tableRowStore = useTableRowStore()
  const tableStore = tableRowStore.tableStore
  const tableCellStore = reactive(Object.create(tableRowStore))
  Object.assign(tableCellStore, {
    props,
    context,
    tableStore,
    tableRowStore,
    tableCellStore
  })

  tableCellStore.content = computed(() => {
    return 'content placeholder'
  })

  tableCellStore.rowSpan = computed(() => {
    return 1
  })
  tableCellStore.colSpan = computed(() => {
    return 1
  })

  return tableCellStore
}
