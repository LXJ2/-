let baseUrl = 'http://localhost:8088';
function http(option,withLoding = true){
  let {url,method="GET",data={}} = option;
  if (withLoding) wx.showLoading({
    title: '加载中...',
  });
  return new Promise((res,rej)=>{
    wx.request({
      url: baseUrl+url,
      method:method.toUpperCase(),
      data,
      success(data){
        res(data.data)
      },
      fail: (err) => {
        console.log(ererr);
        return alwasPending;
      },
      complete: () => {
        if (withLoding) wx.hideLoading({
          success: (res) => {},
        });

      }
    })
  })
}
http.post = function(url,data){
  return http({url:url,data:data,method:"POST"})
}
http.get = function(url,data){
  return http({ url: url, data: data, method: "GET" })
}
export default http