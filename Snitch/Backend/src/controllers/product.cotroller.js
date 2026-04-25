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

export async function getProductDetails(req, res) {
    const { productId } = req.params;

    try{
        const product = await productModel.findById(productId);
        
        if(!product) {
            return res.status(404).json({message: "Product not found!"});
        }

        return res.status(200).json({
            message: "Product details retrieved successfully!",
            product
        })
    }catch(error){
        console.log("Error fetching product details: ",error);
        return res.status(500).json({message:"Server Error"});
    }
}

export async function addProductVariant(req, res) {
        const productId = req.params.productId;

        const product = await productModel.findOne({
            _id: productId,
            seller: req.user._id 
        });

        if(!productId) {
            res.status(404).json({
                message: "product not found!",
            })
        }


        const files = req.files;
        console.log(files);
        const images = [];
        if(files || files.length !== 0){
            (await Promise.all(files.map(async (file) => {
                const image = await uploadFile({
                    buffer: file.buffer,
                    fileName: file.originalname
                })
                return image
            }))).map(image => images.push(image));
        }

        const price = req.body.priceAmount;
        const stock = req.body.stock;

        const attributes = JSON.parse(req.body.attributes || "{}")

        // console.log(product, images, attributes, price, stock)
        console.log(price);
        console.log(req.body.priceCurrency)

        product.variants.push({
            images,
            price: {
                amount: price || product.price.amount,
                currency: req.body.priceCurrency || product.price.currency
            },
            stock,
            attributes
        })

        await product.save();

        res.status(200).json({
            message: "Variant added successfully.",
            product
        })
}