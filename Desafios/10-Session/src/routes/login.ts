import { Router } from "express";
import express, { Request, Response, NextFunction } from "express";
import { validateLogIn } from '../middlewares/middlewares'

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
        msg: "Usuario ok",
        user
      })

    }
  })


loginRouter.get('/logout', async (req : Request, res : Response) => {

  console.log("Prueba" , req.session)
  const name = req.session.info?.username;
  console.log(name);
  if (name) {

    // req.session.destroy((err) => {
    //   console.log(err)
    // })

    req.session.destroy((err) => {
      if (!err) {

        res.status(200).json({
          msg: "Usuario Deslogueado",
          user : name
        })
      } else {

          console.log(err)
          res.status(500).json({ msg: "Error" });

      }
    });
  }

})

loginRouter.get("/info", async (req : Request, res : Response)=> {
  

    const name = req.session.info?.username;
    if (name) {
      res.status(200).json({
        msg: "Informacion de session",
        info : req.session
      })
    } else {
      res.status(200).json({
        msg: "No hay sesiones activas",
        user : name
      })
    }


})

loginRouter.get('/secret-endpoint', validateLogIn, async (req : Request, res : Response)=> {

  console.log(req.session, req.session.info?.counter)
  if (req.session.info?.counter != undefined) {
    req.session.info.counter ++
    res.json({
      msg: `${req.session.info?.username} ha visitado el sitio ${req.session.info.counter} veces`,
  
    });
  } else {
    res.status(500).json({
      msg: "Error",
    })
  }



})




export default loginRouter