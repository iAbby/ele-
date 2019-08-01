<template>
	<div id="search" class="page subpage">
		<div class="search">
			<span class="arrow" @click="back">&lt;</span>
			<input type="text" placeholder="输入商家、商品名称" class="search_in" v-model="inVal"/>
			<span class="search_btn" @click="search()">搜索</span>
		</div>
		<div class="hot_search">
			<h3>热门搜索</h3>
			<ul>
				<a v-for="(item,index) in wordArr" class="foods_word" @click="key(index)">{{item}}</a>
			</ul>
			
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex'
import Vue from 'vue'
import {getWord} from '../../services/home/homeService.js'

export default{
	data(){
		return{
			wordArr:[],
			inVal:''
		}	
	},
	computed: mapState(['latitude','longitude']),
	methods:{
		getData(){
			getWord(this.latitude,this.longitude)
			.then(result=>{
				this.wordArr = result;
			});	
		},
		back(){
			this.$router.push('/home');
		},
		key(index){
			this.inVal=this.wordArr[index];
			this.$router.push('/home/search/'+this.inVal);
		},
		search(){
			this.$router.push('/home/search');
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
//location.reload()
</script>

<style>
	#search{
		background: lemonchiffon;
	}
	#search .search,#search .hot_search{
		margin:10px auto;
		width: 90%;
		line-height:40px;
		overflow: hidden;
	}
	
	#search .search .arrow{
		font-size:30px;
		color: #666666;
		float: left;
		width: 10%;
	}
	#search .search .search_in{
		margin-top: 2px;
		height:36px;
		float: left;
		width:70%;
		border: 0;
		background: #f8f8f8;
		text-align: center;
	}
	#search .search .search_btn{
		float: right;
		text-align: right;
	}
	#search .hot_search .foods_word{
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