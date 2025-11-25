const {Schema,model}=require('mongoose')

const AttributeSchema=new Schema({
    name:{type:String,
        required:true
    },
    values:[{
        type:String,
        required:true
    }]
})

module.exports=model("Attribute",AttributeSchema)