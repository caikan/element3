import { computed, reactive } from 'vue'
import { useTableRowState } from './utils'

export default function createTableCellState(props, context) {
  const row = useTableRowState()
  const state = reactive(Object.create(row))
  Object.assign(state, { props, context, cell: state })

  state.content = computed(() => {
    return row.props.data[props.column.props.prop]
  })

  return state
}
