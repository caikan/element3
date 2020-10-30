import { computed, Fragment, reactive } from 'vue'
import TableColumn from './TableColumn.vue'

export default function createTableStore(props, context) {
  const tableStore = reactive(Object.create({ props, context }))
  Object.assign(tableStore, { tableStore })

  const { slots } = context
  tableStore.tableColumnStores = computed(() => {
    const getPlugins = slots.default
    const plugins = getPlugins ? getPlugins() : []
    for (let i = 0; i < plugins.length; void 0) {
      const plugin = plugins[i]
      if (plugin.type === TableColumn) {
        plugins[i++] = plugin.tableColumnStore
      } else {
        const children = plugin.type === Fragment ? plugin.children : []
        plugins.splice(i, 1, ...children)
      }
    }
    return plugins
  })

  tableStore.headerRowCount = computed(() => {
    return Math.max(...tableStore.tableColumnStore.map((store) => store.deep))
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
