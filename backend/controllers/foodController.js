import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item
const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category,
    });
    try{
        await food.save();
        res.json({success: true, message: "Food Added Successfully"});
    }catch(error){
        console.log(error);
        res.json({success: false, message: "Server Error"});
    }
};

// all food list
const listFood = async (req,res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success: true, data: foods});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Server Error"});
    }
};

// remove food item

const removeFood = async (req, res) => {
    try {
        // Check foodId field instead of id
        const food = await foodModel.findById(req.body.foodId);
        
        // Check if the food exists
        if (!food) {
            return res.json({success: false, message: "Food not found"});
        }

        // Proceed to delete image and the food item
        fs.unlinkSync(`uploads/${food.image}`);
        await foodModel.findByIdAndDelete(req.body.foodId);

        res.json({success: true, message: "Food removed successfully"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Server Error"});
    }
}

export {addFood, listFood, removeFood};