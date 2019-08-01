<template>
<div id="banner" class="swiper-container banner">
    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="list in bannerList">
        	<ul class="banner-list">
        		<li class="banner-item" v-for="item in list">
        			
        			<router-link to=''>
        				<div class="contaier">
	        				<img :src="handleUrl(item.imageUrl)"/>
	        				<p>{{item.name}}</p>
	        			</div>
        			</router-link>
        		</li>
        	</ul>
        </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>	
</div>
</template>

<script>
import {mapState} from 'vuex'
import {getSwiperList} from '../../../services/home/homeService.js'
import {handleUrl} from '../../../common/common.js'
let bannerSwiper = null;
export default{
	data(){
		return{
			bannerList:[]
		}
		
	},
	computed: mapState(['longitude','latitude']),
	methods:{
		handleUrl,
		getData(){
			getSwiperList(this.latitude,this.longitude)
			.then(result=>{
				this.bannerList=result;
			});
		}
	},
    created(){
    	this.$event.$on('init-data', ()=>{
			//有了经纬度，可以请求banner数据
			this.getData();
		})
    },
    mounted(){
		//创建轮播图
		bannerSwiper = new Swiper('.banner', {
			 // 如果需要分页器
    		pagination: '.swiper-pagination',
		});
	},
	updated(){
		//更新轮播图
		bannerSwiper.update();
	}
}
</script>

<style scoped>

.banner{
	width: 100%;
	background:white;
}
.banner-list{
	width: 100%;
	overflow: hidden;
	margin-bottom: 20px;
}
.banner-item{
	width: 25%;
	float: left;
	font-size:14px;
}

.banner-item img{
	width:50%;
	margin-left:22px;
}
.banner-item p{
	width: 100%;
	margin-top: 5px;
	text-align: center;
}
.banner-item .contaier{
	margin:10px 0;
	width:100%;
}
</style>