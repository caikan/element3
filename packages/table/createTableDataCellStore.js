import { computed, reactive } from 'vue'
import { useTableRowStore } from './utils'

export default function createTableDataCellStore(props, context) {
  const tableRowStore = useTableRowStore()
  const tableStore = tableRowStore.tableStore
  const tableDataCellStore = reactive(Object.create(tableRowStore))
  Object.assign(tableDataCellStore, {
    props,
    context,
    tableStore,
    tableRowStore,
    tableDataCellStore
  })

  tableDataCellStore.data = computed(() => {
    return tableRowStore.props.row[props.column.props.prop]
  })

  tableDataCellStore.rowSpan = computed(() => {
    return 1
  })
  tableDataCellStore.colSpan = computed(() => {
    return 1
  })

  return tableDataCellStore
}
