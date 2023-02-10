import * as File from "./fs/filesystem.js";
import * as Memory from "./memory/memory.js";
import * as MongoDB from "./mongo/mongo.js";


let persistence;
let option = process.env.PERSISTENCE;



switch(option) {
    case 'file':
        persistence = File;
        console.log(option);
        break;
    case 'mongo':
        initMongoDB();
        persistence = MongoDB;
        console.log(option);
        break;
    default:
        persistence = Memory;
        break;
};

export async function save(obj) {
    return await persistence.save(obj);
};

export async function getAll() {
    return await persistence.getAll();
};