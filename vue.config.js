module.exports = {
  // publicPath: "../owner",
  devServer: {
    // 设置代理
    proxy: {
      "/center": {
        target: "https://hkauth.wujisafe.com:12345", // 域名
        // target: "http://10.88.66.21:12890/", // 域名
        secure: false,
        ws: true, // 是否启用websockets
        changOrigin: true // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      },
      "/owner": {
        target: "https://hkauth.wujisafe.com:12345", // 域名
        // target: "http://10.88.66.21:12890/", // 域名
        secure: false,
        ws: true, // 是否启用websockets
        changOrigin: true // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      },
      "/diskless": {
        target: "https://hkauth.wujisafe.com:12345", // 域名
        // target: "http://10.88.66.21:12890/", // 域名
        secure: false,
        ws: true, // 是否启用websockets
        changOrigin: true // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      }
    }
  }
};
