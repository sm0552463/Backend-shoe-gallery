import express from 'express'
import {getOrdersController,registerController,loginController, forgotPasswordController, updateProfileController, getAllOrdersController, orderStatusController} from "../controller/authController.js"
import { requireSignIn,isAdmin } from '../middleware/authMiddleware.js'

//router object
const router= express.Router()

//routing
//Register|| method : post
router.post('/register', registerController)


//login route||post
router.post('/login',loginController)


//forget password
router.post('/forgot-password',forgotPasswordController)

//protected User route auth
router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})
//protected Admin route auth
router.get("/admin-auth",requireSignIn,isAdmin, (req,res)=>{
    res.status(200).send({ok:true});
})

// update profile
router.put("/profile",requireSignIn,updateProfileController)

//orders
router.get("/orders",requireSignIn,getOrdersController)
//all orders
router.get("/all-orders",requireSignIn,isAdmin,getAllOrdersController)

// order status update
router.put(
    "/order-status/:orderId",
    requireSignIn,
    isAdmin,
    orderStatusController
  );


export default router