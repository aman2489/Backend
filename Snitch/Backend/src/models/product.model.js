import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    stock: {type: Number, default: 0},
    attributes: {type: Map, of: String},
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    images:[
        {
            url: {
                type: String,
                required: true
            }
        }
    ],
    price: {
        amount:{type: Number, required: true},
        currency: {
            type: String,
            values: ["USD", "EUR", "GBP", "JPY", "INR"],
            default: "INR"
        }
    },
    variants: [
        {
            images: [
                {
                    url: {
                        type: String,
                        required: true
                    }
                }
            ],
            stock: {
                type:Number,
                default: 0
            },
            attributes: {
                type: Map,
                of: String
            },
            price: {
                amount:{type: Number, required: true},
                currency: {
                    type: String,
                    enum: ["USD", "EUR", "GBP", "JPY", "INR"],
                    default: "INR"
                }
            }
        }
    ]

}, {timestamps: true})

const productModel = mongoose.model("product", productSchema);

export default productModel;