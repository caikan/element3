import { computed, reactive } from 'vue'
import { getFlatPlugins, useTableStore } from './utils'
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
  tableColumnStore.deep = computed(() => {
    const deeps = getFlatPlugins(slots, 'default')
      .filter((p) => p.type === TableColumn)
      .map((p) => p.deep)
    return Math.max(deeps) + 1
  })

  tableColumnStore.data = computed(() => {
    return props.label
  })

  tableColumnStore.rowSpan = computed(() => {
    return 1
  })
  tableColumnStore.colSpan = computed(() => {
    return 1
  })

  return tableColumnStore
}
