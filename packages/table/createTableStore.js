import { computed, Fragment, reactive } from 'vue'

export default function (props, context) {
  const state = reactive(Object.create({ props, context }))
  state.table = state
  state.slotsDefault = computed(() => {
    const getter = context.slots.default
    return getter ? getter() : []
  })
  state.rawColumns = computed(() => {
    const slot = context.slots.default
    return slot ? slot() : []
  })
  state.columns = computed(() => {
    const array = state.rawColumns.concat()
    for (let i = 0; i < array.length; ) {
      if (array[i].type === Fragment) {
        array.splice(i, 1, ...array[i].children)
      } else {
        i++
      }
    }
    return array
  })
  state.fixedRightColumns = computed(() => 0)
  state.fixedColumns = computed(() => 0)
  state.tableData = computed(() => props.data)
  state.getRowClass = computed(() => {
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

  state.json = (obj) => JSON.stringify(obj)
  return state
}
