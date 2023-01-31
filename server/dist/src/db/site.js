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
exports.deleteImage = exports.getGallery = exports.postImage = exports.toggleState = exports.getState = void 0;
const pool_1 = __importDefault(require("./pool"));
function getState(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const state = yield pool_1.default.query('SELECT commission_open FROM site.state');
        res.send(state.rows[0]);
    });
}
exports.getState = getState;
function toggleState(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield pool_1.default.query('UPDATE site.state \
         SET commission_open = NOT commission_open');
        res.send({ message: 'updated' });
    });
}
exports.toggleState = toggleState;
function postImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileName = req.fileName;
        const { title, description } = req.body;
        const datePosted = new Date();
        yield pool_1.default.query('INSERT INTO site.gallery_images (file_name, title, image_description, date_posted)\
         VALUES ($1, $2, $3, $4)', [fileName, title, description, datePosted]);
        res.status(201).send({ message: 'image added' });
    });
}
exports.postImage = postImage;
function getGallery(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { perPage, orderBy, page } = req.body;
        const rowCount = pool_1.default.query('SELECT COUNT(*) FROM site.gallery_images');
        const images = pool_1.default.query('SELECT * FROM site.gallery_images ORDER BY $1 OFFSET $2 LIMIT $3', [orderBy, perPage * (page - 1), perPage]);
        res.send({
            images: yield images,
            rowCount: yield rowCount
        });
    });
}
exports.getGallery = getGallery;
function deleteImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { fileName } = req.body;
        yield pool_1.default.query('DELETE FROM site.gallery_images WHERE file_name=$1', [fileName]);
        res.status(204).send({ message: 'deleted' });
    });
}
exports.deleteImage = deleteImage;
