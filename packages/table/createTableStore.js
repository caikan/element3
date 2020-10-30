import {
  computed,
  getCurrentInstance,
  reactive,
  readonly,
  ref,
  watch,
  watchEffect
} from 'vue'
import TableColumn from './TableColumn.vue'
import { getPlugins } from './utils'

export default function createTableStore(props, context) {
  const tableStore = reactive(Object.create({ props, context }))
  const instance = getCurrentInstance()
  Object.assign(tableStore, { tableStore, instance })

  const { slots } = context

  // console.log(/tableStore/, tableStore)
  watch(
    () => getPlugins(slots.default, TableColumn),
    () => {
      // console.log(/plugins updated/, instance, plugins)
      columns.value = []
    }
  )

  const columns = ref([])
  // tableStore.mountColumn = ref((column) => {
  //   columns.push(column)
  // })
  tableStore.mountColumn = computed(() => {
    return ((columns) => {
      return (column) => {
        columns.push(column)
      }
    })(columns.value)
  })

  tableStore.tableColumns = readonly(columns)

  watch(
    () => columns.value.length,
    (val) => {
      console.log(
        /columns/,
        columns.value.map((c) => {
          return c.props.label
        })
      )
    }
  )

  tableStore.flatTableColumnStores = computed(() => {
    const stores = getPlugins(slots.default, TableColumn)
    for (let i = 0; i < stores.length; void 0) {
      const tableColumnStore = stores[i]
      if (
        tableColumnStore.childColumnStores &&
        tableColumnStore.childColumnStores.length
      ) {
        stores.splice(i, 1, tableColumnStore.childColumnStores)
      } else {
        // console.log(/tableColumnStore/, tableColumnStore)
        i++
      }
    }
    return stores
  })

  tableStore.headerRowCount = computed(() => {
    return Math.max(...tableStore.tableColumnStores.map((store) => store.deep))
  })

  tableStore.headerRows = computed(() => {
    const rows = []
    let rowColumns = getPlugins(slots.default, TableColumn)
    while (rowColumns.length) {
      let nextRowColumns = []
      const cells = rowColumns.map(({ tableColumnStore }) => {
        const { colSpan, rowSpan, childColumnStores } = tableColumnStore
        nextRowColumns = nextRowColumns.concat(childColumnStores)
        return { colSpan, rowSpan }
      })
      rows.push(cells)
      rowColumns = nextRowColumns
    }
    return rows
  })

  tableStore.fixedRightColumns = computed(() => 0)
  tableStore.fixedColumns = computed(() => 0)
  tableStore.tableData = computed(() => props.data)

  tableStore.classes = computed(() => {
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

  // tableStore.json = (obj) => JSON.stringify(obj)
  return tableStore
}
