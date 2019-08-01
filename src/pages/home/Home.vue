<template>
<div>
	<div class="page" id="home">
		<div class="wrapper">
			<!-- 下拉刷新 -->
			<div class="refresh" :class="{up: isUp}">
				<img :src="refreshImg" :class="{active:isRefreshActive}"/>
				<span>{{refreshText}}</span>
			</div>
			<header-com></header-com>
			<banner-com></banner-com>
			<activity-com></activity-com>
			<list-com @refreshContent="refreshContent"></list-com>
			<!-- 上拉加载 -->
			<div class="loadmore" :class="{down:isDown}">
				<img :src="loadmoreImg" :class="{active:isLoadmoreActive}"/>
				<span>{{loadmoreText}}</span>
			</div>
		</div>
		
	</div>
	<router-view></router-view>
</div>
</template>

<script>
import Header from '../../components/home/homePage/Header.vue'
import Banner from '../../components/home/homePage/Banner.vue'
import Activity from '../../components/home/homePage/Activity.vue'
import List from '../../components/home/homePage/List.vue'
import center from '../../common/notificationCenter.js'

let pageScroll = null;
export default {
	data(){
		return{
			refreshText:'下拉可以刷新',
			isUp: false,
			refreshImg: '/static/images/arrow_up.png',
			isRefreshActive: false,
			
			loadmoreText:'上拉加载更多',
			loadmoreImg: '/static/images/arrow_up.png',
			isDown:false,
			isLoadmoreActive: false
		}
	},
	components: {
		'header-com': Header,
		'banner-com': Banner,
		'activity-com': Activity,
		'list-com': List
	},
	methods:{
		refreshContent(){
			pageScroll.refresh();
			setTimeout(()=>{
				//计算滚动视图的真实可滚动的范围
				let realMaxScroll = document.querySelector('#home').offsetHeight - 
				                    document.querySelector('#home .wrapper').offsetHeight;
				//跟当前你的位置做比较，判断是否有空白区域
				if(pageScroll.y < realMaxScroll){
					//回到最底部
					pageScroll.scrollTo(0, realMaxScroll);
				}
			}, 100);
		}
	},
	mounted(){
		//创建滚动视图
		pageScroll = new IScroll("#home",{
			probeType: 3
		});
		pageScroll.scrollTo(0, -40);
		pageScroll.on('scrollStart', ()=>{
			pageScroll.refresh();
		});
		pageScroll.on('scroll',()=>{
			//下拉刷新\n
			if(pageScroll.y>=0){
				//达到刷新条件
				this.refreshText = '释放可以刷新';
				this.isUp = true;
				pageScroll.refresh();
				center.$emit('add');
			}
			else if(pageScroll.y<0&&pageScroll.y>=-40){
				this.refreshText = '下拉可以刷新';
				this.isUp = false;
			}
			
			
			//上拉加载更多
			if(pageScroll.y>pageScroll.maxScrollY&&pageScroll.y<pageScroll.maxScrollY+40){
				//达到刷新条件
				this.loadmoreText = '上拉可以加载更多';
				this.isDown = true;
			}
			else if(pageScroll.y<=pageScroll.maxScrollY){
				this.loadmoreText = '释放加载';
				
				this.isDown = false;
			}
		})
	
		
		pageScroll.on('scrollEnd',()=>{
			//判断停止位置，是否需要刷新
			if(pageScroll.y>=0){
				//正在刷新
				this.refreshText = '正在刷新';
				this.refreshImg = '/static/images/loadmore.jpg';
				this.isRefreshActive = true;
				
				//请求刷新数据
				setTimeout(()=>{
					//刷新完毕，需要收回刷新提醒框
					this.refreshText = '下拉可以刷新';
					this.refreshImg = '/static/images/arrow_up.png';
					this.isRefreshActive = false;
					pageScroll.scrollTo(0, -40);
				}, 1000)
			}
			else if(pageScroll.y < 0 && pageScroll.y >= -40){
				pageScroll.scrollTo(0, -40);
			}
			//判断停止的位置，是否达到了加载更多
			//判断停止的位置，是否达到了加载更多
			if(pageScroll.y <= pageScroll.maxScrollY){
				//达到了条件
				this.loadmoreText = '正在加载更多';
				this.loadmoreImg = '/static/images/loadmore.jpg';
				this.isLoadmoreActive = true;
				
				//请求更多数据

				this.$event.$emit('loadmore-list', ()=>{
//				setTimeout(()=>{	
					this.loadmoreText = '上拉可以加载更多';
					this.loadmoreImg = '/static/images/arrow_up.png';
					this.isLoadmoreActive = false;
					pageScroll.scrollTo(0, pageScroll.maxScrollY+40);
//				}, 1000)
				});
			}
			else if(pageScroll.y > pageScroll.maxScrollY && 
				pageScroll.y < pageScroll.maxScrollY+40){
					pageScroll.scrollTo(0, pageScroll.maxScrollY+40);
				}
		})
	}
}
</script>

<style scoped>
#home{

}
#home .refresh,#home .loadmore{
	height: 40px;
	line-height:40px;
	text-align: center;
	font-size: 16px;
	color: #999;
}
#home .refresh img,#home .loadmore img{
	width: 18px;
	height: 18px;
	display: inline-block;
	transition: transform 300ms;
	transform: rotate(180deg);
}
#home .refresh.up img,#home .loadmore.down img{
	transform: none;
}

@keyframes refresh_ani{
	from{transform: rotate(0);}
	to{transform: rotate(360deg);}
}
#home .refresh img.active,#home .loadmore img.active{
	animation: refresh_ani infinite 500ms linear;
}
</style>