import api from "../api/axios";


// ADD TO WISHLIST

export const addToWishlist = async(productId)=>{

    const res = await api.post(
        "/wishlist",
        {
            productId
        }
    );

    return res.data;

};



// GET WISHLIST

export const getWishlist = async()=>{

    const res = await api.get(
        "/wishlist"
    );

    return res.data.data;

};




// REMOVE WISHLIST

export const removeWishlist = async(productId)=>{

    const res = await api.delete(
        `/wishlist/${productId}`
    );

    return res.data;

};