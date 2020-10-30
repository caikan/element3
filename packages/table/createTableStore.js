import { computed, Fragment, reactive } from 'vue'
import TableColumn from './TableColumn.vue'
import { getPlugins } from './utils'

export default function createTableStore(props, context) {
  const tableStore = reactive(Object.create({ props, context }))
  Object.assign(tableStore, { tableStore })

  const { slots } = context
  tableStore.flatTableColumnStores = computed(() => {
    const stores = getPlugins(slots.default, TableColumn)
    for (let i = 0; i < stores.length; void 0) {
      const tableColumnStore = stores[i]
      if (tableColumnStore.childColumnStores.length) {
        stores.splice(i, 1, tableColumnStore.childColumnStores)
      } else {
        i++
      }
    }
    return stores
  })

  tableStore.headerRowCount = computed(() => {
    return Math.max(...tableStore.tableColumnStores.map((store) => store.deep))
  })

  /**
   * @deprecated
   */
  tableStore.headerRows__BAD = computed(() => {
    // const plugins = getPlugins(slots.default, TableColumn)
    const rows = []

    // let columnPlugins = plugins
    // while (columnPlugins.length) {
    //   const nextRowColumnPlugins = []
    //   const row = columnPlugins.map((plugin) => {
    //     cell
    //     return cell
    //   })
    // }
    // for (let i = 0; i < rows.length; i++) {
    //   const plugins = rows[i]
    //   const nextRow = []
    // }

    // const rows = [plugins].reduce((rows, plugins) => {

    // }, [])

    // const rows = []
    // let lastRow
    // do {

    // } while (row.length);

    // const rows = [
    //   [] // cells
    // ]
    // const maxDeep = 1
    // const buildPlugins2CellsReducer = (deep = 1) => {
    //   return (cells, plugin) => {
    //     const childPlugins = getPlugins(plugin.slots.default, TableColumn)
    //     const cell = { colSpan: 1, rowSpan: 1 }
    //     if (!childPlugins.length) {
    //       cell.rowSpan = childPlugins.xxx
    //     }
    //   }
    // }
    // plugins.reduce((cells, plugin) => {
    //   const childPlugins = getPlugins(plugin.slots.default, TableColumn)
    //   return cells
    // }, [])
    // const cells = tableStore.tableColumnStores.forEach((store) => {})

    return rows
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

  tableStore.tableBodyColumns = computed(() => {
    const columns = getPlugins(slots.default, TableColumn)
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i]
    }
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
