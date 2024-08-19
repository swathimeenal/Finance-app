import express from "express";
import {createClient,getClient,getSingleClient,updateClient,deleteClient} from "../controller/clientcontroller.js"

const router = express.Router();

router.post("/client",createClient);
router.get("/client",getClient);
router.get("/client/:id",getSingleClient);
router.patch("/client/:id",updateClient);
router.delete("/client/:id",deleteClient);


export {router}

