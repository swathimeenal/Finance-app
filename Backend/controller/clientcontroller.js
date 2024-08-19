import mongoose from "mongoose";
import { clientModels } from "../models/clientModel.js";


// To create a Client -POST
const createClient = async(req, res)=>{
    const{SNo,Name,OverallDebtAmount,debtDate,interestAmount,Description}= req.body;
   try
   {
    const Client = await clientModels.create({SNo,Name,OverallDebtAmount,debtDate,interestAmount,Description});
    res.status(200).json(Client);
   }
   catch(err)
   {
    res.status(400).json({error:err.message});
   }
}
// To get all Client - GET
const getClient =async(req, res)=>{
    try{
        const client = await clientModels.find({})
        res.status(200).json(client);
    }
    catch(err)
   {
    res.status(400).json({error:err.message});
   }
}
// To get a Single Client - GET
 const getSingleClient = async(req,res)=>{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:'Task Not Found'})
    }
    try{
        const singleClient = await clientModels.findById(id)
        res.status(200).json(singleClient)
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
 }
 // To Update a Client - PATCH
 const updateClient = async(req,res)=>{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({Errormessage:'Client Not Found'})
    }
    try{
        const task = await clientModels.findByIdAndUpdate({
            _id:id
        },{...req.body})
        res.status(200).json(task)
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
 }
 // Delete Client - DELETE
 const deleteClient = async(req,res)=>{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({Errormessage:'Client Not Found'})
    }
    try{
        const task = await clientModels.findByIdAndDelete(id);
        res.status(200).json(task)
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
 }


export {createClient , getClient , getSingleClient , updateClient , deleteClient }