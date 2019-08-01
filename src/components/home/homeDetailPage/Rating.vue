<template>
	<div class="rating">
		<div class="warp">
			<ul>
				<div class="rating_box">
					<div class="left">
						<h1 class="rat_red">{{rat.overall}}</h1>
						<p>综合评价</p>
						<p style="font-size:12px;color: #999999;">高于周边商家{{rat.good}}%</p>
					</div>
					<div class="right">
						<p>服务态度<span class="rat_red">{{rat.service}}</span></p>
						<p>菜品评价<span class="rat_red">{{rat.food}}</span></p>
						<p>送达时间<span>{{rat.time}}分钟</span></p>
					</div>
				</div>
				
				<div class="rating-list bottom-px">
					<span v-for="(item,index) in ratlist" 
						class="rating_item" :class="{active:selectWell==index}"
						@click="wellchoose(index,item)">
						{{item.name}}({{item.amount}})
					</span>
				</div>

				<li class="bottom-px rat_box"  v-for="item in list">
					<div class="img_rat">
						<img src="http://placehold.it/40x40"/>
					</div>
					<div class="text_rat">
						<p>{{item.username}} <span>{{item.rated_at}}</span> </p>
						<p>评分：{{item.rating}}</p>
						<p>{{item.rating_text}}</p>
						<ul  class="text_rat_img">
							<li class="text_rat_l" v-for="path in item.order_images" v-if='item.food_ratings'>
								<img :src="handleUrl(path.image_hash)" width="80px"/>
								<div class="nowarp" v-if="path.image_hash">{{path.food_names[0]}}</div>
								<div class="nowarp" v-if="path.food_names[0]==''">{{item.rate_name}}</div>
							</li>
						</ul>
						<div class="clear"></div>
					</div>
					<div class="clear"></div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import {handleUrl} from '../../../common/common.js'
import {mapState} from 'vuex'
import Mark from './Mark.vue'

import {getRating,getselRating,getWell,getAllWell,getall} from '../../../services/home/homeService.js'
let ratScroll = null;
export default{
	data(){
		return{
			list:[],
			limit:10,
			loadmoreFlag: false,
			rat:[],
			ratlist:[],
			selectWell:0,
			type:0,
//			offset:0,
			name:'全部'
		}
	},
	methods:{
		handleUrl,
		wellchoose(index,item){
			this.selectWell = index;
			this.name = item.name;
			this.getData()
		},
		getData(){
			let id = this.$route.params.id;
			let offset = this.list.length;
			getselRating(id).then(result=>{
				this.rat = result;
			});
			getWell(id).then(result=>{
				this.ratlist = result;
			});
			getall(id,this.name,offset,this.limit).then(result=>{
				if(!this.loadmoreFlag){
					this.list = result;
				}
				else{
					this.list = this.list.concat(result);
				}
////				//关闭父组件加载更多
				if(this.loadMoreCallback){
					this.loadMoreCallback();
					
				}

			});
					
		},
		
	},
	
	created(){
		this.getData();
		//请求更多列表数据
		this.$event.$on('loadmore-rating', (callback)=>{
			this.loadmoreFlag = true;
			this.getData();
			this.loadMoreCallback = callback;
		});
	},
	mounted(){
		this.ratScroll = new IScroll('.rating', {
			probeType:3
		});
		this.ratScroll.on('scrollEnd',()=>{
			this.$event.$emit('loadmore-rating');
		},300)
	},
	updated(){
		this.ratScroll.refresh();
//		console.log(this.ratScroll.maxScrollY)
	}
}
</script>

<style>
.rating{
	overflow: hidden;
	position: absolute;
	bottom: 0;
	left: 0;
	top:190px;
	width: 100%;
	background: #eee;
}
.text_rat_img{
	overflow: hidden;
}

.rat_box{
	width:96%;
	padding: 10px 10px 20px 10px;
	background: white;
}
.nowarp{
	width:80%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	padding-top: 5px;
	font-size: 12px;
}
.img_rat{
	float: left;
	width: 15%;
}
.img_rat img{
	width: 100%;
	border-radius: 50%;
}
.text_rat{
	padding-left: 10px;
	/*float: left;*/
	overflow: hidden;
	/*display: flex;*/
	
}
.text_rat_l{
	float: left;
	width:89px;
}
.text_rat_l img{
	padding-top: 10px;
	
}
.rat_red{
	color: #ff6000;
}
.rating_box{
	display: flex;
	padding:20px 10px;
	font-size: 14px;
	color: #666666;
	background: white;
	margin-bottom: 20px;
}
.rating_box .left{
	text-align: center;
	flex:2;
	padding-right: 10px;
	border-right: 1px solid #999999;
	line-height: 26px;
}
.rating_box .left h1{
	font-size: 20px;
}
.rating_box .right{
	line-height: 26px;
	flex:3;
	padding-left: 18px;
}
.rating_item.active{
    color: #fff;
    background-color: #0097ff; 
}
.rating-list{
	padding: 10px 10px 20px 10px;
	background: white;
}
.rating_item{
	display: inline-block;
	color: #666666;
	background: #ebf5ff;
	height:34px;
	font-size: 14px;
    line-height:34px;
    border-radius:5px;
    margin-right: 10px;
    padding:0 5px;
    margin-bottom: 10px;
    
}

</style>