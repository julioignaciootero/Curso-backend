import express, { Request, Response, NextFunction } from "express";

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


  export const loginPost = (req : Request, res : Response) => {
    const { name } = req.body;
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
    //   res.redirect("/formulario");
    }
  };
  
  export const loginGet = (req : Request, res : Response) => {
    const name = req.session.info?.username;
    if (name) {
    //   return res.redirect("/formulario");
    } else {
    //   res.render("login");
    }
  };
  
  export const visit = (req : Request, res : Response) => {
    // req.session.info.counter++;
    // res.json({
    //   msg: `${req.session.info.username} ha visitado el sitio ${req.session.info.counter} veces`,
    // });
  };
  
  export const logout = (req : Request, res : Response) => {
    const name = req.session.info?.username;
    if (name) {
      req.session.destroy((err) => {
        if (!err) {
          res.render("logout", { name });
        } else {
          res.redirect("/formulario");
        }
      });
    }
  };
  
  export const infoSession = (req : Request, res : Response) => {
    // res.render("components/loginAlert", { name: req.session.info.username });
  };