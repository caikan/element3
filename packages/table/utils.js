import { Fragment, getCurrentInstance, inject, provide } from 'vue'

// 请确保本模块 utils.js 在组件模块之前加载，否则此处引入的组件可能为undefined
import Table from './Table'
import TableRow from './TableRow'
import TableCell from './TableCell'
import TableHeaderRow from './TableHeaderRow'

import createTableStore from './createTableStore'
import createTableRowStore from './createTableRowStore'
import createTableDataCellStore from './createTableDataCellStore'
import createTableHeaderRowStore from './createTableHeaderRowStore'

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
  createTableDataCellStore,
  Symbol('table-data-cell')
)
export const useTableHeaderRowStore = useStore.bind(
  TableHeaderRow,
  createTableHeaderRowStore,
  Symbol('table-header-row')
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

const getEmptyPlugins = () => []
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
