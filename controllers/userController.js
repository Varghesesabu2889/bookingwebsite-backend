import User from '../models/user.js';



// Update User
export const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedUser 
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update",
            error: err.message 
        });
    }
};

// Delete User
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id);
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

// Get single User
export const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        res.status(200).json({
            success: true,
            message: "Successfully found user",
            data: user
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: err.message 
        });
    }
};

// Get all users
export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({
            success: true,
            message: "Successfully retrieved all users",
            data: users
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "Failed to get users",
            error: err.message 
        });
    }
};
