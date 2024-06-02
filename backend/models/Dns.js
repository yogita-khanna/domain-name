// import mongoose from "mongoose";
const mongoose = require('mongoose');

const dnsSchema = new mongoose.Schema({
    type:{
        type: String,
      
    },
    domainname:{
        type:String,
        required:false,
    },
    time:{
        type: String,
      
    }

},{timestamps:true})

module.exports = mongoose.model('DNS',dnsSchema)