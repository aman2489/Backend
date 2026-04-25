import { createProduct, getAllProducts, getProductDetails, getSellerProducts, createVariant, updateVariant, deleteVariant } from "../services/product.api"
import { useDispatch } from "react-redux";
import { setSellerProducts, setProducts } from "../state/product.slice";
import { setError } from "../../auth/state/auth.slice";


const useProduct = () => {

    const dispatch = useDispatch();
    async function handleCreateProduct(formData){
        const data = await createProduct(formData);
        return data.product
    }

    async function handleGetSellerProducts() {
        const data = await getSellerProducts();
        dispatch(setSellerProducts(data.products))
        return data.products
    }

    async function handleGetAllProducts() {
        try{
            const data = await getAllProducts();
            dispatch(setProducts(data.products))
            return data.products;
        }catch(error){
            dispatch(setError(error))
            throw error;
        }
    }

    async function handleGetProductDetails(productId){
        try{
            const data = await getProductDetails(productId);
            return data.product;
        }catch(error){
            dispatch(setError(error));
            throw error;
        }
    }

    // Variants Handling
    async function handleCreateVariant(productId, newProductVariant) {
        try {
            const data = await createVariant(productId, newProductVariant);
            return data; 
        } catch (error) {
            dispatch(setError(error));
            throw error;
        }
    }

    async function handleUpdateVariant(variantId, formData) {
        try {
            const data = await updateVariant(variantId, formData);
            return data.variant;
        } catch(error) {
            dispatch(setError(error));
            throw error;
        }
    }

    async function handleDeleteVariant(variantId) {
        try {
            const data = await deleteVariant(variantId);
            return data;
        } catch(error) {
            dispatch(setError(error));
            throw error;
        }
    }

    return {
            handleCreateProduct,
            handleGetSellerProducts,
            handleGetAllProducts,
            handleGetProductDetails,
            handleCreateVariant,
            handleUpdateVariant,
            handleDeleteVariant
        }
}

export default useProduct;