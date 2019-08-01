import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import Home from '../pages/home/Home.vue'
import Location from '../pages/home/Location.vue'
import Search from '../pages/home/Search.vue'
import SearchResult from '../pages/home/SearchResult.vue'
import SellerDetail from '../pages/home/SellerDetail.vue'

import Discover from '../pages/discover/Discover.vue'
import Order from '../pages/order/Order.vue'
import Me from '../pages/me/Me.vue'
import Cart from '../pages/Cart/Cart.vue'



export default new VueRouter({
	routes: [
		{
			path: '/home',
			component: Home,
			children:[
				{
					path: 'location',
					component: Location
				},
				{
					path: 'search',
					component: Search
				},
				{
					path: 'search/:keyword',
					name:'keyword',
					component: SearchResult
				},
				{
					path: 'seller-detail/:id',
					component: SellerDetail
				}
			]
		},
		{
			path: '/discover',
			component: Discover
		},
		{
			path: '/order',
			component: Order
		},
		{
			path: '/me',
			component: Me
		},
		{
			path: '/cart',
			component: Cart
		},
		{
			path: '*',
			redirect: '/home'
		}
	]
});


