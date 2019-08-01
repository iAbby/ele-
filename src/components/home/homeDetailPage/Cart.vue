<template>
	<div class="cart">
		<div class="empty">
			<div class="goodcart">
				<a href="javascript:" :class="{active:cart.total>0&&goodlist !=''}" @click="gocart()">购物车</a>
				<div class="totalnum" v-if="cart.totalnum>0&&goodlist !=''">{{cart.totalnum}}</div>
			</div>
			<div class="fare">
				<h4 v-if="goodlist != ''">￥ {{cart.total}}</h4>
				<h4 v-if="goodlist ==''">￥ {{fare}}</h4>
				<p>{{list.piecewise}}</p>
			</div>
			
			<!----------还没有商品------------------>
			<div class="agent" v-for="agent in list.piecewise_agent_fee" v-if="cart.total<agent.price">
				<h4 v-if="goodlist ==''">￥{{agent.price}}起送</h4>
				
			<!------------已加入购物车------------>
				<h4 v-if="cart.total<=agent.price&&goodlist != ''">
					还差￥{{agent.price-cart.total}}起送
				</h4>
			</div>
			
			<!------------超过起送价------------>
			<div class="agent agentlist" v-for="agent in list.piecewise_agent_fee" v-if="cart.total>agent.price&&goodlist != ''">
				<a href='javascript:' style="color:white;font-size:18px;font-weight:bold;">
					去结算
				</a>
			</div>
		</div>
		<div class="full" v-if="full&&goodlist != ''">
			<div class="alreadychoose">
				<span style="border-left:2px solid #87c2f8;padding-left: 5px;">
					已选商品
				</span>
				<span @click="clean()" class="clean">清空</span>
			</div>
			<div class="">
				<ul>
					<li v-for="good in goodlist" class="chooselist">
						<div class="goodname">
							<p>{{good.name}}</p>
							<p style="font-size: 12px;color: #999999;">{{good.specifications}}</p>
						</div>
						<div class="goodnum">
							<span style="color:#f60;">￥{{good.price}}</span>
							<span class="delet add" @click="delet(good,good.item_id)">-</span>
							<span class="count" >{{good.count}}</span>
							<span class="add" @click="add(good)">+</span>
						</div>
						
					</li>
				</ul>
			</div>
		</div>
		<div class="clear"></div>
	</div>
	
</template>

<script>
import {handleUrl} from '../../../common/common.js'
import center from '../../../common/notificationCenter.js'
import {mapState} from 'vuex'
import Mark from './Mark.vue'

import {getSellerId,getSellerTop} from '../../../services/home/homeService.js'
let navScroll = null;
export default{
	data(){
		return{
//			cartlist:[],
			goodlist:[],
			list:[],
			fare:0,
			full:false,	
//			goodcount:0
		}
	},
	computed: mapState(['longitude','latitude','cart']),
	methods:{
		handleUrl,
		getData(){
			let id = this.$route.params.id;
//			this.cartlist = this.$store.state.cart.list;
			getSellerTop(this.latitude,this.longitude,id)
			.then(result=>{
				this.list = result;
				
			});
		},
		append(){
			let id = this.$route.params.id;
			for(let i =0; i<this.$store.state.cart.list.length;i++){
				if(this.$store.state.cart.list[i].sellerId==id){
					this.goodlist = this.$store.state.cart.list[i].goods;
//					console.log(this.goodlist)
				}
			}
		},
		gocart(){
			this.full = !this.full
		},
		test(){

		},
		delet(good,goodId){
			let sellerId = this.$route.params.id;
			
			this.$store.dispatch('cart/deleteGoods',{
				sellerId: sellerId,
				foodname: good.name,
				item_id: good.item_id,
				foodImg: good.image_path,
				specifications: good.specifications,
				attr: good.attr,
				count: 1,
				price:good.price,
			})
			
		},
		add(good){
			let sellerId = this.$route.params.id;
			this.$store.dispatch('cart/addGoods',{
				sellerId: sellerId,
				foodname: good.name,
				item_id: good.item_id,
				foodImg: good.image_path,
				specifications: good.specifications,
				attr: good.attr,
				count: 1,
				price:good.price,
			})
			
		},
		clean(){
			let id = this.$route.params.id;
//			this.goodlist =[];
			for(let i =0; i<this.$store.state.cart.list.length;i++){
				if(this.$store.state.cart.list[i].sellerId==id){
					this.$store.state.cart.list.splice(i,1);
					console.log(this.$store.state.cart.list);
					this.goodlist = this.$store.state.cart.list;
					console.log(this.goodlist);
				}
			}
			
		},
	
		
		
	},
	created(){
		this.getData();
		this.$watch('inputVal', (newVal)=>{
			//当用户在1秒之内没有输入内容之后再发送请求
			clearTimeout(timer);
			timer = setTimeout(()=>{
				this.requestData();
			}, 1000);
		})
	},
	mounted(){
		center.$on('add',()=>{
			this.getData();
			this.append();
		})
	},
	updated(){
	}
	

}	
	
</script>

<style>
.cart{
	width: 100%;
	position:absolute;
	left: 0;
	bottom: 0;
	/*overflow: hidden;*/
}
.empty{
	background:rgba(61,61,63,.9);
	height: 60px;
	width: 100%;
}
.empty h4{
	color: white;
}
.empty p{
	color: #999999;
}
.empty .agent{
	width: 120px;
	text-align: center;
	line-height: 60px;
	float: right;
	height: 60px;
}
.empty .agentlist{
	background:#4cd964;
	color:white;
}
.empty .fare{
	width:45%;
	line-height:20px;
	padding-left: 18px;
	padding-top: 10px;
	float:left;
}
.empty .goodcart a{
	width:60px;
	height:60px;
	border-radius: 50%;
	line-height: 60px;
	background:#333333;
	float:left;
	text-align: center;
	color: #999;
}
.empty .goodcart a.active{
	background:#87c2f8;
	color:white;
}
.full{
	width: 100%;
	/*height:100px;*/
	background: lemonchiffon;
	position: absolute;
	bottom: 60px;
	left:0
}
.alreadychoose{
	padding:10px;
    border-bottom: 1px solid #ddd;
    background-color: #eceff1;
    color: #666;
    /*height:40px;
    line-height: 40px;*/
}
.clean{
	position: absolute;
	right: 25px;
	top:10px
}
.chooselist{
	display: flex;
	/*height: 40px;*/
	line-height:20px;
	padding: 10px;
	position: relative;
}
.chooselist .goodname{
	flex:3;
}
.chooselist .goodnum{
	padding-bottom: 10px;
	flex:2;
	
}
.chooselist .goodnum .add{
	color:white;
	width:20px;
	height:20px;
	font-size: 24px;
	line-height: 20px;
	border-radius: 50%;
	background: #3199e8;
	text-align: center;
	display: inline-block;
	position: absolute;
	right:12px;
	top:10px;
}
.chooselist .goodnum .delet{
	right:60px;
	border:1px solid  #3199e8;
	background: white;
	color: #3199e8;
}
.chooselist .goodnum .count{
    position: absolute;
    right: 40px;
}
.totalnum{
	width: 20px;
	height: 20px;
	background: red;
	color: white;
	border-radius:50%;
	position: absolute;
	top:0;
	left:42px;
	text-align: center;
	font-size: 14px;
}
</style>