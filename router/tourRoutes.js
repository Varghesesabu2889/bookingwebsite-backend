import express from 'express'
import { createTour, deleteTour, getAllTour, getSingleTour, getTourBySearch, getTourCount, updateTour } from '../controllers/tourController.js'
import { verifyAdmin} from '../utlity/verifyToken.js'
const router =  express.Router()

//create a new tour
router.post('/',verifyAdmin,createTour)



//update  tour
router.put('/:id',verifyAdmin,updateTour)


//delete  tour
router.delete('/:id',verifyAdmin,deleteTour)


// get single tour
router.get('/:id',getSingleTour)

//getAll tour
router.get('/',getAllTour)

//get tour by search
router.get('/search/getTourBySearch', getTourBySearch)
//get count of tour
router.get('/search/getTourCount',getTourCount)








export default router