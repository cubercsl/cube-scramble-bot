const { Telegraf } = require('telegraf');
const fetch = require('node-fetch');
const bot = new Telegraf(process.env.BOT_TOKEN);

const API_ENDPOINT = process.env.API_ENDPOINT;
const SECRET_PATH = process.env.SECRET_PATH;
const WEBHOOK_URL = process.env.WEBHOOK_URL;
const PORT = process.env.PORT || 5000;

// const bot = new Telegraf(BOT_TOKEN);
// Your code here, but do not `bot.launch()`
const Puzzle = ['222', '333', '333fm', '333bf', '444', '444bf', '555', '555ni', '666', '777', 'clock', 'minx', 'pyram', 'skewb', 'sq1'];
const PuzzleMapper = {
    '333bf': '333ni',
    '444bf': '444ni'
};

bot.start((ctx) => {
    ctx.reply('Welcome');
})

Puzzle.forEach((puzzle) => {
    bot.command(puzzle, (ctx) => {
        const query = PuzzleMapper[puzzle] || puzzle;
        const url = `${API_ENDPOINT}/scramble/${query}`
        fetch(url)
        .then(resp => resp.text())
        .then(scramble => {
            console.log(scramble)
            ctx.reply(scramble)
        }).catch(err => {
            ctx.reply(err);
        });
    })
});

bot.telegram.setWebhook(`${WEBHOOK_URL}/${SECRET_PATH}`);

bot.startWebhook(`/${SECRET_PATH}`, null, PORT);

