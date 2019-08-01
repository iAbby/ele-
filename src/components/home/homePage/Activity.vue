<template>
<div class="activity">
	<div class="redbag">
		<img src="https://fuss10.elemecdn.com/3/c8/45b2ec2855ed55d90c45bf9b07abbpng.png?imageMogr/format/webp/thumbnail/!710x178r/gravity/Center/crop/710x178/"/>
	</div>
	<section>
		<div class="hot_buy">
			<div class="hot_buy_left">
				<h3 style="color: #e81919;margin-bottom:5px">限量抢购</h3>
				<p style="color: #777;font-size: 14px;margin-bottom:5px">超值美味 9.9元起</p>
				<p style="color: #333;font-size: 14px;"><span style="color: #e81919;margin-bottom:5px">500人</span>正在抢 &gt;</p>
				<img src="//fuss10.elemecdn.com/b/e1/0fa0ed514c093a7138b0b9a50d61fpng.png?imageMogr/format/webp/thumbnail/!240x160r/gravity/Center/crop/240x160/">
			</div>
			<div class="hot_buy_right">
				<h3 style="color: #333;margin-bottom:5px">热卖套餐</h3>
				<p style="color: #777;font-size: 14px;margin-bottom:5px">销量最高，好评最多</p>
				<p style="color: #af8260;font-size:14px;font-weight: 600;"><span style="margin-bottom:5px">TOP 100 </span> &gt;</p>
				<img src="//fuss10.elemecdn.com/d/d4/16ff085900d62b8d60fa7e9c6b65dpng.png?imageMogr/format/webp/thumbnail/!240x160r/gravity/Center/crop/240x160/">
			</div>
		</div>
		<div class="clear"></div>
		<div class="day_price">
			<div class="special">
				<h3>天天特价</h3>
				<span style="color: #ff5339;border: 1px solid #ffa89b">低至1折</span>
				<img src="//fuss10.elemecdn.com/5/06/ddb537220b8c56d4ef6ae22718984png.png?imageMogr/format/webp/thumbnail/!232x154r/gravity/Center/crop/232x154/">
			</div>
			<div class="special">
				<h3 style="color: #333;">乐享鲜果</h3>
				<span style="color:#777;border: 1px solid #bbb;">鲜果乐享7折</span>
				<img src="//fuss10.elemecdn.com/a/98/8010e87e876a7bf137597bf7fd324png.png?imageMogr/format/webp/thumbnail/!232x154r/gravity/Center/crop/232x154/">
			</div>
			<div class="special">
				<h3 style="color: #333;">品质优选</h3>
				<span style="color:#777;border: 1px solid #bbb;">尖货来袭</span>
				<img src="//fuss10.elemecdn.com/a/b5/dcb5bff74242e06b3c2efee1cbffcpng.png?imageMogr/format/webp/thumbnail/!232x154r/gravity/Center/crop/232x154/">

			</div>
		</div>
	</section>
	
</div>
</template>

<script>
</script>

<style scoped>
.activity{
	width: 100%;
	height: 400px;
	border-bottom:8px solid #f5f5f5;
	background:white;
	/*margin-bottom:20px;*/
}
.activity .redbag,.activity section{
	width:90%;
	margin: 0 auto;
	
}
.activity section .hot_buy_left img,.activity section .hot_buy_right img{
	position: absolute;
    right: 0;
    width: 100px;
}
.activity section .hot_buy_left{
	width: 40%;
	position: relative;
	padding: 10px 15px;
	display: inline-block;
	height:150px;
	background: #f5f5f5;
	float: left;
}   
.activity section .hot_buy_right{
	width: 40%;
	position: relative;
	padding: 10px 15px;
	height:150px;
	background: #f5f5f5;
	float: right;
}  
.activity .hot_buy{
	overflow: hidden;
	margin: 0 auto;
}
.clear{
	clear: both;
}
.activity .redbag img{
	width:100%;
}
.activity section .day_price{
	width:100%;
	margin: 0 auto;
	overflow: hidden;
	margin-top: 10px;
}
.activity section .day_price .special{
	width:32%;
	background: #f5f5f5;
	float: left;
	margin-right:5px;
	text-align: center;
	
}
.activity section .day_price .special h3{
	margin-bottom: 5px;
}
.activity section .day_price .special img{
	width:100%;
}
.activity section .day_price .special:nth-child(3){
	margin-right:0px;
}
.border_btm{
	height: 20px;
	width: 100%;
	background:#f5f5f5;
}
</style>