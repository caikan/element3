import { computed, reactive } from 'vue'
import { useTableHeaderRowStore } from './utils'

export default function createTableHeaderCellStore(props, context) {
  const tableHeaderRowStore = useTableHeaderRowStore()
  const tableStore = tableHeaderRowStore.tableStore
  const tableHeaderCellStore = reactive(Object.create(tableHeaderRowStore))
  Object.assign(tableHeaderCellStore, {
    props,
    context,
    tableStore,
    tableHeaderRowStore,
    tableHeaderCellStore
  })

  tableHeaderCellStore.content = computed(() => {
    // TODO
    return tableHeaderRowStore.props.row[props.column.props.prop]
  })

  tableHeaderCellStore.rowSpan = computed(() => {
    // TODO
    return 1
  })
  tableHeaderCellStore.colSpan = computed(() => {
    // TODO
    return 1
  })

  return tableHeaderCellStore
}
