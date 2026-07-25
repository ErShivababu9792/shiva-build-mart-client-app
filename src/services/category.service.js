import api from "../api/axios";


// Get Categories

export const getCategories = async()=>{

    const res = await api.get("/categories");

    return res.data.data;

};



// Add Category

export const createCategory = async(data)=>{

    const res = await api.post(
        "/categories",
        data
    );

    return res.data.data;

};