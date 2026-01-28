import express from 'express';
import authMiddleware  from '../middlewares/authMiddlewares.js.js';
import createComplain from '../controllers/complainController.js.js'
const complainrouter=express.Router();

complainrouter.post('/compain_page',authMiddleware,createComplain);

export default complainrouter;

