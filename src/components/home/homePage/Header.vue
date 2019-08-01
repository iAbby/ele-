<template>
	<!--<div id="" style="background: url(../../static/images/arrow_up.png);">
		
	</div>-->
<header class="header">
	<div id="" style="padding:20px;">
	    <span class="location_tTriangle"></span>
		<span @click="changeAddress()">
			<router-link to='/home/location'>{{locationName}}</router-link>
		</span>
		<aside class="aside">
			<p>{{weatherInfo.temperature}}°</p>
			<p>{{weatherInfo.description}}</p>
			<img :src="handleUrl(weatherInfo.image_hash)" class="weatherInfo"/> 
			<!--<img src="" class="weatherInfo"/>-->
		</aside>
	</div>
	<router-link to='/home/search'>
		<div class="search" @click="search_page()">搜索商家、商品名称</div>
	</router-link>
	<div class="list_word_padding">
		<ul class="list_word">
			<div class="list_word_box">
				<li v-for="item in wordArr" @click="keyword(item)">
					<!--<router-link to='/home/search/'>-->
						{{item}}
					<!--</router-link>-->
				</li>
			</div>
			<div class="clear"></div>
		</ul>
	</div>
	
	
</header>
</template>

<script>
import {mapState} from 'vuex'
import {getLocation,getWeather,getWord} from '../../../services/home/homeService.js'
import {handleUrl} from '../../../common/common.js'
export default{
	data(){
		return{
			locationName:'',
			weatherInfo:{},
			wordArr:[]
		}
		
	},
	computed: mapState(['longitude','latitude']),
	methods:{
		handleUrl,
//		search_page(){
//			this.$router.push('/home/search');
//			getWord();
//		},
		changeAddress(){
			
		},
		getData(){
			getLocation(this.latitude,this.longitude)
			.then(result=>{
				this.locationName = result;
			});
			getWeather(this.latitude,this.longitude)
			.then(result=>{
				this.weatherInfo = result;
			});
			getWord(this.latitude,this.longitude)
			.then(result=>{
				this.wordArr = result;
			});
		},
		search_page(){
			this.$router.push('/home/search');
		},
		keyword(item){
			this.$router.push('/home/search/'+item);
		}
		
	},
	created(){
		this.$event.$on('init-data',()=>{
//			console.log('监听到了');
			this.getData();
			
		})
	},
	mounted(){
		let pageScroll = new IScroll(".list_word",{
			scrollX:true
		});
	}
}
</script>

<style scoped>
.header{
	width: 100%;
	height: 150px;
	background:#00a9ff;
	color: white;
	position: relative;
}
.header .aside{
	font-size: 12px;
	position: absolute;
	top: 12px;
	right:50px;
	text-align: center;
}
.header .list_word_padding{
	padding:15px 20px;
}
.header .search{
	font-size: 14px;
	height:40px;
	line-height: 40px;
	color:#666666;
	background: white;
	border: 1px solid #666666;
	margin-left: 20px;
	margin-right: 20px;
	text-align: center;
	border-radius: 5px;
}
.header .weatherInfo{
	position: absolute;
	top:0;
	right:-40px;
	height: 35px;
	width: 35px;
}
.header .list_word{
	width: 100%;
	height: 30px;
	line-height: 30px;
	overflow: hidden;
	font-size: 14px;
}
.header .list_word .list_word_box{
	width: 500px;
	/*overflow: hidden;*/
}
.header .list_word li{
	float: left;
	text-align: center;
	margin-right:20px;
}
.clear{
	clear: both;
}
.header .list_word .list_word_box a{
	color:white;
}
.location_tTriangle{
 	width: 0;
	height: 0;
	border: 6px solid transparent;
	border-top: 6px solid white;
	display: inline-block;	
}
</style>