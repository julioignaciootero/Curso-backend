import express, { Request, Response, NextFunction } from "express";

import router from "../routes/index";

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use('/' , router)

export default app