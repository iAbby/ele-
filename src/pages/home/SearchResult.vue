<template>
	<div id="search_result" class="page subpage">
		<div class="search">
			<span class="arrow" @click="back">&lt;</span>
			<input type="text" placeholder="输入商家、商品名称" class="search_in" v-model="keyword"/>
			<span class="search_btn" @click="search()">搜索</span>
		</div>
		<div class="hot_search">
			<ul>
				<a v-for="(item,index) in wordArr" class="foods_word" @click="key(index)">{{item}}</a>
			</ul>
			
		</div>
	</div>
</template>

<script>
	
import {mapState} from 'vuex'
import Vue from 'vue'
import {getKeyword,getWord} from '../../services/home/homeService.js'

export default{
	data(){
		return{
			wordArr:[],
			keyword:'',
			offset:0,
			limit:20
		}	
	},
	computed: mapState(['latitude','longitude']),
	methods:{
		getData(){
			this.keyword = this.$route.params.keyword;
			getWord(this.latitude,this.longitude)
			.then(result=>{
			});	
			getKeyword(this.keyword,this.latitude,this.longitude,this.offset,this.limit)
			.then(result=>{
//				this.wordArr = result;
				console.log(result)
			});	
		},
		back(){
			this.$router.push('/home');
		},
		key(){

		},
		search(){
		},
		
		
	},
	created(){
//		this.$event.$on('init-data',()=>{
			this.getData();
//		});
	},
	mounted(){
		
	}
}
	
</script>

<style>
#search_result{
	z-index: 100;
	background: palegoldenrod;
}

#search_result .search,#search .hot_search{
	margin:10px auto;
	width: 90%;
	line-height:40px;
	overflow: hidden;
}

#search_result .search .arrow{
	font-size:30px;
	color: #666666;
	float: left;
	width: 10%;
}
#search_result .search .search_in{
	margin-top: 2px;
	height:36px;
	float: left;
	width:70%;
	border: 0;
	background: #f8f8f8;
	text-align: center;
}
#search_result .search .search_btn{
	float: right;
	text-align: right;
}
#search_result .hot_search .foods_word{
	padding:0 13px;
	margin-right:10px;
	display: inline-block;
    border-radius:5px;
    font-size:14px;
    margin-top:10px;
    color: #666;
    background-color: #f7f7f7;
}
</style>