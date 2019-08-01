<template>
<div class="page subpage" id="cart">
	<div @click="backAction()" class="btn_back">
		&lt;
		<span class="cart_title">购物车</span>
		
	</div>
	<div class="cartscroll">
		<div class="listscroll">
			<h3 v-if="data==''">请先添加商品</h3>
			<ul class="bottom-px" v-if="data!=''">
				<li v-for="item in data" class="bottom-px" style="margin-bottom: 20px;">
		
					<h3 class="bottom-px">商家ID：{{item.sellerId}}</h3>
					<div v-for="good in item.goods" class="listname bottom-px">
						<div style="flex: 1;">
							<img :src="handleUrl(good.image)" width="80px"/>
						</div>
						
						<div style="flex: 2;display: flex;">
							<div class="goodname" style="flex: 1;margin-left: 10px;padding-top: 10px;">
								<p>{{good.name}}</p><br />
								<p>{{good.count}}</p>
							</div>
							<div class="" style="flex: 1;text-align: right;margin-right: 10px;padding-top: 10px;">
								<p @click="dalete()">X</p><br />
								<p style="color:#ff6000;font-weight: bold;">￥{{good.price}}</p>
							</div>
						</div>
						
					</div>
				</li>
			</ul>
		</div>
	</div>
</div>
</template>

<script>
import {mapState} from 'vuex'
import center from '../../common/notificationCenter.js'
import {getSellerTop} from '../../services/home/homeService.js'	
import {handleUrl} from '../../common/common.js'
export default{
	data(){
		return{
			data:[]
		}
		
	},
	computed: mapState(['longitude','latitude','cart']),
	methods:{
		handleUrl,
		getData(){
			console.log(this.cart.list)
			this.data = this.cart.list;
			this.cart.list.forEach(item=>{
//				console.log(item)
			})
//			getSellerTop(this.latitude,this.longitude,id)
//			.then(result=>{
//				this.list = result;
//				this.length = this.list.activities.length;
//			});
		},
		backAction(){
			this.$router.back();
		},
		dalete(){
			console.log(11)
		}
	},
	created(){
		this.getData();
	},
	mounted(){
		center.$on('add',()=>{
			this.getData();
		})
		let ListScroll = new IScroll(".cartscroll");
		ListScroll.on('scrollStart',()=>{
			ListScroll.refresh();
		});
	}
}
</script>

<style>
#cart{
	background:lightblue;
}
#cart .btn_back{
	font-size: 32px;
	font-weight: 600;
	line-height:30px;
	margin-bottom: 10px;
	color: white;
	height:50px;
	background: #0085ff;
}
.cart_title{
	font-size:28px;
	position: absolute;
	top: 5px;
	left:40%
}
/*.goodname{
	position: absolute;
	width: 80%;
	left: 120px;
	
}*/
.listname{
	display: flex;
}
.cartscroll{
	position: absolute;
	left: 0;
	bottom: 0;
	top:50px;
	width: 100%;
	box-sizing: border-box;
	padding-bottom:30px;
	overflow: hidden;
}
</style>