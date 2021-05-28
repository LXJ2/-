import http from '../../utils/http.js'

export function getProductData() {
    return http.get('/api/xiaomi/productList')
    /* .then(data => {
        /* this.productData = this.productData.concat(data.data);
        this.isReachBottom = false; 
        console.log(data)*/
  }
  export function getSwiper(){
      return http.get('/api/xiaomi/swiper')
  }
  export function navList(){
      return http.get('/api/xiaomi/nav')
  }
  export function getMenuList(){
      return http.get('/api/xiaomi/menu')
  }
  export function getMenuDetail(menuId){
     return http.get('/api/xiaomi/menuDetail?id='+ menuId)
  }
  export function getUserDetail(){
      return http.get('/api/xiaomi/userList')
  }