"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.COMMISSION_PATH ? process.env.COMMISSION_PATH : "../commission_images");
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + path_1.default.extname(file.originalname);
        cb(null, fileName);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
const multipleUpload = upload.fields([{ name: 'references' }]);
const commissions = express_1.default.Router();
commissions.get('/', db_1.default.getCommissionsWithStatus);
commissions.get('/:id', db_1.default.getCommission);
commissions.post('/upload', multipleUpload, db_1.default.postCommission);
exports.default = commissions;
