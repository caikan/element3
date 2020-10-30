import { computed, reactive } from 'vue'
import { getPlugins, useTableStore } from './utils'
import TableColumn from './TableColumn.vue'

export default function createTableColumnStore(props, context) {
  const tableStore = useTableStore()
  const tableColumnStore = reactive(Object.create(tableStore))
  Object.assign(tableColumnStore, {
    props,
    context,
    tableStore,
    tableColumnStore
  })

  const { slots } = context

  /**
   * @deprecated
   */
  tableColumnStore.deep = computed(() => {
    const deeps = getFlatPlugins(slots, 'default')
      .filter((p) => p.type === TableColumn)
      .map((p) => p.deep)
    return Math.max(deeps) + 1
  })

  tableColumnStore.content = computed(() => {
    return props.label
  })

  tableColumnStore.childColumnStores = computed(() => {
    return getPlugins(slots.default, TableColumn)
  })

  tableColumnStore.colSpan = computed(() => {
    return (
      tableColumnStore.childColumnStores.reduce(
        (sum, col) => sum + col.colSpan,
        0
      ) || 1
    )
  })

  tableColumnStore.rowSpan = computed(() => {
    return 1
  })

  return tableColumnStore
}
