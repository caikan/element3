import { computed, reactive } from 'vue'
import { useTableStore } from './utils'

export default function createTableRowStore(props, context) {
  const tableStore = useTableStore()
  const tableRowStore = reactive(Object.create(tableStore))
  Object.assign(tableRowStore, { props, context, tableStore, tableRowStore })

  // 返回一个getter和computed哪个性能更好？
  tableRowStore.getClass = computed(() => {
    const classes = ['el-table__row']
    const { rowClassName, stripe } = tableStore.props
    const { data, index } = tableRowStore.props

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

  tableRowStore.classes = computed(() => {
    const { rowClassName, stripe } = tableStore.props
    const { data, index } = tableRowStore.props
    return [
      'el-table__row',
      !!stripe && index % 2 === 1 && 'el-table__row--striped',
      typeof rowClassName === 'string' && rowClassName,
      typeof rowClassName === 'function' &&
        rowClassName({ row: data, rowIndex: index })
    ]
  })

  return tableRowStore
}
