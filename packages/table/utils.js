import { getCurrentInstance, inject, provide } from 'vue'
// 确保 utils.js 在组件模块之前加载，否则此处引入的组件可能为undefined
import Table from './Table'
import TableRow from './TableRow'
import TableCell from './TableCell'
import createTableStore from './createTableStore'
import createTableRowStore from './createTableRowStore'
import createTableCellStore from './createTableCellStore'

const tableStoreSymbol = Symbol('tableStoreSymbol')
const tableRowStoreSymbol = Symbol('tableRowStoreSymbol')
const tableCellStoreSymbol = Symbol('tableCellStoreSymbol')

export function useStore(createStore, type, symbol, props, context) {
  if (!props || !context || getCurrentInstance().type !== type) {
    return inject(symbol)
  }
  const state = createStore(props, context)
  state.state = state
  provide(symbol, state)
  return state
}

export const useTableStore = useStore.bind(
  null,
  createTableStore,
  Table,
  tableStoreSymbol
)
export const useTableRowStore = useStore.bind(
  null,
  createTableRowStore,
  TableRow,
  tableRowStoreSymbol
)
export const useTableCellStore = useStore.bind(
  null,
  createTableCellStore,
  TableCell,
  tableCellStoreSymbol
)
