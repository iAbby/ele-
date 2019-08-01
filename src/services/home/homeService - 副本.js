import axios from 'axios'
import URL_API from '../../common/urlApi.js'

// export function getLocation(lat,lon){
// 	return new Promise((resolve,reject)=>{
// 		axios.get(`${URL_API.locationUrl}?latitude=${lat}&longitude=${lon}`)
// 		.then((response)=>{
// 			const locationName = response.data.name;
// 			resolve(locationName);
// 		})
// 	})
// }
export function getLocation(lat,lon){
	return new Promise((resolve,reject)=>{
		axios.get(`/bgs/${URL_API.weatherUrl}?latitude=${lat}&longitude=${lon}`)
		.then((response)=>{
			const locationName = response.data.name;
			resolve(locationName);
		})
	})
}

export function getWeather(lat,lon){
	return new Promise((resolve,reject)=>{
		axios.get(`/bgs/${URL_API.weatherUrl}?latitude=${lat}&longitude=${lon}`)
		.then((response)=>{
			resolve(response.data);
		})
	})
}
export function getWord(lat,lon){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL_API.hotWordUrl}?latitude=${lat}&longitude=${lon}`)
		.then((response)=>{
			let words = response.data.map(item=>{
				return item.word;
			});
			resolve(words);
		})
	})
}

export function getLocationList(keyword,lat,lon) {
	return new Promise((resolve,reject)=>{
		axios.get(`${URL_API.locationListUrl}?keyword=${keyword}&offset=0&limit=20&latitude=${lat}&longitude=${lon}`)
		.then((response)=>{
			
			let newData = response.data.map((item)=>{
				let newItem = {};
				newItem.name = item.name;
				newItem.address = item.address;
				newItem.latitude = item.latitude;
				newItem.longitude = item.longitude;
				return newItem;
			})
			resolve(newData);
		})
	})

}

export function getSwiperList(lat,lon) {
	return new Promise((resolve,reject)=>{
		axios.get(`${URL_API.swiperUrl}?latitude=${lat}&longitude=${lon}&templates[]=main_template`)
		.then((response)=>{
			let newData = response.data[0].entries.map((item)=>{
				let newItem = {};
				newItem.name = item.name;
				newItem.imageUrl = item.image_hash;
				return newItem;
			})
			let newArr = [];
			while(newData.length > 0){
				let arr = newData.splice(0, 8);
				newArr.push(arr);
			}
			resolve(newArr);
		})
	})

}


export function getSellerList(lat,lon,offset,limit) {
	return new Promise((resolve,reject)=>{
		axios.get(`${URL_API.sellerListUrl}?latitude=${lat}&longitude=${lon}&&offset=${offset}&limit=${limit}&extras[]=activities&extras[]=tags&extra_filters=home&terminal=h5`)
		.then((response)=>{
//			console.log(response.data);
			let newData = response.data.map(item=>{
				let newItem = {};
				newItem.image_path = item.image_path;
				newItem.name = item.name;
				newItem.activities = item.activities;
				newItem.rating = item.rating;
				newItem.num = item.recent_order_num;
				newItem.activities = item.activities;
				newItem.recommend = item.recommend;
				newItem.id = item.id;
				newItem.latitude = item.latitude;
				newItem.longitude = item.longitude;
				newItem.time = item.order_lead_time;
				newItem.fare = item.piecewise_agent_fee.rules;
				newItem.faredescription = item.piecewise_agent_fee.description;
				//使用变量记录item的展开状态
				newItem.isexpend = false;
				return newItem;
			})
			resolve(newData);
//			console.log(response.data[0])
		})
	})
	
}

export function getKeyword(keyword,lat,lon,offset,limit) {
	return new Promise((resolve,reject)=>{
		axios.get(`${URL_API.searchUrl}?offset=${offset}&limit=${limit}&keyword=${keyword}&latitude=${lat}&longitude=${lon}&search_item_type=3&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5`)
		.then((response)=>{

		})
	})
	
}

export function getSellerTop(lat,lon,id){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL_API.sellertopUrl}${id}?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification&terminal=h5&latitude=${lat}&longitude=${lon}`)
		.then((response)=>{

				let newItem = {
					isexpend :false,
					activities:response.data.activities,
					name : response.data.name,
					image_path : response.data.image_path,
					piecewise : response.data.piecewise_agent_fee.description,
					time : response.data.order_lead_time,
					text : response.data.delivery_mode.text,
					albums :response.data.albums,
					phone : response.data.phone,
					address : response.data.address,
					opening_hours : response.data.opening_hours,
					promotion_info : response.data.promotion_info,
					piecewise_agent_fee :response.data.piecewise_agent_fee.rules
					
				};

			resolve(newItem);
//			console.log(newItem)
		})
	})
}


export function getSellerId(id){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL_API.sellerID}?restaurant_id=${id}`)
		.then((response)=>{
			let newData = response.data.map(item=>{
				let newItem = {}; 
				newItem.name = item.name;
				newItem.icon_url = item.icon_url;
				newItem.description = item.description;
				newItem.foods = item.foods.map(food=>{
					let newFood = {};
					newFood.name = food.name;
					newFood.description = food.description;
					newFood.satisfy_rate = food.satisfy_rate;
					newFood.satisfy_count = food.satisfy_count;
					newFood.tips = food.tips;
					newFood.item_id = food.item_id;
					newFood.image_path = food.image_path;
					newFood.satisfy_rate = food.satisfy_rate;
					newFood.month_sales = food.month_sales;
					newFood.attrs = food.attrs;
					newFood.specifications = food.specifications;
					newFood.specfoods = food.specfoods.map(sale=>{
						let newSale = {};
						newSale.price = sale.price;
						newSale.id = sale.sku_id;
						newSale.original_price = sale.original_price;
						newSale.specs = sale.specs.map(spec=>{
							newSale.spec = spec.value;
							
							return newSale;
						});						
						return newSale;										
					});
					return newFood;
				});
				return newItem;
			});
//			console.log(response.data[0].foods)
//			console.log(newData)
			resolve(newData);
		})
	})
}

export function getall(id,name,offset,limit) {
	return new Promise((resolve,reject)=>{
		axios.get(`${URL_API.ratingUrl}${id}/ratings?has_content=true&tag_name=${name}&offset=${offset}&limit=${limit}`)
		.then((response)=>{
			let newData = response.data.map(item=>{
				let newItem = {};
				newItem.username = item.username;
				newItem.rated_at = item.rated_at;
				newItem.order_id = item.order_id;
				newItem.order_images = item.order_images;
				newItem.rating_text = item.rating_text;
				newItem.rating = item.rating;
				newItem.food_ratings = item.food_ratings.map(data=>{
//					let newSale = {};
					newItem.rate_name = data.rate_name;
//					return newSale;
				});
				return newItem;
			});
//			console.log(newData)
			resolve(newData);
		})
	})

}



export function getRating(id,offset,limit){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL_API.ratingUrl}${id}/ratings?has_content=true&offset=${offset}&limit=${limit}`)
		.then((response)=>{
			let newData = response.data.map(item=>{
				let newItem = {};
				newItem.username = item.username;
				newItem.rated_at = item.rated_at;
				newItem.order_id = item.order_id;
				newItem.order_images = item.order_images;
				newItem.rating_text = item.rating_text;
				newItem.rating = item.rating;

				
				return newItem;
			});
//			console.log(response.data)
			resolve(newData);
		})
	})
}



export function getselRating(id,offset,limit){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL_API.selratingUrl}${id}/ratings/scores`)
		.then((response)=>{
			
			let newItem = {

					good:(response.data.compare_rating*(100)).toFixed(1),
					time : response.data.deliver_time,
					overall : response.data.overall_score.toFixed(1),
					all : response.data.order_rating_amount,
					service : response.data.service_score.toFixed(1),
					food : response.data.food_score.toFixed(1)
			};
//			console.log(response.data)
			resolve(newItem);
		})
	})
}

//https://www.ele.me/restapi/ugc/v1/restaurant/1033417/rating_categories
//wellUrl
export function getWell(id) {
	return new Promise((resolve,reject)=>{
		axios.get(`${URL_API.wellUrl}${id}/rating_categories`)
		.then((response)=>{
			
			let newData = response.data.map((item)=>{
				let newItem = {};
				newItem.amount = item.amount;
				newItem.name = item.name;
				newItem.record_type = item.record_type;
				return newItem;
			})
//			console.log(newData)
			resolve(newData);
		})
	})

}


export function getAllWell(id,offset,limit,record_type) {
	return new Promise((resolve,reject)=>{
		axios.get(`${URL_API.wellUrl}${id}/ratings?limit=${limit}&offset=${offset}&record_type=${record_type}`)
		.then((response)=>{
			
			let newData = response.data.map((item)=>{
				let newItem = {};
				newItem.username = item.username;
				newItem.rated_at = item.rated_at;
				newItem.order_id = item.order_id;
				newItem.order_images = item.order_images;
				newItem.rating_text = item.rating_text;
				newItem.rating = item.rating;
				return newItem;
			})
//			console.log(response.data)
//			resolve(newData);
		})
	})

}