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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCarritos = exports.getCarrito = exports.agregarProducto = exports.updateStock = exports.deleteCarrito = exports.createCarrito = exports.deleteProducto = exports.checkBodyCarrito = void 0;
const carritos_1 = require("../models/carritos");
const productos_1 = require("../models/productos");
const mongoose_1 = __importDefault(require("mongoose"));
const checkBodyCarrito = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productos } = req.body;
    console.log(productos);
    if (!productos) {
        return res.status(400).json({
            ok: false,
            msg: "Por favor complete todos los datos"
        });
    }
    next();
});
exports.checkBodyCarrito = checkBodyCarrito;
const deleteProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const id_prod = req.params.id_prod;
    const id_prod_object = new mongoose_1.default.mongo.ObjectId(id_prod);
    // console.log(id_prod + "         " + id_prod_object)
    // return
    try {
        const encontrado = yield carritos_1.carritoModel.findById(id);
        if (!encontrado) {
            return res.status(400).json({
                ok: false,
                msg: "Carrito No encontrado",
            });
        }
        else {
            encontrado.productos.forEach(element => {
                // console.log(element.producto + "       " + id_prod_object)
                console.log(JSON.stringify(element.producto) === JSON.stringify(id_prod_object));
            });
            const prod = encontrado.productos.find(p => (JSON.stringify(p.producto) === JSON.stringify(id_prod_object)));
            if (prod) {
                yield carritos_1.carritoModel.findByIdAndUpdate(id, {
                    $pullAll: {
                        productos: [{ producto: id_prod_object }]
                    }
                });
                //Si se elimino el producto le vuelvo a generar el stock al producto                  
                const stockUpd = yield (0, exports.updateStock)(prod.producto, prod.cantidad, true);
                return res.status(200).json({
                    ok: false,
                    msg: "Producto eliminado",
                });
            }
            else {
                return res.status(400).json({
                    ok: false,
                    msg: "Producto No encontrado",
                });
            }
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
exports.deleteProducto = deleteProducto;
const createCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("holis");
    try {
        const { productos } = req.body;
        console.log(req.body);
        const carritoNuevo = yield carritos_1.carritoModel.create({
            productos: productos
        });
        return res.status(200).json({
            ok: true,
            msg: "Carrito creado",
            producto: carritoNuevo
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
exports.createCarrito = createCarrito;
const deleteCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    try {
        const encontrado = yield carritos_1.carritoModel.findById(id);
        console.log(encontrado);
        if (!encontrado) {
            return res.status(400).json({
                ok: false,
                msg: "Carrito No encontrado",
            });
        }
        else {
            encontrado.productos.forEach(prod => {
                const stockUpd = (0, exports.updateStock)(prod.producto, prod.cantidad, true);
            });
            yield carritos_1.carritoModel.findByIdAndDelete(id);
            return res.status(200).json({
                ok: true,
                msg: "Carrito eliminado"
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
exports.deleteCarrito = deleteCarrito;
const updateStock = (id, cantidad, sumar) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(id, cantidad, sumar);
        const prod = yield productos_1.prodcutModel.findById(id);
        if (!prod) {
            return false;
        }
        else {
            if (sumar) {
                prod.stock = prod.stock + cantidad;
            }
            else {
                prod.stock = prod.stock - cantidad;
            }
            yield productos_1.prodcutModel.findByIdAndUpdate(prod.id, prod);
            return true;
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.updateStock = updateStock;
const agregarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!req.body.producto || !req.body.cantidad)
        res.status(400).json({
            ok: false,
            msg: "Error. Datos incompletos"
        });
    try {
        const encontrado = yield carritos_1.carritoModel.findById(id);
        console.log(encontrado);
        if (!encontrado) {
            return res.status(400).json({
                ok: false,
                msg: "Carrito No encontrado",
            });
        }
        else {
            const id_prod = req.body.producto;
            const cantidad = req.body.cantidad;
            console.log(id_prod);
            const prod = yield productos_1.prodcutModel.findById(id_prod);
            if (!prod) {
                return res.status(400).json({
                    ok: false,
                    msg: "Producto No encontrado",
                });
            }
            else {
                if (cantidad > prod.stock) {
                    return res.status(400).json({
                        ok: false,
                        msg: "Stock no disponible"
                    });
                }
                const carrito = yield carritos_1.carritoModel.findByIdAndUpdate(id, {
                    $addToSet: {
                        productos: {
                            producto: id_prod,
                            cantidad: cantidad
                        }
                    }
                }, { new: true });
                prod.stock = prod.stock - cantidad;
                yield productos_1.prodcutModel.findByIdAndUpdate(id_prod, prod);
                return res.status(200).json({
                    ok: true,
                    msg: "Producto Agregado",
                    carrito: carrito
                });
            }
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
exports.agregarProducto = agregarProducto;
// export const modificarProducto = async ( req : Request ,  res : Response ) => {
//     const { id } = req.params;
//     try {
//         const encontrado = await prodcutModel.findById(id)
//         console.log(encontrado)
//         if (!encontrado) {
//             return res.status(400).json({
//                 ok: false,
//                 msg: "Id No encontrado",
//             })
//         } else {
//             const { nombre , descripcion, codigo, foto, precio, stock } = req.body
//             const modificado = await prodcutModel.findByIdAndUpdate(
//                 id,
//                 { nombre, descripcion, codigo, foto, precio, stock},
//                 {new : true}
//             )
//             return res.status(200).json({
//                 ok: true,
//                 msg: "Producto modificado"
//             })
//         }
//     } catch (error : any) {
//         console.log(error);
//         return res.status(500).json({
//             ok: false,
//             msg: error.message,
//         })
//     }
// }
const getCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const encontrado = yield carritos_1.carritoModel.findById(id);
        console.log(encontrado);
        if (!encontrado) {
            return res.status(400).json({
                ok: false,
                msg: "Carrito no encontrado",
            });
        }
        else {
            return res.status(200).json({
                ok: true,
                msg: "Carrito ecnontrado",
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
exports.getCarrito = getCarrito;
const getAllCarritos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carritos = yield carritos_1.carritoModel.find();
        if (!carritos) {
            return res.status(400).json({
                ok: false,
                msg: "No se encontraron carritos",
            });
        }
        else {
            return res.status(200).json({
                ok: true,
                msg: "carritos ecnontrados",
                carritos: carritos
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
exports.getAllCarritos = getAllCarritos;
