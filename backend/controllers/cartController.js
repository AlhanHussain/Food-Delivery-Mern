import userModel from "../models/userModel.js";

// add items to user cart
 const addToCart = async (req, res) => {
 try {
     let userData = await userModel.findById({_id:req.body.userId})
     let  cartData = userData.cartData;
     if(!cartData[req.body.itemId]){
        cartData[req.body.itemId] = 1;
     }else{
        cartData[req.body.itemId] += 1;
     }
    await userModel.findByIdAndUpdate(req.body.userId, {cartData:cartData})
    res.json({success:true,message:"item added to cart"})
    
 
 } catch (error) {
    console.log(error)
    res.json({success:false,message:"something went wrong"})
 }

}


//remove item from user cart
 const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({_id:req.body.userId})
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
            await userModel.findByIdAndUpdate(req.body.userId, {cartData})
            res.json({success:true,message:"item removed from cart"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"something went wrong"
            
        })
    }
}



// get item from user cart
 const getCart = async (req, res) => {

    try {   
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        res.json({success:true,message:"cart data",cartData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"something went wrong"})
    }
}

export {addToCart, removeFromCart, getCart}