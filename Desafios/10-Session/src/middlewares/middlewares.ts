import express, { Request, Response, NextFunction } from "express";

interface SessionInfo {
    loggedIn: boolean;
    username : string;
    admin : boolean;
    counter: number 
}

declare module 'express-session' {
    interface SessionData {
        info: SessionInfo;
    }
}

export const validateLogIn = (req : Request, res : Response , next : NextFunction) => {

    if (req.session.info?.admin) next();
    else
      res.status(401).json({
        msg: "Usuario NO autorizado",
      });

  };