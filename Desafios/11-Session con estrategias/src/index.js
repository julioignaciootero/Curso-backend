import express from 'express'
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import { initDB  } from './db/db.js';
dotenv.config();
import miRouter from './routes/index.js'
import { loginFunction, signUpFunction } from './services/auth.js';

const app = express()
app.use(express.json())

await initDB()

const ttlSeconds = 180

const StoreOptions = {
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        dbName: process.env.DB

    }),
    secret: 'mysecret',
    resave: false,
    saveUninitialized : false,
    cookie: {
        maxAge : ttlSeconds * 1000
    }

}

// MONGO_URL = mongodb+srv://julioignaciootero:luna0182@cluster0.4ysv2.mongodb.net/?retryWrites=true&w=majority
// DB = CODERHOUSE

app.use(session(StoreOptions))
app.use(passport.initialize())
app.use(passport.session())

// passport.use('login', loginFunction)
passport.use('signup', signUpFunction)

app.use('/api', miRouter)

app.listen('8080', () => {

    console.log("Servidor corriendo");
    

})