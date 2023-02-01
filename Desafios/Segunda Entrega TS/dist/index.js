"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./services/server"));
const database_1 = require("./bd/database");
(0, database_1.initMongoDB)();
server_1.default.listen('8080', () => {
    console.log("Servidor corriendo");
});
