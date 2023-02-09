"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_config_1 = __importDefault(require("./passport-config"));
const passport_1 = __importDefault(require("passport"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
(0, passport_config_1.default)(passport_1.default);
const admin = express_1.default.Router();
const secret = process.env.SESSION_SECRET;
admin.use((0, express_session_1.default)({
    secret: secret ? secret : 'secret',
    resave: false,
    saveUninitialized: false,
}));
admin.use(passport_1.default.initialize());
admin.use(passport_1.default.session());
admin.get('/', (req, res) => {
    res.send({ user: req.user, message: 'test' });
});
admin.post('/login', (req, res, next) => {
    passport_1.default.authenticate('local', (err, user) => {
        console.log(user);
        if (err)
            res.status(500).send({ message: 'Server error' });
        if (!user)
            res.status(404).send({ message: 'User not found' });
        else {
            req.login(user, err => {
                if (err)
                    res.status(500).send({ message: 'Server error', error: JSON.stringify(err) });
                res.send({ message: 'Successfully Authenticated' });
            });
        }
    })(req, res, next);
});
exports.default = admin;
