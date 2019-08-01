<template>
<div class="header">
	<div class="header_top" :style="{background:'url('+handleUrl(list.image_path)+')no-repeat'}">
	</div>
	<div class="header_mei" ></div>
	<div class="header_btm" >
		  <!--:style="{background:'url('+handleUrl(list.image_path)+')no-repeat'}"-->
	
		<div @click="backAction()" class="btn_back">&lt;</div>
		<div class="pushcart" @click="gocart()">购物车</div>
		<div class="header_list">
			<div class="shop_img">
				<img :src="handleUrl(list.image_path)"/>
			</div>
			<div class="shop_name">
				<h3>{{list.name}}</h3>
				<p>
					<span>{{list.text}}</span>&nbsp;&nbsp;/
					<span>{{list.time}}分钟送达</span>&nbsp;&nbsp;/
					<span>{{list.piecewise}}</span>
					
					
					<!--<span>{{list.piecewise_agent_fee}}</span>-->
				</p>
				<p class="notice">公告：{{list.promotion_info}}</p>
			</div>
		</div>
		<div class="btm_list">
			<ul class="activities">
				<li v-for="(activity, index) in list.activities" 
					v-if="index<1 || list.isexpend">
					<span :style="{background: '#'+activity.icon_color}">
						{{activity.icon_name}}
					</span>
					{{activity.description}}
					
				</li>
			</ul>
			<div class="btn" v-if="length>0"
				@click="activityActon(list)">
				{{list.activities.length}}个活动&nbsp;
				<div class="white"></div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import {handleUrl} from '../../../common/common.js'
import {mapState} from 'vuex'

import {getSellerTop} from '../../../services/home/homeService.js'
export default{
	data(){
		return{
			list:[],
			length:''
		}
	},
	computed: mapState(['longitude','latitude','cart']),
	methods:{
		handleUrl,
		getData(){
			let id = this.$route.params.id;
			getSellerTop(this.latitude,this.longitude,id)
			.then(result=>{
				this.list = result;
				this.length = this.list.activities.length;
			});
		},
		backAction(){
			this.$router.back();
		},
		gocart(){
//			console.log(this.cart);
			this.$router.push('/cart')
			
		}
	},
	created(){
		this.getData();
	}
}
</script>

<style scoped>
.header{
	width: 100%;
	height: 160px;
	color: white;
	/*background:black;*/
}
.header_top{
	z-index:2;
	width: 100%;
	position:absolute;
	filter: blur(5px);
	background-size:200% !important;
	background-position: -155px -200px !important;
	height: 160px;
}
.header_mei{
	z-index:3;
	width: 100%;
	position:absolute;
	filter: blur(22px);
	background:#4d4067d4;
	height: 160px;
}
.header_btm{
	z-index:10;
	width: 100%;
	position:absolute;
	height: 160px;
}
.header .btn_back{
	font-size: 30px;
	font-weight: 600;
	line-height:30px;
	margin-left: 10px;
	margin-bottom: 10px;
}
.header .header_list{
	display: flex;
	
}
.header .header_list .shop_name{
	margin-left: 10px;
	margin-right: 10px;
}
.header .header_list .shop_name p{
	font-size:14px;
}
.header .header_list .shop_img{
	margin-left: 10px;
	width:86px;
	height:86px;
}
.header .header_list .shop_img img{
	width: 100%;
	height: 100%;
}
.header .header_list .shop_text{
	font-size: 14px;
	flex:3;
}
.header .btm_list{
	position: relative;
}
.header .btm_list .activities{
	padding-top: 10px;
	margin-left: 10px;
	font-size: 12px;
}
.header .btm_list .btn{
	position: absolute;
	right:20px;
	top:10px
}
.header .btm_list .btn div.white {
	width: 0;
    height: 0;
    border-left:6px solid white;
    border-right:6px solid transparent;
    border-top: 4px solid transparent;
    border-bottom:4px solid transparent;
    position: absolute;
    right:-14px;
    top:8px
}
.notice{
	font-size:14px;
	width:240px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}
.pushcart{
	padding: 5px;
	background: lemonchiffon;
	border-radius: 5px;
	position:absolute;
	right: 10px;
	top:10px;
	color: #666666;
}
</style>