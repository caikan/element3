import { computed, reactive } from 'vue'
import { useTableState } from './utils'

export default function createTableRowState(props, context) {
  const table = useTableState()
  const state = reactive(Object.create(table))
  Object.assign(state, { props, context, row: state })

  state.getRowClass = computed(() => {
    const classes = ['el-table__row']
    const { rowClassName, stripe } = table.props
    if (typeof rowClassName === 'string') {
      classes.push(rowClassName)
    }

    const { row, rowIndex } = state.props
    if (stripe) {
      const striped = [classes, classes.concat('el-table__row--striped')]
      return typeof rowClassName === 'function'
        ? () => striped[rowIndex % 2].concat(rowClassName({ row, rowIndex }))
        : () => striped[rowIndex % 2]
    } else {
      return typeof rowClassName === 'function'
        ? (row, rowIndex) => classes.concat(rowClassName({ row, rowIndex }))
        : () => classes
    }
  })

  state.classes = computed(() => {
    const { rowClassName, stripe } = table.props
    const { data, index } = state.props
    return [
      'el-table__row',
      !!stripe && index % 2 === 1 && 'el-table__row--striped',
      typeof rowClassName === 'string' && rowClassName,
      typeof rowClassName === 'function' && rowClassName(data, index)
    ]
  })

  return state
}
