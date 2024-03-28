
import Tour from '../models/Tour.js'


// Create a new tour
export const createTour = async (req, res) => {
    const newTour = new Tour(req.body);
    try {
        const savedTour = await newTour.save();
        res.status(200).json({
            success: true,
            message: "Successfully created",
            data: savedTour
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create. Try again",
            error: err.message 
        });
    }
};

// Update tour
export const updateTour = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedTour = await Tour.findByIdAndUpdate(id,
             { $set: req.body }, { new: true });
        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedTour 
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update",
            error: err.message 
        });
    }
};

// Delete tour
export const deleteTour = async (req, res) => {
    const id = req.params.id;
    try {
        await Tour.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Successfully deleted"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete",
            error: err.message 
        });
    }
};

// Get single tour
export const getSingleTour = async (req, res) => {
    const id = req.params.id;
    try {
        const tour = await Tour.findById(id);
        res.status(200).json({
            success: true,
            message:"Successfully ",
            data: tour
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "Failed to get tour",
            error: err.message 
        });
    }
};

// Get all tours
export const getAllTour = async (req, res) => {
//get pagination
        const page  = parseInt(req.query.page);
       
        try{
        const tours = await Tour.find({})
        .skip(page * 8)
        .limit(8);
        res.status(200).json({
            success:true,
            count:tours.length,
            message:"Successful",  
            data:tours        
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "Failed to get tours",
            error: err.message 
        });
    }
};

// get tour by search
export const getTourBySearch = async(req,res)=>{
    //i shows case sensitive
    const city = new RegExp(req.query.city,'i') 
    const distance = parseInt(req.query.distance)
    const maxGroupSize = parseInt(req.query.maxGroupSize)
try {

    const tours = await Tour.find({city,distance:{$gte:distance},
    maxGroupSize:{$gte:maxGroupSize} })
    res.status(200).json({
        success:true,
        message:"Successful",  
        data:tours   
    });
    
} catch (err) {
    res.status(404).json({
        success: false,
        message: "Failed to get tours",
        error: err.message 
    });
}
}

//get tour counts
export const getTourCount = async(req,res)=>{
    try {
       const tourCount = await Tour.estimatedDocumentCount() 
       res.status(200).json({success:true,data:tourCount})
    } catch (err) {
 res.status(500).json({success:false,message:"Server Error",error:err});
  
    }
}