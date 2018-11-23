<template>
  <div class="amap-page-container">
    <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :plugin="plugin" :events="events" class="amap-demo">
    </el-amap>

    <div class="toolbar">
      <button @click="getMap()">get map</button>
    </div>
  </div>
</template>

<style>
  .amap-demo {
    height: 500px!important;
  }
</style>

<script>
//   import { AMapManager } from 'vue-amap';
//   const amapManager = new AMapManager();
//   export default {
//     data: function() {
//       return {
//         amapManager,
//         zoom: 12,
//         center: [121.59996, 31.197646],
//         events: {
//           init: (o) => {
//             console.log(o.getCenter());
//             console.log(this.$refs.map.$$getInstance());
//             o.getCity(result => {
//               console.log(result)
//             })
//           },
//           'moveend': () => {
//           },
//           'zoomchange': () => {
//           },
//           'click': (e) => {
//             alert('map clicked');
//           }
//         },
//         plugin: ['ToolBar', {
//           pName: 'MapType',
//           defaultType: 0,
//           events: {
//             init(instance) {
//
//             }
//           }
//         },{
//           pName: 'AMap.DistrictSearch',
//           subdistrict: 1,
//           extensions: 'all',
//           level: 'city',
//           events: {
//             init(instance) {
//               console.log('instance:', instance);
//               instance.setLevel('district');
//               instance.search('朝阳区', function (status, result) {
//                 const map = amapManager._map;
//                 const bounds = result.districtList[0].boundaries;
//                 const polygons = [];
//                 if (bounds) {
//                   for (let i = 0, l = bounds.length; i < l; i++) {
//                     //生成行政区划polygon
//                     const polygon = new AMap.Polygon({
//                       map: map,
//                       strokeWeight: 1,
//                       path: bounds[i],
//                       fillOpacity: 0.7,
//                       fillColor: '#CCF3FF',
//                       strokeColor: '#CC66CC'
//                     });
//                     polygons.push(polygon);
//                   }
//                   map.setFitView();//地图自适应
//                 }
//               })
//
//             }
//           }
//         }]
//       };
//     },
//
//     methods: {
//       getMap() {
//
//       }
//     }
//   }
</script>
