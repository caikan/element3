import './utils' // 确保加载顺序，避免循环引用时产生undefined
import ElTable from './Table.vue'

/* istanbul ignore next */
ElTable.install = function (app) {
  app.component(ElTable.name, ElTable)
}

export default ElTable
