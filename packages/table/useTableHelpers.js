// import useTableState from "./useTableState"

// const helpers = {
//   getRowClass (tableState, row, rowIndex) {
//     const classes = ['el-table__row']

//     // TODO
//     // if (this.table.highlightCurrentRow && row === this.store.states.currentRow) {
//     //   classes.push('current-row')
//     // }
// // debugger
//     if (tableState.props.stripe && rowIndex % 2 === 1) {
//       classes.push('el-table__row--striped')
//     }
//     const { rowClassName } = tableState
//     if (typeof rowClassName === 'string') {
//       classes.push(rowClassName)
//     } else if (typeof rowClassName === 'function') {
//       classes.push(rowClassName({ row, rowIndex }))
//     }

//     // TODO
//     // if (this.store.states.expandRows.indexOf(row) > -1) {
//     //   classes.push('expanded')
//     // }

//     return classes
//   }
// }

// export default function useTableHelpers () {
//   const tableState = useTableState()
//   const copy = { ...helpers }
//   Object.keys(copy).forEach(name => copy[name] = copy[name].bind(null, tableState))

//   return copy
// }

// export function getRowClass (row, rowIndex) {
//   const tableState = useTableState()
//   const classes = ['el-table__row']

//   // TODO
//   // if (this.table.highlightCurrentRow && row === this.store.states.currentRow) {
//   //   classes.push('current-row')
//   // }

//   if (tableState.stripe && rowIndex % 2 === 1) {
//     classes.push('el-table__row--striped')
//   }
//   const { rowClassName } = tableState
//   if (typeof rowClassName === 'string') {
//     classes.push(rowClassName)
//   } else if (typeof rowClassName === 'function') {
//     classes.push(rowClassName({ row, rowIndex }))
//   }

//   // TODO
//   // if (this.store.states.expandRows.indexOf(row) > -1) {
//   //   classes.push('expanded')
//   // }

//   return classes
// }
