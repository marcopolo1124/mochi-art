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
exports.deleteAdmin = exports.updateAdminPassword = exports.postAdmin = exports.getAdminByUsername = void 0;
const pool_1 = __importDefault(require("./pool"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function getAdminByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const adminUser = yield pool_1.default.query('SELECT * FROM users.admin WHERE username=$1', [username]);
        return adminUser.rows.length > 0 ?
            { adminUser: adminUser.rows[0], status: 200 } : { adminUser: null, status: 404 };
    });
}
exports.getAdminByUsername = getAdminByUsername;
function postAdmin(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = bcrypt_1.default.hash(password, salt);
        yield pool_1.default.query('INSERT INTO users.admin (username, password)\
         VALUES ($1, $2)', [username, hashedPassword]);
        return { message: 'admin created', status: 201 };
    });
}
exports.postAdmin = postAdmin;
function updateAdminPassword(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = bcrypt_1.default.hash(password, salt);
        yield pool_1.default.query('UPDATE users.admin SET password = $2 WHERE username = $1', [username, hashedPassword]);
        return { message: 'password updated', status: 200 };
    });
}
exports.updateAdminPassword = updateAdminPassword;
function deleteAdmin(username) {
    return __awaiter(this, void 0, void 0, function* () {
        yield pool_1.default.query('DELETE FROM users.admin WHERE username = $1', [username]);
        return { status: 204 };
    });
}
exports.deleteAdmin = deleteAdmin;
