<template>
	<div id="root">
		
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		<nav class="tabs top-px">
			<router-link class="tab" v-for="item in tabsData" :to="item.path">
				<span class="icon iconfont" :class="item.icon"></span>
				<span class="text">{{item.title}}</span>
			</router-link>
		</nav>
		
	</div>
</template>

<script>
export default{
	data(){
		return {
			tabsData: [
				{title: '外卖', icon: 'icon-eleme', path: '/home'},
				{title: '发现', icon: 'icon-discover', path: '/discover'},
				{title: '订单', icon: 'icon-order', path: '/order'},
				{title: '我的', icon: 'icon-me', path: '/me'}
			]
		}
	},
	created(){
		this.$store.dispatch('getLocaltion')
	}
}
</script>

<style>
.tabs{
	display: flex;
	width: 100%;
	height: 49px;
	position: absolute;
	left: 0;
	bottom: 0;
}
.tabs .tab{
	flex: 1;
}
.tabs .tab span{
	display: block;
	color: #666;
}
.tabs .tab.router-link-active span{
	color: #0089dc;
}
.tabs .tab .icon{
	width: 100%;
	height: 30px;
	font-size: 20px;
	text-align: center;
	line-height: 32px;
}
.tabs .tab .text{
	width: 100%;
	height: 19px;
	text-align: center;
	line-height: 17px;
	font-size: 12px;
}
.page{
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 49px;
	overflow: hidden;
}
.subpage{
	bottom:0;
    z-index: 11;
}
</style>