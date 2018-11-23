import HomePageData from './home/home.json'

// const slider_images = require.context('./sliders', false, /\.(png|pg|gif|svg)$/);
//
// HomePageData.top.forEach((x) => {
//   x.img_url = slider_images('./' + x.img_url) //  获取真正的地址
// });

export default {
  getHomeData(){
    return HomePageData
  }
}
