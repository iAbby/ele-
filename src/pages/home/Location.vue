<template>
	<div id="location" class="page subpage">
		<div class="content">
			<input type="search" placeholder="请输入地址" v-model="inputVal"/>
			<div class="result_list_cro">
				<ul class="result_list">
					<li v-for="item in result" class="bottom-px" @click="changeLocation(item)">
						<h3>{{item.name}}</h3>
						<p>{{item.address}}</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex'

import {getLocationList} from '../../services/home/homeService.js'
let timer = null;

export default{
	data(){
		return{
			inputVal:'',
			result:[]
		}
	},
	computed:mapState(['longitude','latitude']),
	methods:{
		requestData(){
			getLocationList(this.inputVal,this.latitude,this.longitude)
			.then(result=>{
				this.result = result;
			});
		},
		changeLocation(item){
			//将数据告诉store
			this.$store.dispatch(
				'changeLocation',
				{
					lat: item.latitude,
					lon: item.longitude
				}
			);
			
			//返回上一页
			this.$router.back();
		}
		
	},
	created(){
		this.$watch('inputVal', (newVal)=>{
			//当用户在1秒之内没有输入内容之后再发送请求
			clearTimeout(timer);
			timer = setTimeout(()=>{
//				console.log('发送请求出去');
				this.requestData();
			}, 1000);
		})
	},
	mounted(){
		let ListScroll = new IScroll(".result_list_cro");
		ListScroll.on('scrollStart',()=>{
			ListScroll.refresh();
		});
	}
}
</script>

<style>
#location{
	background:papayawhip;
}
#location .content{
	margin: 20px auto;
	padding: 0 20px;
}
.result_list li{
	margin-top:5px;
	line-height:30px;
}
.result_list_cro{
	position: absolute;
	width:90%;
	top:50px;
	bottom:30px;
	overflow: hidden;
}
</style>