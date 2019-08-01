export default {
	/*
	 获得地址
	 参数：
	 	latitude   纬度
	 	longitude  经度
	  */
	// locationUrl: '/bgs/poi/reverse_geo_coding',
	locationUrl: '/poi/reverse_geo_coding',
	
	/*
	 获得天气
	 参数：
	 	latitude   纬度
	 	longitude  经度
	  */
	// weatherUrl: '/bgs/weather/current',
	weatherUrl: '/weather/current',
	
	/*
	 获得热门搜索词汇
	 参数：
	 	latitude   纬度
	 	longitude  经度
	  */
	hotWordUrl: '/v3/hot_search_words',
	// hotWordUrl: '/shopping/v3/hot_search_words',
	
	/*
	搜索地址获得数据
	 参数：
	    keyword	         关键字
	 	latitude   纬度
	 	longitude  经度
	 	offset=0&limit=20
	 */
	locationListUrl:'/poi/search_poi_nearby',
	// locationListUrl:'/bgs/poi/search_poi_nearby',
	
	/*
	 * 轮播图数据
	 *  参数：
	    keyword	         关键字
	 	latitude   纬度
	 	longitude  经度
	 	&templates[]=main_template
	 https://restapi.ele.me
	 /shopping/v2/entries
	 * */
	swiperUrl:'/v2/entries',
	// swiperUrl:'/shopping/v2/entries',

	/*
	 商家列表：
	 参数：
	 	latitude   纬度
	 	longitude  经度
	 	offset=0&limit=20
	 	&extras[]=activities&extras[]=tags&extra_filters=home&terminal=h5
	 * */
	sellerListUrl:'/restaurants',
	// sellerListUrl:'/shopping/restaurants',
//	https://restapi.ele.me/shopping/v2/restaurants/search
//	?offset=0&limit=20&keyword=%E5%86%92%E8%8F%9C&latitude=22.54286
//	&longitude=114.059563&search_item_type=3&is_rewrite=1
//	&extras[]=activities&extras[]=coupon&terminal=h5

	searchUrl:'/v2/restaurants/search',
	/*
	 商家详情头部：
	 参数：
	 	latitude   纬度
	 	longitude  经度
	 	
	 * */
	// sellertopUrl:'/shopping/restaurant/',
	sellertopUrl:'/restaurant/',
	
	/*
	 商家详情侧边：
	 参数：
	 	restaurant_id 卖家id
	 	
	 * */
	sellerID:'/v2/menu',
	// sellerID:'/shopping/v2/menu',
	
	
	/*
	 商家评价：
	 参数：
	 	has_content=true
		offset=0
		limit=10
	 	
	 * */
	ratingUrl:'/v3/restaurants/',
	// ratingUrl:'/ugc/v3/restaurants/',
	
	/*
	 商家详情评价：
	 参数：
	 	id
		offset=0
		limit=10
		record_type=2
	 	
	 * */
	selratingUrl:'/v2/restaurants/',
//	selratingUrl:'/ugc/v2/restaurants/',
	
	
	/*
	 商家详情评价：
	 参数：
	 	id
	 	
	 * */
	wellUrl:'/v1/restaurant/'
	// wellUrl:'/ugc/v1/restaurant/'
	
}
