"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const carritos_1 = require("../controllers/carritos");
const router = express_1.default.Router();
router.post('/', carritos_1.checkBodyCarrito, carritos_1.createCarrito);
router.delete('/:id', carritos_1.deleteCarrito);
router.delete('/:id/productos/:id_prod', carritos_1.deleteProducto);
router.post('/:id/productos', carritos_1.agregarProducto);
router.get('/:id', carritos_1.getCarrito);
router.get('/', carritos_1.getAllCarritos);
exports.default = router;
