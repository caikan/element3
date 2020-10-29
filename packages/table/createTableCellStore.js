import { computed, reactive } from 'vue'
import { useTableRowStore } from './utils'

export default function createTableCellStore(props, context) {
  const row = useTableRowStore()
  const state = reactive(Object.create(row))
  Object.assign(state, { props, context, cell: state })

  state.content = computed(() => {
    return row.props.data[props.column.props.prop]
  })

  return state
}
