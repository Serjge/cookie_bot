import TelegramBot from 'node-telegram-bot-api'
import dotenv from 'dotenv'
import { getCookie } from './cookies';

dotenv.config()

const token = process.env.TOKEN || ''
const bot = new TelegramBot(token, { polling: true })

const start = async () => {

  await bot.setMyCommands([
    { command: 'start', description: 'Приветствие' },
    { command: 'info', description: 'Информация' },
  ])

  bot.on('message', async ({ text, chat }) => {
    const { id, first_name } = chat

    switch (text) {
      case '/start' :
        await bot.sendSticker(id, 'https://tlgrm.ru/_/stickers/9b3/d81/9b3d817d-08d9-4a00-ba40-d289d253d0bf/12.webp')
        return bot.sendMessage(id, `Привет, ${ first_name }! Ты попал на печеньки! 🍪`, {
          reply_markup: {
            keyboard: [
              [
                { text: 'Хочу печеньку' },
              ],
            ],
            one_time_keyboard: false, resize_keyboard: true,
          },
        })

      case '/info':
        return bot.sendMessage(id, `Предсказание судьбы и совет от Печеньки! 🍪`)

      case 'Хочу печеньку':
        await bot.sendMessage(id, getCookie(), { parse_mode: 'HTML' })
        return bot.sendSticker(id, 'https://tlgrm.ru/_/stickers/9b3/d81/9b3d817d-08d9-4a00-ba40-d289d253d0bf/192/31.webp')

      default:
        return bot.sendMessage(id, `Я не понимаю тебя, попробуй еще раз! )`)
    }
  })
}

start()