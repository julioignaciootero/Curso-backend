import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import router from "../routes/index";
import { config } from "../config/cfg";
import session from "express-session";
import MongoStore from "connect-mongo";

const ttlSeconds = 300;

const mongoUrl: string = config.URI;

const StoreOptions = {
    secret: config.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: ttlSeconds * 1000,
    },
  store: MongoStore.create({
    mongoUrl: mongoUrl,
    dbName:config.DB,
    crypto: {
      secret: config.CRYPTO_SECRET,
    },
  }),
 
};


// console.log(StoreOptions)
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());
app.use(session(StoreOptions));
// app.use(express.static(publicPath));

app.use('/' , router)

export default app