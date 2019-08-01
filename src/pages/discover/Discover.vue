<template>
<div class="page" id="discover">
	
	发现
	<button @click="btnAction()">拍照</button>
</div>
</template>

<script>
	export default{
		methods:{
			btnAction(){
				alert('拍照');
				let c = plus.camera.getCamera(1);
				c.captureImage();
			}
		}
	}
</script>

<style>
#discover{
	background: papayawhip;
}
</style>