import passport from "passport";
import { Strategy as localStrategy} from "passport-local";
import { UserModel } from '../model/user.js'

const strategyOptions = {
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true,
}


const signup = async (req, username, password, done) => {

    try {
        
        const newUser = new UserModel({username, password})
        newUser.password = await newUser.encryptPassowrd(password)
        await newUser.save()
        return done(null, newUser)

    } catch (error) {
        console.log(error)
        return done(null, false, { msg: "Error"})
    }

}


const login = async (req, username, password, done) => {

    const user = await UserModel.findOne({username})
    if(!user) {
        return done(null, false, { msg: "Usuario no encontrado"})
    } else {
        const match = await user.matchPassword(password)
        match ? done(null, user) : done(null, false)
    }
}


export const loginFunction = new localStrategy(strategyOptions , login)
export const signUpFunction = new localStrategy(strategyOptions , signup)


passport.serializeUser((user, done)=> {
    done(null, user._id)
})


passport.deserializeUser( async(userId, done) => {
    const user = await UserModel.findById(userId)
    return done(null, user)
})