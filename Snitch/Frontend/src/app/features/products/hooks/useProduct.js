import { createProduct, getAllProducts, getSellerProducts } from "../services/product.api"
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

    return {handleCreateProduct, handleGetSellerProducts, handleGetAllProducts}
}

export default useProduct;