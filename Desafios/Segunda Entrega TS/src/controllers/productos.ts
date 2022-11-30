import { prodcutModel } from "../models/productos";
import express, { Request, Response, NextFunction } from "express";

export const checkBodyProducto = async ( req : Request ,  res : Response , next : NextFunction) => {
    
    const { nombre , descripcion, codigo, foto, precio, stock } = req.body
    console.log(nombre)
    if (!nombre || !descripcion || !precio || !codigo) {

        return res.status(400).json({
            ok: false,
            msg: "Por favor complete todos los datos"
        })
        
    }
    next();
}


export const createProdcuto = async ( req : Request ,  res : Response ) => {
    console.log("holis");
    
    try {
    
        const { nombre , descripcion, codigo, foto, precio, stock } = req.body
        console.log(req.body);
        
        const prodNuevo = await prodcutModel.create({
            nombre,
            descripcion,
            codigo,
            foto,
            precio,
            stock
        })

        return res.status(200).json({
            ok: true,
            msg: "Producto creado",
            producto: prodNuevo

        })

    } catch (error : any) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: error.message,
        })
    }

}

export const deleteProdcuto = async ( req : Request ,  res : Response ) => {
    
    const { id } = req.params;
    console.log(id)
    try {
    
        const encontrado = await prodcutModel.findById(id)
        console.log(encontrado)
        if (!encontrado) {
            
            return res.status(400).json({
                ok: false,
                msg: "Id No encontrado",
    
            })
 
        } else {



            await prodcutModel.findByIdAndDelete(id)
            return res.status(200).json({
                ok: true,
                msg: "Producto eliminado"
    
            })

        }


    } catch (error : any) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: error.message,
        })
    }

}

export const modificarProducto = async ( req : Request ,  res : Response ) => {

    const { id } = req.params;
    try {
        
        const encontrado = await prodcutModel.findById(id)
        console.log(encontrado)
        if (!encontrado) {
            
            return res.status(400).json({
                ok: false,
                msg: "Id No encontrado",
    
            })
 
        } else {

            const { nombre , descripcion, codigo, foto, precio, stock } = req.body
            const modificado = await prodcutModel.findByIdAndUpdate(
                id,
                { nombre, descripcion, codigo, foto, precio, stock},
                {new : true}
            )
            return res.status(200).json({
                ok: true,
                msg: "Producto modificado"
    
            })

        }


        

    } catch (error : any) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: error.message,
        })
    }

}

export const getProducto = async ( req : Request ,  res : Response ) => {

    const { id } = req.params;
    try {
        
        const encontrado = await prodcutModel.findById(id)
        console.log(encontrado)
        if (!encontrado) {
            
            return res.status(400).json({
                ok: false,
                msg: "Id No encontrado",
    
            })
 
        } else {

            
            return res.status(200).json({
                ok: true,
                msg: "Producto ecnontrado",
                producto : encontrado
    
            })

        }


        

    } catch (error : any) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: error.message,
        })
    }

}

export const getAllProductos = async ( req : Request ,  res : Response ) => {

    try {

        const productos = await prodcutModel.find()
        if (!productos) {
            return res.status(400).json({
                ok: false,
                msg: "No se encontraron productos",
    
            })
        } else {
            return res.status(200).json({
                ok: true,
                msg: "Productos ecnontrados",
                productos : productos
    
            })
        }
        
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: error.message,
        })
    }

}