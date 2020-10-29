import { computed, reactive, watch, watchEffect } from 'vue'
import { useTableStore } from './utils'

export default function createTableRowStore(props, context) {
  const table = useTableStore()
  const store = reactive(Object.create(table))
  const row = store
  Object.assign(store, { props, context, row })

  store.getRowClass = computed(() => {
    const classes = ['el-table__row']
    const { rowClassName, stripe } = table.props
    if (typeof rowClassName === 'string') {
      classes.push(rowClassName)
    }

    const { row, rowIndex } = store.props
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

  store.classes = computed(() => {
    const { rowClassName, stripe } = table.props
    const { data, index } = row.props
    return [
      'el-table__row',
      !!stripe && index % 2 === 1 && 'el-table__row--striped',
      typeof rowClassName === 'string' && rowClassName,
      typeof rowClassName === 'function' && rowClassName(data, index)
    ]
  })

  return store
}
