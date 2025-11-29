const Product=require("../models/product.model")
const Variation=require("../models/variation.model")
const CreateProduct=async(req,res)=>{
    try {
        const {name,categories,status,description,variations,attributes}=req.body

        if(!name)
        {
            return res.status(200).json({
                status:false,
                message:"product name is required"
            })
        }
        if(!variations || variations.length<0 )
        {
                        return res.status(200).json({
                status:false,
                message:"at least on variation is required"
            })
        }

        const variation=Variation.insertMany(variations,{})
        const product=new Product({
            name,
            categories,
            description,
        })

        
    } catch (error) {
        
    }
}