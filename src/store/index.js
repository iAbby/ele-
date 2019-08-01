import Vue from 'vue'
import Vuex from 'vuex'
import center from '../common/notificationCenter.js'
Vue.use(Vuex);

import cartModule from './cart.js'

const state = {
	longitude:null,
	latitude:null
}
const mutations={
	initLocation(state,params){
		state.longitude = params.lon;
		state.latitude = params.lat;
	}
}
const actions={
	getLocaltion(store){
		setTimeout(()=>{
			let lon = 113.972976;
			let lat = 22.534607;
			
			store.commit('initLocation',{
				lon,
				lat
			});
			center.$emit('init-data');
			
		},200)
		
	},
	//app修改地址
	changeLocation(store, params){
		store.commit('initLocation', params);
		//通知组件去根据经纬度重新请求数据
		center.$emit('init-data');
	}
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
	modules: {
		cart: cartModule
	}
})
