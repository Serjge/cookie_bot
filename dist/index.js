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
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookies_1 = require("./cookies");
dotenv_1.default.config();
const token = process.env.TOKEN || '';
const bot = new node_telegram_bot_api_1.default(token, { polling: true });
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield bot.setMyCommands([
        { command: 'start', description: 'Приветствие' },
        { command: 'info', description: 'Информация' },
    ]);
    bot.on('message', ({ text, chat }) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, first_name } = chat;
        if (text === '/start') {
            yield bot.sendSticker(id, 'https://tlgrm.ru/_/stickers/9b3/d81/9b3d817d-08d9-4a00-ba40-d289d253d0bf/12.webp');
            return bot.sendMessage(id, `Привет, ${first_name}! Ты попал на печеньки! 🍪`, {
                reply_markup: {
                    keyboard: [
                        [
                            { text: 'Хочу печеньку' },
                        ],
                    ],
                    one_time_keyboard: false, resize_keyboard: true,
                },
            });
        }
        if (text === '/info') {
            return bot.sendMessage(id, `Предсказание судьбы и совет от Печеньки! 🍪`);
        }
        if (text === 'Хочу печеньку') {
            yield bot.sendMessage(id, (0, cookies_1.getCookie)(), { parse_mode: 'HTML' });
            return bot.sendSticker(id, 'https://tlgrm.ru/_/stickers/9b3/d81/9b3d817d-08d9-4a00-ba40-d289d253d0bf/192/31.webp');
        }
        return bot.sendMessage(id, `Я не понимаю тебя, попробуй еще раз! )`);
    }));
});
start();
