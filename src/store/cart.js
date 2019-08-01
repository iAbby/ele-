import center from '../common/notificationCenter.js'
const state = {
	list:[],
	total:0,
	totalnum:0
}

const actions = {
	addGoods(store, params){
		
		//查找这个商家有没有商品添加到购物车
		let isExist = false;
		store.state.list.map((seller)=>{
			if(seller.sellerId == params.sellerId){
				//该商家已经有商品添加到购物车了
				isExist = true;
				
				//将商品添加到商家对应的goods字段中去
				//判断这个商品有没有添加购物车
				let isFoodExist = false;
				seller.goods.map(good=>{
					if(good.item_id == params.item_id
						&& good.specifications == params.specifications
						&& good.attr == params.attr){
						//有，那么数量叠加
						good.count += params.count;
						
						isFoodExist = true;
						center.$on('count');
						
						
					}
				})
				
				if(!isFoodExist){
					//没有，那么将商品数据push进入goods字段中去
					seller.goods.push({
						name: params.foodname,
						image: params.foodImg,
						item_id: params.item_id,
						specifications: params.specifications,
						attr: params.attr,
						count: params.count,
						price:params.price,
						fare:params.fare
					})
				}
				
			}
			
		})
		
		if(!isExist){
			//该商家从来没有商品添加到购物车
			//将这个商家的商家数据以及商品数据push到state的list中去
			//1创建商家数据
			let newSeller = {
				sellerId: params.sellerId,
				goods: []
			}
			//2将商品数据添加到goods中
			newSeller.goods.push({
				name: params.foodname,
				image: params.foodImg,
				item_id: params.item_id,
				specifications: params.specifications,
				attr: params.attr,
				count: params.count,
				price:params.price,
				fare:params.fare
			});
			
			store.state.list.push(newSeller);
		}
		var total = 0;
		var totalnum = 0;
		let cartId = store.state.list[store.state.list.length-1];
		cartId.goods.forEach((value)=>{
			total += value.count*value.price;
			totalnum +=value.count;
		})
		store.state.total = total.toFixed(2) ;
		store.state.totalnum = totalnum;
		
	},
	deleteGoods(store, params){
		let isExist = false;
		store.state.list.forEach((seller,index)=>{
			if(seller.sellerId == params.sellerId){
				//该商家已经有商品添加到购物车了
				if (true) {}				
				//将商品添加到商家对应的goods字段中去
				//判断这个商品有没有添加购物车
				let isFoodExist = false;
				seller.goods.forEach((good,idx)=>{
					if(good.item_id == params.item_id
						&& good.specifications == params.specifications
						&& good.attr == params.attr){
						if(good.count == 1){
							if (good.length == 1) {
								store.state.list.splice(index,1)
							}else{
								store.state.list[index].goods.splice(idx,1)
							}
						}else if(good.count>1){
							//有，那么数量减少
							good.count -= params.count;
							center.$on('count');
						}	
					}
				})
			}
			
		})
//		var total = 0;
//		var totalnum = 0;
//		store.state.list.forEach((item)=>{
//			item.goods.forEach((value)=>{
//				total += value.count*value.price;
//				totalnum +=value.count;
//			})
//		})
//		store.state.total = total.toFixed(2) ;
//		store.state.totalnum = totalnum;
		var total = 0;
		var totalnum = 0;
		let cartId = store.state.list[store.state.list.length-1];
		cartId.goods.forEach((value)=>{
			total += value.count*value.price;
			totalnum +=value.count;
		})
		store.state.total = total.toFixed(2) ;
		store.state.totalnum = totalnum;
	}
	
}

export default {
	namespaced:true,
	state,
	actions
}
