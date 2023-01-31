"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const site_state_1 = __importDefault(require("./routes/site_state"));
const images_1 = __importDefault(require("./routes/images"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use('/state', site_state_1.default);
app.use('/images', images_1.default);
app.set("view_engine", "ejs");
app.get('/', (req, res) => {
    res.send({ message: 'Server is up' });
});
app.get('/test', (req, res) => {
    res.render('upload.ejs');
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
