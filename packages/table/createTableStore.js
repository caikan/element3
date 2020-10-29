import { computed, Fragment, reactive } from 'vue'

export default function (props, context) {
  const store = reactive(Object.create({ props, context }))
  const table = store
  Object.assign(store, { table })

  table.useTableColumnLevel = (level = void 0) => {
    if (level === void 0) {
      level = inject(tableColumnLevelSymbol)
    }
    provide(tableCellStoreSymbol, +level + 1)
    return level
  }

  store.slotsDefault = computed(() => {
    const getter = context.slots.default
    return getter ? getter() : []
  })

  store.rawColumns = computed(() => {
    const slot = context.slots.default
    return slot ? slot() : []
  })

  store.columns = computed(() => {
    const array = store.rawColumns.concat()
    for (let i = 0; i < array.length; ) {
      if (array[i].type === Fragment) {
        array.splice(i, 1, ...array[i].children)
      } else {
        i++
      }
    }
    return array
  })

  store.fixedRightColumns = computed(() => 0)
  store.fixedColumns = computed(() => 0)
  store.tableData = computed(() => props.data)

  /**
   * @deprecated use `rowState.getClass` instead.
   */
  store.getRowClass = computed(() => {
    const classes = ['el-table__row']
    const { rowClassName, stripe } = props
    if (typeof rowClassName === 'string') {
      classes.push(rowClassName)
    }

    if (stripe) {
      const striped = [classes, classes.concat('el-table__row--striped')]
      return typeof rowClassName === 'function'
        ? (row, rowIndex) =>
            striped[rowIndex % 2].concat(rowClassName({ row, rowIndex }))
        : (row, rowIndex) => striped[rowIndex % 2]
    } else {
      return typeof rowClassName === 'function'
        ? (row, rowIndex) => classes.concat(rowClassName({ row, rowIndex }))
        : () => classes
    }
  })

  store.classes = computed(() => {
    const { fit, stripe, border, isHidden, isGroup, maxHeight } = props
    return [
      'el-table',
      {
        'el-table--fit': fit,
        'el-table--striped': stripe,
        'el-table--border': border || isGroup,
        'el-table--hidden': isHidden,
        'el-table--group': isGroup,
        'el-table--fluid-height': maxHeight
      }
    ]
  })

  store.json = (obj) => JSON.stringify(obj)
  return store
}
