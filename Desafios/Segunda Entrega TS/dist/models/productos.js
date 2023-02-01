"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prodcutModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const prodcutosSchema = new mongoose_1.default.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    codigo: { type: Number, required: true },
    foto: { type: String },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
});
exports.prodcutModel = mongoose_1.default.model('productos', prodcutosSchema);
