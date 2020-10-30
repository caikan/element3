import { computed, reactive } from 'vue'
import { useTableRowStore } from './utils'

export default function createTableHeaderCellStore(props, context) {
  const tableRowStore = useTableRowStore()
  const tableStore = tableRowStore.tableStore
  const tableHeaderCellStore = reactive(Object.create(tableRowStore))
  Object.assign(tableHeaderCellStore, {
    props,
    context,
    tableStore,
    tableRowStore,
    tableHeaderCellStore
  })

  tableHeaderCellStore.data = computed(() => {
    return tableRowStore.props.row[props.column.props.prop]
  })

  tableHeaderCellStore.rowSpan = computed(() => {
    return 1
  })
  tableHeaderCellStore.colSpan = computed(() => {
    return 1
  })

  return tableHeaderCellStore
}
