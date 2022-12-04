import { config } from 'dotenv';
import { Markup, Telegraf } from 'telegraf';
import { bold, fmt } from 'telegraf/format';
import { randomCookie } from 'utils/randomCookie';
import { cookieController } from 'controllers/cookies.controller';

config();

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
      ...mainMenu, message_thread_id: 2,
    });
  }
});

bot.hears(CMD_TEXT.cookie, async (ctx) => {
  const { rows } = await cookieController.getCookie();

  ctx.reply(fmt`🥠  ${bold`${randomCookie(rows)}`}`);
});

bot.launch().then(() => {
  console.log('бот запущен');
}).catch((err) => {
  console.log(err);
});

// Enable graceful stop

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
