const {Schema,model}=require("mongoose")

const VariationSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    attributes:[{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"attribute"
    }],
    status:{
        type:Boolean,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})


module.exports=model("Variation",VariationSchema)