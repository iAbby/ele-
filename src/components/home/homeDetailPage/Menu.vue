<template>
	<div class="menu">

		<div class="menu_nav">
			<nav class="wrap">
				<li v-for="(item,index) in listadd" 
					:class="{active:index==selectMenuIndex}"
					@click="menuAction(index)">
					
					<img :src="handleUrl(item.icon_url)" v-if="item.icon_url"/>{{item.name}}
				</li>
			</nav>
		</div>
		<div class="menu_list">
			<ul class="wrap">
				<li class="foods_list" v-for="(itemlist,index) in listadd">
					<h3 class="title bottom-px">
						{{itemlist.name}}
						<span style="color: #999999;font-size:14px;">{{itemlist.description}}</span>
					</h3>
					<ul class="foods" :key="index">
	<!--菜单详情-->
						<!--<li v-for="(menu,index) in addcart"  :key="index">-->
						<li v-for="(menu,index) in itemlist.foods"  :key="index">
							<div class="foods_l">
								<img :src="handleUrl(menu.image_path)"/>
							</div>
							
							<div class="foods_r">
								<p style="padding-top: 5px;">{{menu.name}}</p>
								<p class='des'>{{menu.description}}</p>
								<p class='sale'>
									<span>月售{{menu.month_sales}}份</span>&nbsp;
									<span>好评率{{menu.satisfy_rate}}%</span>
								</p>
								
								<p v-for="(food,index) in menu.specfoods" v-if="index<1" style="position: relative;">
									<span>
										<em>￥{{food.price}}</em>
										<em class="original">{{food.original_price}}</em>
									</span>
									
				<!---添加商品或者删除商品-->
									<transition v-if="menu.count">
										<span class="delet add" @click="delet(menu.item_id,menu)"  :key="index" v-if="menu.count>=1">-</span>
									</transition>
									<transition v-if="menu.count">
										<span class="count"  :key="index" v-if="menu.count>=1">&nbsp;{{menu.count}}&nbsp;</span>
									</transition>
									
									<span class="add" v-if="menu.specfoods.length==1"
										@click="add(menu.item_id,menu)">+</span>

										
									<div class="add_text add" v-if="menu.specfoods.length>1"
										@click="choose(index)" 
										>选规格</div>
										
				<!--规格弹框-->	
									<div class="food_mask" v-if="specs_text&&listIndex==index&&menu.specfoods.length>1">
										<p style="text-align: center;padding-bottom: 10px;">
											{{menu.name}} <span class="close" @click="close()">X</span>
										</p>
										<p style="padding-bottom: 10px;">&nbsp;&nbsp;规格</p>
										<span v-for='(specs_list,index) in menu.specfoods' class="spec" 
											:class="{blue:specsIndex==index}"
											@click="choose_spec(index)">
											{{specs_list.spec}}
											
										</span>
										<br />
										<br />
										<p v-for="attr in menu.attrs" v-if="attr">
											<span  style="font-size:18px;margin-bottom: 10px;display: block;">&nbsp;&nbsp;{{attr.name}}</span>
											<!--<br />-->
											<span v-for='(attr_val,index) in attr.values' class="spec" 
												:class="{blue:attrIndex==index}"
												@click="choose_attr(index)">
												{{attr_val}}
												
											</span>
										</p>
										<br />
										<span v-for='(specs_list,index) in menu.specfoods'  style="margin-bottom: 20px;display: inline-block;">
											<span v-if="specsIndex==index" class="original_spec">
												{{specs_list.price}}
											</span>
											<div class="add_text add goodjob" @click="spec_cook(attrIndex,specsIndex,menu)" :key="index">
											<!--<span class="add_text add goodjob" @click="add(menu.item_id,menu)">-->
												选好了
											</div>
										</span>
										
									</div>
								</p>							
							</div>
							
						</li>
					</ul>
				</li>
			</ul>
			

		</div>
	</div>
</template>

<script>
import {handleUrl} from '../../../common/common.js'
import center from '../../../common/notificationCenter.js'
import {mapState} from 'vuex'
import Mark from './Mark.vue'
import Vue from 'vue'

import {getSellerId,getRating,getSellerTop} from '../../../services/home/homeService.js'
let navScroll = null;
export default{
	data(){
		return{
			listadd:[],
			listseller:[],
			length:'',
			selectMenuIndex:0,
			offset:0,
			limit:10,
			specs_text:false,
			listIndex:0,
			specsIndex:0,
			attrIndex:0,
			countadd:1,
			countadd_text:false,
			addnum:'',
			itemId:'',
			fare:0,
			addcart:[],
			carlist:[]
		}
	},
	computed: mapState(['longitude','latitude','cart']),
	components:{
		'food_mask':Mark
	},
	methods:{
		handleUrl,
		getData(){
			let id = this.$route.params.id;
			let arr = this.listadd ;
			getSellerId(id).then(result=>{
				// arr = result;
				// arr.forEach((item,index)=>{
				// 	item.foods.forEach((value,idx)=>{
				// 		value.count = 0;
				// 	})
					
				// });
				// this.listadd = arr;
			});
		
			
			getSellerTop(this.latitude,this.longitude,id)
			.then(result=>{
				this.listseller = result;
				this.fare = this.listseller.piecewise_agent_fee[0].fee;
			});
			
		},
		
		menuAction(index){
			//1.让左边的菜单按钮选中
			this.selectMenuIndex = index;
//			console.log(this.selectMenuIndex)
//			console.log(index)
			//2.让右边的菜单滚动到对应位置上
			let offsetheight = 0;
			for(let i = 0; i < index; i++){
				offsetheight -= this.heightArr[i];
			}
			this.listScroll.scrollTo(0,offsetheight,300);
		},
		handelList(){
			let smallListDoms = document.querySelectorAll('.foods_list');
			this.heightArr = [];
			for(let i = 0; i < smallListDoms.length; i++){
				this.heightArr.push(smallListDoms[i].offsetHeight);
			}
			let navListDoms = document.querySelectorAll('.menu_nav li');
			this.navHeightArr = [];
			for(let i = 0; i < navListDoms.length; i++){
				this.navHeightArr.push(navListDoms[i].offsetHeight);
			}
		},
		choose(index){
			this.specs_text=true;
			this.listIndex=index;
		},
		choose_spec(index){
			this.specsIndex = index;
		},
		choose_attr(index){
			this.attrIndex = index;
		},
		spec_cook(attrIndex,specsIndex,menu){
			this.specs_text=false;
			this.itemId = menu.item_id;
			let id = this.$route.params.id;
			menu.count = menu.count+1;
//			console.log(specsIndex)
			this.$store.dispatch('cart/addGoods',{
				sellerId: id,
				foodname: menu.name,
				item_id: menu.item_id,
				foodImg: menu.image_path,
				specifications: menu.specifications.length==0?'':menu.specifications[0].values[specsIndex],
				attr: menu.attrs.length==0?'':menu.attrs[0].values[attrIndex],
				count: 1,
				price:menu.specfoods[0].price,
				fare:this.fare
			})
			for(let i =0; i<this.cart.list[0].goods.length;i++){
				if(this.cart.list[0].goods[i].item_id==this.itemId){
					this.addnum= this.cart.list[0].goods[i].count;
//					console.log(this.$store.state.cart.list[0].goods[i])
				}
			}
			center.$emit('add');
		},
//		append(){
//			let id = this.$route.params.id;
//			for(let i =0; i<this.$store.state.cart.list.length;i++){
//				if(this.cart.list[i].sellerId==id){
//					this.addcart = this.cart.list[i].goods;
//					console.log(this.addcart)
//				}
//			}
//		},
		add(itemId,menu){
			let sellerId = this.$route.params.id;
			this.itemId = itemId;
			menu.count = menu.count+1;
//		console.log(menu)
			this.$store.dispatch('cart/addGoods',{
				sellerId: sellerId,
				foodname: menu.name,
				item_id: menu.item_id,
				foodImg: menu.image_path,
				specifications: menu.specifications.length==0?'':menu.specifications[0].values[0],
				attr: menu.attrs.length==0?'':menu.attrs[0].values[0],
				count: 1,
				price:menu.specfoods[0].price,
				fare:this.fare
			})
			for(let i =0; i<this.cart.list[0].goods.length;i++){
				if(this.cart.list[0].goods[i].item_id==itemId){
					this.addnum= this.cart.list[0].goods[i].count
				}
			}
			center.$emit('add')
		},
		delet(id,menu){
			if (menu.count >= 1) {
				menu.count = menu.count-1
			}
			let sellerId = this.$route.params.id;
			this.$store.dispatch('cart/deleteGoods',{
				sellerId: sellerId,
				foodname: menu.name,
				item_id: menu.item_id,
				foodImg: menu.image_path,
				specifications: menu.specifications.length==0?'':menu.specifications[0].values[0],
				attr: menu.attrs.length==0?'':menu.attrs[0].values[0],
				count: 1,
				price:menu.specfoods[0].price
			})	
			center.$emit('add')
		},
		close(){
			this.specs_text=false;
		}
	},
	created(){
		this.getData();
	},
	mounted(){

		this.navScroll = new IScroll('.menu_nav', {});
		this.listScroll = new IScroll('.menu_list',{
			probeType:3
		});
		//监听菜单的滚动，让菜单对应的按钮选中
		this.listScroll.on('scroll',()=>{
			for(let i = 0; i < this.heightArr.length; i++){
				let min = 0;
				let max = 0;
				for(let j = 0; j < i; j++){
					min += this.heightArr[j];
				}
				max = min+this.heightArr[i];
//				如果menuScroll.y值介于max和min之间,那么this.selectMenuIndex 
				let y = this.listScroll.y * (-1);
				if(y>min&&y<max){
					this.selectMenuIndex = i;
//					//判断左边的按钮是否可见。
					let y =0;
					for(let i = 0; i < this.selectMenuIndex; i++){
						y -= this.navHeightArr[i];
					}
					//是否可以滚动到y的位置
					if(y > this.navScroll.maxScrollY){
						this.navScroll.scrollTo(0,y,100)
					}
					break;
				}
			}

		})
	},
	updated(){
		this.navScroll.refresh();
		this.listScroll.refresh();
		
		//如果还不知道列表高度，去取得列表高度
		if(!this.heightArr){
			this.handelList();
		}
		
		
	}
}
</script>

<style scoped>
.menu{
	display: flex;
	width: 100%;
	position: absolute;
	left:0;
	top:200px;
	bottom: 40px!important;
}
	
.menu .menu_nav img{
	display: inline-block;
	width:15px;
}
.menu .menu_nav{
	width:23%;
	overflow: hidden;
}
.menu .menu_nav li{
	padding: 14px 8px;
	font-size: 14px;
	line-height: 14px;
	color: #666;
	background: #f5f5f5;
}
.menu .menu_nav li.active{
	color: #333;
	background:lemonchiffon;
}
.menu .menu_list{
	padding-left: 10px;
	overflow: hidden;
	flex: 1;
}
.menu .menu_list .foods li{
	display: flex;
	margin-bottom:20px;
}
.menu .menu_list .foods li img{
	width:80px;
}
.menu .menu_list .foods li .foods_l{
	width:80px;
}
.menu .menu_list .foods li .foods_r{
	flex: 1;
	overflow: hidden;
	max-width:180px;
	line-height:22px;
	padding-left: 10px;
}
.foods_list .title{
	padding-bottom:15px;
	padding-top:15px;
}
.menu .menu_list .foods li .foods_r .des{
	color: #999999;
	font-size: 12px;
	width:100%;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	margin-right:0;
}
.menu .menu_list .foods li .foods_r .sale{
	font-size: 14px;
}
.menu .menu_list .foods li .foods_r .original{
	color: #666666;
	text-decoration:line-through;
	font-size:12px;
}
.menu .menu_list .foods li .foods_r em{
	font-size:14px;
	color:#f60;
	font-style: normal;
}
.menu .menu_list .foods li{
	position: relative;
}
.menu .menu_list .foods li .add{
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
	bottom:2px;
}
.menu .menu_list .foods li .delet{
	right:70px;
	border:1px solid  #3199e8;
	background: white;
	color: #3199e8;
}
.menu .menu_list .foods li .count{
    width: 30px;
    position: absolute;
    right: 40px;
    bottom: 2px;
}
.menu .menu_list .foods li .add_text{
	line-height:20px;
	font-size:12px;
	width:40px;
	height:20px;
	border-radius:10px;
}
.food_mask{
	width:240px;
    display: block;
    position:fixed;
    overflow: hidden;
    background-color:lemonchiffon;
    padding-top: 20px;
    opacity: 1;
    z-index: 100;
    left:-10px;
    /*top:0px;*/
}
.spec{
	border: 1px solid #666;
	line-height:18px;
	margin:0 10px 5px 10px;
	font-size:14px;
	border-radius: 6px;
	display: inline-block;
	margin-bottom: 5px;
}
.spec.blue{
	border: 1px solid #3199e8;
	color: #3199e8;
}
.original_spec{
	color:#f60;
	padding-left: 20px;
}
.close{
	text-align: right;
	position: absolute;
	right:5px;
	top:5px;
	color: #999999;
	
}
.goodjob{
	position: absolute;
	right: 10px;
	bottom:20px !important;
}
</style>