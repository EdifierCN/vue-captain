
import {GridItem, Grid} from './components/grid'

const install = function (Vue) {
  Vue.component(GridItem.name, GridItem);
  Vue.component(Grid.name, Grid);
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install
};


