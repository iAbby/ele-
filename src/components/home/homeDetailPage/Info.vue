<template>
	<div class="info">
		<div class="warp">
			<div class="infoact">
				<h2>活动与服务</h2>
				<ul>
					<li v-for="(activity, index) in list.activities" class="infolist">
						<span :style="{background: '#'+activity.icon_color}" class="logoact">
							{{activity.icon_name}}
						</span>
						{{activity.description}}
						
					</li>
				</ul>
					
				
			</div>
			<div class="infoact">
				<h2>商家实景</h2>
				<ul>				
					<li v-for="(albums, index) in list.albums" class="infoimg">
						<a href="javascript:">
							<img :src="handleUrl(albums.cover_image_hash)"/>
							<span class="album-2vPHW_0">{{albums.name}}({{albums.count}}张)</span>
						</a>
					</li>
				</ul>
				<div class="clear"></div>	
				
			</div>
			<div class="infoact">
				<h2>商家信息</h2>
				<li class="bottom-px breif">暂无简介</li>
				<li class="phone bottom-px">
					<span>
						商家电话 
					</span>
					<span class="sellertel" v-for="(phone, index) in phone" v-if="index<1">
						{{phone}}&nbsp;>
					</span>
				</li>
				<li class="phone bottom-px">
					<span>
						地址 
					</span>
					<span class="sellertel">
						{{list.address}}&nbsp;
					</span>
				</li>
				<li class="phone">
					<span>
						营业时间
					</span>
					<span class="sellertel" v-for="time in list.opening_hours">
						{{time}}&nbsp;
					</span>
				</li>
			</div>
			<div class="infoact">
				<li class="phone">
					<h2>营业资质</h2>
					<span class="sellertel" style="font-size: 24px;">
						>&nbsp;
					</span>
				</li>
				

				
			</div>
		</div>
	</div>
</template>

<script>
import {handleUrl} from '../../../common/common.js'
import {mapState} from 'vuex'
import Mark from './Mark.vue'

import {getSellerTop} from '../../../services/home/homeService.js'
let infoScroll = null;
export default{
	data(){
		return{
			list:[],
			phone:''
		}
	},
	computed: mapState(['longitude','latitude']),
	methods:{
		handleUrl,
		getData(){
			let id = this.$route.params.id;
			getSellerTop(this.latitude,this.longitude,id).then(result=>{
				this.list = result;
				this.phone = this.list.phone.split(' ')
				console.log(this.phone);
			});
			
		},
	},
	
	created(){
		this.getData()
	},
	mounted(){
		this.infoScroll = new IScroll('.info', {});
	},
	updated(){
		this.infoScroll.refresh();
	}
}
</script>

<style>
.info{
	overflow: hidden;
	position: absolute;
	bottom: 0;
	left: 0;
	top:190px;
	width: 100%;
	background: #f5f5f5;
}
.infolist{
	margin-bottom:2px;
	font-size:10px;
}
.infoimg{
	width:100px;
	float: left;
	margin-right:10px;
}
.infoimg a img{
	width: 100px;
	height: 100px;
}
.infoimg a{
	position: relative;
}
.infoimg a span{
	display: block;
	opacity: 0.6;
	background: black;
	color: white;
	width: 100px;
	position: absolute;
	bottom: 0;
	left: 0;
	text-align: center;
}
.infoact{
	margin: 0 auto;
	padding-top: 20px;
	color: #666;
	padding-left:15px;
	background:white;
	padding-bottom: 20px;
	margin-bottom: 10px;
}
.infoact .phone span{
	text-align: right;
}
.infoact h2{
	font-size:18px;
	padding-bottom: 15px;
}
.logoact{
	margin-right: 5px;
	padding:1px;
	border-radius:4px;
	color: white;
	font-weight: bold;
	display: inline-block;
}
.breif{
	font-size:14px;
	padding-bottom: 20px;
}
.phone{
	padding-top:15px;
	padding-bottom: 15px;
	position: relative;
}
.phone .sellertel{
	
	color: #666;
	font-weight: 100;
	position: absolute;
	right: 10px;
	top:15px

}
.phone span{
	font-size:14px;
	color: #333;
	font-weight: bold;
}
</style>