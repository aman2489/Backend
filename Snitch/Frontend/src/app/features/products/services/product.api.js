import axios from "axios";

const api = axios.create({
    baseURL: "/api/products",
    withCredentials: true
})

export async function createProduct(formData) {
    const response = await api.post("/", formData);
    return response.data;
}

export async function getSellerProducts() {
    const response = await api.get("/seller");
    return response.data;
}

export async function getAllProducts() {
    try{
        const response = await api.get("/");
        return response.data;
    }catch(error){
        throw error?.response?.data?.message || "Error fetching products!";
    }
}

export async function getProductDetails(productId){
    try{
        const response = await api.get(`/details/${productId}`);
        return response.data;
    }catch(error){
        throw error?.response?.data?.message || "Error fetching product details!";
    }
}

// -----------------------------------------------------
// Placeholder Endpoints for Variants
// -----------------------------------------------------

export async function createVariant(productId, newProductVariant) {

    console.log(newProductVariant);
    try {
        const formData = new FormData();
        
        console.log(newProductVariant.images);
        newProductVariant.images.forEach((image) => {
            formData.append(`images`, image.file)
        })
        formData.append("stock", newProductVariant.stock);
        if(newProductVariant.price){
            formData.append("priceAmount", newProductVariant.price.amount);
        }
        formData.append("attributes", JSON.stringify(newProductVariant.attributes));

        const response = await api.post(`/${productId}/variants`, formData);
        return response.data;
    } catch(error) {
        throw error?.response?.data?.message || "Error creating variant!";
    }
}

export async function updateVariant(variantId, formData) {
    try {
        const response = await api.put(`/variants/${variantId}`, formData);
        return response.data;
    } catch (error) {
        throw error?.response?.data?.message || "Error updating variant!";
    }
}

export async function deleteVariant(variantId) {
    try {
        const response = await api.delete(`/variants/${variantId}`);
        return response.data;
    } catch(error) {
        throw error?.response?.data?.message || "Error deleting variant!";
    }
}