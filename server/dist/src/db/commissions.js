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
exports.postCommission = exports.getCommission = exports.getCommissionsWithStatus = void 0;
const pool_1 = __importDefault(require("./pool"));
const crypto_1 = __importDefault(require("crypto"));
function getCommissionsWithStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let commissions;
        if (req.query.status) {
            commissions = yield pool_1.default.query("SELECT * FROM commissions.commissions WHERE status=$1", [req.query.status]);
        }
        else {
            commissions = yield pool_1.default.query("SELECT * FROM commissions.commissions");
        }
        res.send({ pendingCommissions: commissions.rows });
    });
}
exports.getCommissionsWithStatus = getCommissionsWithStatus;
function getCommission(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.query;
        const images = pool_1.default.query('SELECT * FROM commissions.commission_images WHERE commission_id=$1', [id]);
        const commission = yield pool_1.default.query('SELECT * FROM commissions.commission WHERE id=$1', [id]);
        if (commission.rows.length > 0) {
            res.send({
                commission,
                images: (yield images).rows
            });
        }
        else {
            res.status(404).send({
                commission: null,
                images: []
            });
        }
    });
}
exports.getCommission = getCommission;
function postCommission(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, characterName, numberOfCharacters, scope, comType, details, images } = req.body;
        const id = crypto_1.default.randomUUID();
        const timestamp = new Date();
        const status = 'pending';
        yield pool_1.default.query("INSERT INTO commissions.commissions (id, name, email, character_name, number_of_characters, scope, com_type, details)\
         VALUES ($1, $2, $3, $4, $5)", [id, name, email, characterName, numberOfCharacters, scope, comType, details]);
        const promises = [];
        for (const file_name in images) {
            promises.push(pool_1.default.query("INSERT INTO commissions.commission_images (commission_id, file_name)\
             VALUES ($1, $2)", [id, file_name]));
        }
        yield Promise.all(promises);
        res.status(201).send({ message: 'commission pending' });
    });
}
exports.postCommission = postCommission;
