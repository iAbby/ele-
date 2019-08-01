
## 项目运行
```
npm install

npm run dev

```
## 接口数据
ele 原接口数据 （须跨域）
处理方式2种：
##1.webpack.config.js
<!-- devServer: {
    historyApiFallback: true,
    noInfo: true,
    inline: true,
    proxy: {
        '/bgs': {
            target: 'https://restapi.ele.me',
            secure: false,
            changeOrigin: true
        },
        '/shopping': {
            target: 'https://restapi.ele.me',
            secure: false,
            changeOrigin: true
        },	        
        '/ugc': {
            target: 'https://restapi.ele.me',
            secure: false,
            changeOrigin: true
        }        
    }
} -->

##2.node_modules/webpack-dev-server/Server.js

<!-- app.use('/bgs',httpProxyMiddleware({
    target:'https://restapi.ele.me',
    changeOrigin:true
}));
app.use('/shopping',httpProxyMiddleware({
    target:'https://restapi.ele.me',
    changeOrigin:true
}));
app.use('/ugc',httpProxyMiddleware({
    target:'https://restapi.ele.me',
    changeOrigin:true
})); -->
