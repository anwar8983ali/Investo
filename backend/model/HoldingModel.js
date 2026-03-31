const {model} =require('mongoose');

const {HoldingSchema}=require('../schemas/HoldingSchema.js');

const HoldingModel=new model('holding',HoldingSchema);

module.exports={HoldingModel};