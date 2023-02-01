"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productos_1 = require("../controllers/productos");
const router = express_1.default.Router();
router.post('/', productos_1.checkBodyProducto, productos_1.createProdcuto);
router.delete('/:id', productos_1.deleteProdcuto);
router.put('/:id', productos_1.checkBodyProducto, productos_1.modificarProducto);
router.get('/:id', productos_1.getProducto);
router.get('/', productos_1.getAllProductos);
exports.default = router;
