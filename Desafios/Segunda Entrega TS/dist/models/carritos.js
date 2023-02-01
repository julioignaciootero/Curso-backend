"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carritoModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const carritoSchema = new mongoose_1.default.Schema({
    productos: [
        { producto: { type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'productos',
                autopopulate: true,
                required: true },
            cantidad: { type: Number, required: true }
        }
    ]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
});
exports.carritoModel = mongoose_1.default.model('carritos', carritoSchema);
