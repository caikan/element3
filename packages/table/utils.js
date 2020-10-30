import { Fragment, getCurrentInstance, inject, provide } from 'vue'

// 请确保本模块 utils.js 在组件模块之前加载，否则此处引入的组件可能为undefined
import Table from './Table'
import TableRow from './TableRow'
import TableCell from './TableCell'
import TableHeaderRow from './TableHeaderRow'
import TableHeaderCell from './TableHeaderCell'

import createTableStore from './createTableStore'
import createTableRowStore from './createTableRowStore'
import createTableCellStore from './createTableCellStore'
import createTableHeaderRowStore from './createTableHeaderRowStore'
import createTableHeaderCellStore from './createTableHeaderCellStore'

// const tableStoreSymbol = Symbol('tableStoreSymbol')
// const tableRowStoreSymbol = Symbol('tableRowStoreSymbol')
// const tableCellStoreSymbol = Symbol('tableCellStoreSymbol')
// const tableHeaderRowStoreSymbol = Symbol('tableHeaderRowStoreSymbol')

export function useStore(createStore, symbol, props, context) {
  if (!props || !context || getCurrentInstance().type !== this) {
    return inject(symbol)
  }
  const store = createStore(props, context)
  store.store = store
  provide(symbol, store)
  return store
}

export const useTableStore = useStore.bind(
  Table,
  createTableStore,
  Symbol('table')
)
export const useTableRowStore = useStore.bind(
  TableRow,
  createTableRowStore,
  Symbol('table-row')
)
export const useTableCellStore = useStore.bind(
  TableCell,
  createTableCellStore,
  Symbol('table-data-cell')
)
export const useTableHeaderRowStore = useStore.bind(
  TableHeaderRow,
  createTableHeaderRowStore,
  Symbol('table-header-row')
)
export const useTableHeaderCellStore = useStore.bind(
  TableHeaderCell,
  createTableHeaderCellStore,
  Symbol('table-header-cell')
)

export function flatInstances(array) {
  return array.reduce((prev, val) => {
    if (val.type === Fragment) {
      prev.push(...val.children)
    } else {
      prev.push(val)
    }
    return prev
  }, [])
}

/**
 * @deprecated
 */
const getEmptyPlugins = () => []

/**
 * @deprecated
 */
export function getFlatPlugins(slots, name) {
  const getter = slots[name] || getEmptyPlugins
  return getter().reduce((prev, val) => {
    if (val.type === Fragment) {
      prev.push(...val.children)
    } else {
      prev.push(val)
    }
    return prev
  }, [])
}

/**
 * @deprecated
 */
export function getPlugins1(slots, name, type) {
  const getter = slots[name] || getEmptyPlugins
  const plugins = getter()
  for (let i = 0; i < plugins.length; void 0) {
    const plugin = plugins[i]
    if (plugin.type === Fragment) {
      plugins.splice(i, 1, ...plugin.children)
    } else {
      if (!type || plugin.type === type) {
        plugins[i] = plugin
      }
      i++
    }
  }
  return plugins
}

export function getPlugins(getter, type) {
  const plugins = (getter || Array)()
  for (let i = 0; i < plugins.length; void 0) {
    const plugin = plugins[i]
    if (plugin.type === Fragment) {
      plugins.splice(i, 1, ...plugin.children)
    } else {
      if (!type || plugin.type === type) {
        plugins[i] = plugin
      }
      i++
    }
  }
  return plugins
}
