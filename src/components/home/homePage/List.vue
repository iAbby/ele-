<template>
<div id="list">
	<div class="shoplist-title" style="">
    	推荐商家
  	</div>
  	<ul class="list">
		<li class="item bottom-px" v-for="listItem in listData" @click="toDetail(listItem)">
			<div class="item-image">
				<img :src="handleUrl(listItem.image_path)" />
				
				
				<!--<div class="cartnum" v-for="cartgood in cartData">{{cartgood}}</div>-->
			</div>
			<div v-for="cartgood in cartData" v-if="sellerId==cartgood.sellerId">{{count}}</div>
			<div class="item-content">
				<h3>{{listItem.name}}</h3>
				<p style="font-size:14px;margin-bottom: 10px;">{{listItem.rating}}&nbsp;&nbsp;&nbsp;月售{{listItem.num}}单</p>
				<div class="easy">
					<span v-for="fare in listItem.fare">
						￥{{fare.fee}}起送&nbsp;&nbsp;
						
					</span>
					<span>{{listItem.faredescription}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
					<span>
						{{getDistance(listItem.latitude,listItem.longitude,latitude,longitude)}}km
						&nbsp;
					</span>
					<span class="time">
						{{listItem.time}}分钟
					</span>
				</div>
				<p class="popularity">
					<img :src="handleUrl(listItem.recommend.image_hash)"/>
					<span>{{listItem.recommend.reason}}</span>
				</p>
				
				
				<div class="activities-info top-px">
					<ul class="activities">
						<li v-for="(activity, index) in listItem.activities" 
							v-if="index<=1 || listItem.isexpend">
							<span :style="{background: '#'+activity.icon_color}">
								{{activity.icon_name}}
							</span>
							{{activity.description}}
							
						</li>
					</ul>
					<div class="btn" v-if="listItem.activities.length>0"
						@click.stop="activityActon(listItem)">
						{{listItem.activities.length}}个活动
						<span class="triangle"></span>
					</div>
				</div>
				
			</div>
		</li>
	</ul>
</div>
</template>

<script>
import {mapState} from 'vuex'
import {getSellerList} from '../../../services/home/homeService.js'
import {handleUrl} from '../../../common/common.js'
import center from '../../../common/notificationCenter.js'
import {getDistance} from '../../../common/distance.js'
export default{
	data(){
		return{
			limit: 20,
			listData: [],
			loadmoreFlag: false,
			cartData:[],
			sellerId:'1033417',
			isShow:false,
			item:'',
			count:0
		}
		
	},
	computed: mapState(['longitude','latitude','cart']),
	methods:{
		handleUrl,
		getDistance,
		getData(){
			let offset = this.listData.length;
			getSellerList(this.latitude,this.longitude,offset,this.limit)
			.then(result=>{				
				if(!this.loadmoreFlag){
					this.listData = result;
					this.append();
				}
				else{
					this.listData = this.listData.concat(result);
				}
				//关闭父组件加载更多
				if(this.loadMoreCallback){
					this.loadMoreCallback();
					
				}
				this.$emit('refreshContent');
			});
		},
		activityActon(listItem){
			listItem.isexpend = !listItem.isexpend;
			this.$emit('refreshContent');
		},
		toDetail(listItem){
			this.$router.push('/home/seller-detail/'+listItem.id);
		},
		append(){
			if(this.cart.list.length){
			for(let i =0; i<this.cart.list.length;i++){
//				if(this.$store.state.cart.list[i].sellerId==id){
					this.cartData = this.cart.list;
					this.cartData.forEach((item)=>{
						item.goods.forEach((value)=>{
							this.count += value.count;
//							totalnum += value.count;
//							this.item=item
						})
					})
//					cartgood.goods[0].count
//					console.log(this.cartData)
//				}
			}
		}
		},
		
	},
	
    created(){
    	//初始化请求列表数据
    	this.$event.$on('init-data', ()=>{
			//有了经纬度，可以请求banner数据
			this.loadmoreFlag = false;
			this.getData();
		});
		//请求更多列表数据
		this.$event.$on('loadmore-list', (callback)=>{
			this.loadmoreFlag = true;
			this.getData();
			this.loadMoreCallback = callback;
		});
		center.$on('add',()=>{
			this.append();
		})
    },
    mounted(){
		
	},
	updated(){
		
	}

}
</script>

<style scoped>
#list{
	width: 100%;
}
#list .shoplist-title{
	display: flex;
	align-items: center;
	justify-content: center;
	height:40px;
    font-size:18px;
    color: #000;
    background-color: #fff;
}
.shoplist-title:before {
    margin-right:10px;
}
.shoplist-title:after {
    margin-left:10px;
}

.shoplist-title:after, .shoplist-title:before {
    display: block;
    content: "";
    width:25px;
    height:3px;
    background-color: #999;
}
#list .list{
	width: 100%;
}
#list .list .item{
	display: flex;
	padding: 6px;
	margin-left:18px;
	margin-right:18px;
	margin-bottom:15px;
}
#list .item .item-image{
	width: 60px;
	height: 60px;
	position: relative;
}
#list .item .item-image img{
	/*width: 100%;*/
	width: 60px;
	height: 60px;
}
#list .item .item-content{
	flex: 1;
	margin:0 18px 0 10px;
	
}
#list .item .item-content .popularity span{
	color: rgb(232, 71, 11);
	font-size: 12px;
}
#list .item .item-content .popularity img{
	display: inline-block;
	width:15px;
}
#list .item .item-content .easy{
	font-size:12px;
	color:#999999;
	/*text-align: right;*/
	/*position: absolute;
	right: 0;*/
}
#list .item .item-content .easy .time{
	padding-left:8px;
	border-left: 1px solid #999999;
}
#list .item .item-content h3{
	font-size: 16px;
	color: #333;
	margin-bottom:10px;
}
#list .item .item-content .activities{
	color: #999;
	font-size: 12px;
}
#list .item .item-content .activities span{
	color: #fff;
	border-radius: 2px;
	font-size: 12px;
	padding: 2px;
}
#list .item .item-content .activities li{
	margin-bottom:8px;
	width:220px;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow:hidden;
}
#list .item .item-content .activities-info{
	position: relative;
	padding-top: 10px;
	margin-top: 10px;
}
#list .item .item-content .activities-info .btn{
	position: absolute;
	top: 2px;
	right: 2px;
	font-size:12px;
	padding-right: 12px;
}    
#list .btn .triangle{
	width: 0;
    height: 0;
    border-left:6px solid transparent;
    border-right:6px solid transparent;
    border-top: 8px solid #666666;
    border-bottom: 8px solid transparent;
    position: absolute;
    right: 0;
    top:5px
}
.cartnum{
	width:20px;
	height:20px;
	color: white;
	background:#ff7416;
	border-radius: 50%;
	position: absolute;
	top:-6px;
	right:-8px;
	font-size:12px;
	line-height:20px;
	text-align: center;
}   
</style>