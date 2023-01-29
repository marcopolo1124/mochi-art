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
exports.toggleState = exports.getState = void 0;
const pool_1 = __importDefault(require("./pool"));
function getState(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const state = yield pool_1.default.query('SELECT commission_open FROM site.state');
        req.state = state.rows[0];
        next();
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
