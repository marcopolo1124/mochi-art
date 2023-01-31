"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const express_1 = __importDefault(require("express"));
const site_state = express_1.default.Router();
site_state.get('/', db_1.default.getState);
site_state.put('/', db_1.default.toggleState);
exports.default = site_state;
