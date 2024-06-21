"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = require("mongoose");
require("dotenv/config");
const connectDB = async () => {
    try {
        await (0, mongoose_1.connect)(`mongodb+srv://greycoinz:${process.env.MONGODB_PASSWORD}@cluster0.bmhvwra.mongodb.net/mern-graphql-blog?retryWrites=true&w=majority`);
        console.log("Database Connected");
    }
    catch (error) {
        console.log(error);
        throw new Error(error);
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=connection.js.map