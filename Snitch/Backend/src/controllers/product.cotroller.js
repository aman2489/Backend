import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";


export async function createProduct(req, res) {
    const seller = req.user;
    const {title, description, priceAmount, priceCurrency} = req.body;
    const images = await Promise.all(req.files.map(async (file) => {
        return await uploadFile({
            buffer: file.buffer,
            fileName: file.originalname
        });
    }));

    // console.log(images);

    const product = await productModel.create({
        title,
        description,
        price: {
            amount: priceAmount,
            currency: priceCurrency || "INR"
        },
        images,
        seller: seller._id
    })

    return res.status(201).json({
        message: "Product created successfully!",
        product
    })
}

export async function getSellerProducts(req, res) {
    const seller = req.user;

    if(!seller) {
        return res.status(404).json({message: "Seller not found!"});
    }

    try{
        const products = await productModel.find({seller: seller._id});

        return res.status(200).json({
        message: products.length === 0 ? "No products found for this seller!" : "Products retrieved successfully!",
        products
    })
    }catch(error){
        console.log("Error fetching seller products: ",error);
        return res.status(500).json({message: "Server Error"});
    }
}

export async function getAllProducts(req, res) {
    try{
        const products = await productModel.find()

        return res.status(200).json({
            message: products.length === 0 ? "No products found!" : "Products retrieved successfully!",
            products
        })
    }catch(error){
        console.log("Error fetching all products: ",error);
        return res.status(500).json({message: "Server Error"});
    }
}