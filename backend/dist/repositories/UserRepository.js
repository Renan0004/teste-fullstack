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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const database_1 = require("../config/database");
const User_1 = require("../models/User");
exports.UserRepository = database_1.AppDataSource.getRepository(User_1.User).extend({
    findByCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findOne({ where: { code } });
        });
    },
    createIfNotExists(code) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.findByCode(code);
            if (!user) {
                user = this.create({ code });
                yield this.save(user);
            }
            return user;
        });
    }
});
