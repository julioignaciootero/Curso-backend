"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productos_1 = __importDefault(require("./productos"));
const carritos_1 = __importDefault(require("./carritos"));
const router = express_1.default.Router();
router.use("/api/productos", productos_1.default);
router.use("/api/carritos", carritos_1.default);
exports.default = router;
