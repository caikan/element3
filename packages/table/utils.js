import { getCurrentInstance, inject, provide } from 'vue'
// 确保 utils.js 在组件模块之前加载，否则此处引入的组件可能为undefined
import Table from './Table'
import TableRow from './TableRow'
import TableCell from './TableCell'
import createTableState from './createTableState'
import createTableRowState from './createTableRowState'
import createTableCellState from './createTableCellState'

const tableStateSymbol = Symbol('tableStateSymbol')
const tableRowStateSymbol = Symbol('tableRowStateSymbol')
const tableCellStateSymbol = Symbol('tableCellStateSymbol')

export function useState(createState, type, symbol, props, context) {
  if (!props || !context || getCurrentInstance().type !== type) {
    return inject(symbol)
  }
  const state = createState(props, context)
  state.state = state
  provide(symbol, state)
  return state
}

export const useTableState = useState.bind(
  null,
  createTableState,
  Table,
  tableStateSymbol
)
export const useTableRowState = useState.bind(
  null,
  createTableRowState,
  TableRow,
  tableRowStateSymbol
)
export const useTableCellState = useState.bind(
  null,
  createTableCellState,
  TableCell,
  tableCellStateSymbol
)
