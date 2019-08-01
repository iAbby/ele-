<template>
	<!--<div class="food_mask" v-if="menu.specfoods.length>1">-->
									<!--规格弹框-->
	<div class="bug page">
		<!--<div class="food_mask">
			
		</div>-->
		<!--<div class="food_mask" v-if="specs_text&&listIndex==index&&menu.specfoods.length>1">
			<p style="text-align: center;padding-bottom: 10px;">{{menu.name}}</p>
			<span v-for='(specs_list,index) in menu.specfoods' class="spec" 
				:class="{blue:specsIndex==index}"
				@click="choose_spec(index)">
				{{specs_list.spec}}
				
			</span>
			<br />
			<br />
			<span v-for='(specs_list,index) in menu.specfoods'>
				<span v-if="specsIndex==index" class="original_spec">
					{{specs_list.price}}
				</span>
				<div class="add_text add" @click="spec_cook(specsIndex,specs_list.id)">
					选好了
				</div>
			</span>
		</div>-->
	</div>
</template>

<script>
import {getSellerId} from '../../../services/home/homeService.js'
export default{
	data(){
		return{
			list:[],
		 	specs_text:false,
		}
		
	},
	getData(){
		let id = this.$route.params.id;
		getSellerId(id).then(result=>{
			this.list = result;
			console.log(result[0].foods)
		});
		
	},
}
</script>

<style>
	.food_mask{
	width:80%;
	height:30%;
    display: block;
    position:fixed;
    overflow: hidden;
    background-color:lemonchiffon;
    padding-top: 20px;
    opacity: 1;
    z-index: 100;
    left:36px;
    top:30%;
}
</style>