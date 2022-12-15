import { Router } from "express";
import express, { Request, Response, NextFunction } from "express";
import {loginGet, loginPost, logout, visit } from "../controllers/login"
import {validateLogIn} from '../middlewares/middlewares.js'

const users = [
    {
      name: "Pepe",
      admin: true,
    },
    {
      name: "Moni",
      admin: false,
    },
  ];


const loginRouter = Router()

loginRouter.post('/login', async (req : Request, res : Response) => {
    const { name } = req.body;
    console.log("hola")
    const index = users.findIndex((user) => user.name === name);
    if (index < 0) {
      res.status(401).json({ msg: "Usuario NO autorizado" });
    } else {
      const user = users[index];
      req.session.info = {
        loggedIn: true,
        counter: 1,
        username: user.name,
        admin: user.admin,
      };

      console.log(user)
      res.status(200).json({
        msg: "Usuario encontrado",
        user
      })
    //   res.redirect("/formulario");
    }
  })

// loginRouter.post('/login', loginPost)
// loginRouter.get('/logout', logout)
// loginRouter.get('/secret-endpoint', validateLogIn, visit)


export default loginRouter