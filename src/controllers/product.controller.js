const Product=require("../models/product.model")
const Variation=require("../models/variation.model")
const CreateProduct=async(req,res)=>{
    try {
        const {name,categories,status,descriptions,variations,attributes}=req.body

        if(!name)
        {
            return res.status(200).json({
                status:false,
                message:"product name is required"
            })
        }
        
    } catch (error) {
        
    }
}