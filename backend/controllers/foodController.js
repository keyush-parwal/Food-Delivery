import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item
const addFood =async (req, res) => {
    let image_filename= `${req.file.filename}`;

    const food =new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })

    try{
        await food.save();
        res.send({success:true, message:"Food item added successfully"});
    }
    catch(err){
        console.log(err);
        res.send({success:false, message:"Error in adding food item"});
    }
};

// Display all food items
const listFood=async (req,res)=>{
    try{
        const foods=await foodModel.find({});
        res.json({success:true, data:foods});
    }
    catch(err){
        console.log(err);
        res.json({success:false, message:"Error in fetching food items"});
    }
}


// Remove food item
const removeFood=async (req,res)=>{
    try{
        const food=await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{});

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Food item removed successfully"});
    }
    catch(err){
        console.log(err);
        res.json({success:false, message:"Error in removing food item"});
    }
}

export {addFood,listFood,removeFood};