const {Schema,model}=require("mongoose")

const VariationSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    attributes:[{
        type:Schema.Types.ObjectId,
        required:true
    }],
    status:{
        type:Boolean,
        required:true
    },
    price:{
        type:String,
        required:true
    }
})


module.exports=model("Variation",VariationSchema)