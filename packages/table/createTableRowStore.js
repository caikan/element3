import { computed, reactive } from 'vue'
import { useTableStore } from './utils'

export default function createTableRowStore(props, context) {
  const table = useTableStore()
  const store = reactive(Object.create(table))
  const row = store
  Object.assign(store, { props, context, row })

  // 返回一个getter和computed哪个性能更好？
  store.getClass = computed(() => {
    const classes = ['el-table__row']
    const { rowClassName, stripe } = table.props
    const { data, index } = row.props

    if (typeof rowClassName === 'string') {
      classes.push(rowClassName)
    }

    const isFunction = typeof rowClassName === 'function'

    if (stripe) {
      const striped = [classes, classes.concat('el-table__row--striped')]
      return isFunction
        ? () =>
            striped[index % 2].concat(
              rowClassName({ row: data, rowIndex: index })
            )
        : () => striped[index % 2]
    } else {
      return isFunction
        ? () => classes.concat(rowClassName({ row: data, rowIndex: index }))
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
      typeof rowClassName === 'function' &&
        rowClassName({ row: data, rowIndex: index })
    ]
  })

  return store
}
