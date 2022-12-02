import dotenv from 'dotenv';
import { Markup, Telegraf } from 'telegraf';
import { bold, fmt } from 'telegraf/format';
import getCookie from './cookies';

dotenv.config();

const token = process.env.TOKEN || '';

const CMD_TEXT = {
  cookie: '🍪 Хочу печеньку',
};

const mainMenu = Markup.keyboard([
  [CMD_TEXT.cookie],
]).resize();

const bot = new Telegraf(token);

bot.command('start', (ctx) => {
  const { message: { chat } } = ctx;

  if (chat.type === 'private') {
    ctx.replyWithPhoto({ source: 'src/assets/image/cookie.jpg' });
    ctx.reply(`Привет, ${chat.first_name}! Ты попал на печеньки! 🍪`, {
      disable_web_page_preview: true,
      parse_mode: 'HTML',
      ...mainMenu,
    });
  }
});

bot.hears(CMD_TEXT.cookie, (ctx) => {
  ctx.reply(fmt`${bold`${getCookie()}`}`);
});

bot.launch().then(() => {
  console.log('бот запущен');
}).catch((err) => {
  console.log(err);
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
