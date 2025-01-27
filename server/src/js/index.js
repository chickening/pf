"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const typeorm_1 = require("typeorm");
const handle_1 = require("./handle");
const path_1 = __importDefault(require("path"));
const accountsRouter_1 = __importDefault(require("./router/accountsRouter"));
const postsRouter_1 = __importDefault(require("./router/postsRouter"));
const sessionRouter_1 = __importDefault(require("./router/sessionRouter"));
const securityRouter_1 = __importDefault(require("./router/securityRouter"));
const app = express_1.default();
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../../public')));
app.use(express_1.default.json({
    limit: 12000
}));
app.use(express_session_1.default({
    secret: 'chickenisgood',
    resave: false,
    saveUninitialized: false
}));
app.use((req, res, next) => {
    console.log('Time', new Date(Date.now() + 9000 * 3600).toUTCString(), 'URL', req.url);
    console.log('Body', req.body);
    console.log();
    next();
});
app.use('/accounts', accountsRouter_1.default);
app.use('/posts', postsRouter_1.default);
app.use('/session', sessionRouter_1.default);
app.use('/', securityRouter_1.default);
app.use((req, res, next) => {
    if (req.method === "GET") {
        res.type("html");
        res.sendFile(path_1.default.resolve(__dirname, '../../public/spa.html'));
    }
    else {
        next();
    }
});
typeorm_1.createConnection()
    .then((connection) => {
    handle_1.Handle.dbConnection = connection;
    console.log("데이터 베이스 연결 성공");
    app.listen(80, () => {
        console.log('LISTENING SUCCESS');
    });
}).catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map