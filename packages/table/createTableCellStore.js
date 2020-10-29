import { computed, reactive } from 'vue'
import { useTableRowStore } from './utils'

export default function createTableCellStore(props, context) {
  const row = useTableRowStore()
  const store = reactive(Object.create(row))
  const cell = store
  Object.assign(store, { props, context, cell })

  store.content = computed(() => {
    return row.props.data[props.column.props.prop]
  })

  return store
}
