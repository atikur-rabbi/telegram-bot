const TelegramBot = require('node-telegram-bot-api');
const token = process.env.token
const bot = new TelegramBot(token, { polling: true });

var keyboard = {
    "reply_markup": {
        "keyboard": [["/start","Hi", "Bye"],  ["id","I'm robot","pic"],]
        }
    };

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome", keyboard);   
});


bot.on('message', (msg) => {
    var Hi = "hi";
    if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
        bot.sendMessage(msg.chat.id, "Hello dear user");
    }
    var bye = "bye";
    if (msg.text.toString().toLowerCase().includes(bye)) {
        bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
    }    
    var robot = "I'm robot";
    if (msg.text.indexOf(robot) === 0) {
        bot.sendMessage(msg.chat.id, "Yes I'm robot but not in that way!");
    }

    var chatid = "id";
    if (msg.text.indexOf(chatid) === 0) {
        bot.sendMessage(msg.chat.id, msg.chat.id);
    }

    var keys = "keyboard";
    if (msg.text.indexOf(keys) === 0) {
        bot.sendMessage(msg.chat.id, "", keyboard);
    }

    var pic = "pic"
    if (msg.text.indexOf(pic) === 0) {
        const url = 'https://telegram.org/img/t_logo.png';
        bot.sendPhoto(msg.chat.id, url);
    }
    
});

var btnText = "/btn";
bot.onText(/\/callbackquery/, (msg, match) => {
    bot.sendMessage(msg.chat.id, "Click a button won't you!", {
        "reply_markup": {
            "inline_keyboard": [
                [
                    {
                        text: "Click me!",
                        callback_data: "click",
                    },
                ],
            ],
        },
    });
});

bot.on("callback_query", (callbackQuery) => {
    const msg = callbackQuery.message;
    bot.answerCallbackQuery(callbackQuery.id)
        .then(() => bot.sendMessage(msg.chat.id, "You clicked!"));
});