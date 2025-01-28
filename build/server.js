"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 2001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send('Welcome to SAFIRA!! (SAFE & ALERT)');
});
const mongodb = process.env.MONGO_URI || 'mongodb+srv://agbakwuruoluchi29:vefCHcnf5Wd5nBvH@cluster0.8l6qf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose_1.default.connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'An unexpected error occurred', error: err.message });
});
app.listen(port, () => {
    console.log(`SAFIRA is running on port ${port}`);
});
exports.default = app;
