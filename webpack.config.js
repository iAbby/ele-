
module.exports={
	entry:'./src/main.js',
	output:{
		path:__dirname,
		filename:'dist/app.js'
	},
	module:{
		loaders:[
			{test:/\.js$/,loader:'babel-loader',exclude:/node_modules/},
			{test:/\.vue$/,loader:'vue-loader'},
			{test:/\.css$/,loader:'css-loader!style-loader'},
			{test:/\.(pig|gif|ttf|jpg|jepg)$/,loader:'file-loader'},
			
		]
	},
	devServer: {
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
	}
}
