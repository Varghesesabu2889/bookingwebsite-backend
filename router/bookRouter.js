import express from "express"
const router = express.Router();
import {verifyAdmin, verifyUser} from '../utlity/verifyToken.js'
import {createBooking, getAllBooking, getBooking} from '../controllers/bookingController.js'
router.post("/",verifyUser,createBooking)
router.get("/:id",verifyUser,getBooking)
router.get("/",verifyAdmin,getAllBooking)

export default router;