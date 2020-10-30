import '../table/utils'
import ElTableColumn from '../table/TableColumn.vue'

/* istanbul ignore next */
ElTableColumn.install = function (app) {
  app.component(ElTableColumn.name, ElTableColumn)
}

export default ElTableColumn
