"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProductos = exports.getProducto = exports.modificarProducto = exports.deleteProdcuto = exports.createProdcuto = exports.checkBodyProducto = void 0;
const productos_1 = require("../models/productos");
const checkBodyProducto = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    console.log(nombre);
    if (!nombre || !descripcion || !precio || !codigo) {
        return res.status(400).json({
            ok: false,
            msg: "Por favor complete todos los datos"
        });
    }
    next();
});
exports.checkBodyProducto = checkBodyProducto;
const createProdcuto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("holis");
    try {
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        console.log(req.body);
        const prodNuevo = yield productos_1.prodcutModel.create({
            nombre,
            descripcion,
            codigo,
            foto,
            precio,
            stock
        });
        return res.status(200).json({
            ok: true,
            msg: "Producto creado",
            producto: prodNuevo
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: error.message,
        });
    }
});
exports.createProdcuto = createProdcuto;
const deleteProdcuto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    try {
        const encontrado = yield productos_1.prodcutModel.findById(id);
        console.log(encontrado);
        if (!encontrado) {
            return res.status(400).json({
                ok: false,
                msg: "Id No encontrado",
            });
        }
        else {
            yield productos_1.prodcutModel.findByIdAndDelete(id);
            return res.status(200).json({
                ok: true,
                msg: "Producto eliminado"
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: error.message,
        });
    }
});
exports.deleteProdcuto = deleteProdcuto;
const modificarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const encontrado = yield productos_1.prodcutModel.findById(id);
        console.log(encontrado);
        if (!encontrado) {
            return res.status(400).json({
                ok: false,
                msg: "Id No encontrado",
            });
        }
        else {
            const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
            const modificado = yield productos_1.prodcutModel.findByIdAndUpdate(id, { nombre, descripcion, codigo, foto, precio, stock }, { new: true });
            return res.status(200).json({
                ok: true,
                msg: "Producto modificado"
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: error.message,
        });
    }
});
exports.modificarProducto = modificarProducto;
const getProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const encontrado = yield productos_1.prodcutModel.findById(id);
        console.log(encontrado);
        if (!encontrado) {
            return res.status(400).json({
                ok: false,
                msg: "Id No encontrado",
            });
        }
        else {
            return res.status(200).json({
                ok: true,
                msg: "Producto ecnontrado",
                producto: encontrado
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: error.message,
        });
    }
});
exports.getProducto = getProducto;
const getAllProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productos = yield productos_1.prodcutModel.find();
        if (!productos) {
            return res.status(400).json({
                ok: false,
                msg: "No se encontraron productos",
            });
        }
        else {
            return res.status(200).json({
                ok: true,
                msg: "Productos ecnontrados",
                productos: productos
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: error.message,
        });
    }
});
exports.getAllProductos = getAllProductos;
