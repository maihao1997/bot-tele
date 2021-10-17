require('dotenv').config();
const cron = require('node-cron');
const got = require('got');
const moment = require('moment');

const currentPriceCake =  async() => {
    const rs = await got('https://api.coingecko.com/api/v3/coins/pancakeswap-token');
    const data = JSON.parse(rs.body);
    return data.market_data.current_price.usd;
}

const currentPriceMAT =  async() => {
    const rs = await got('https://api.coingecko.com/api/v3/coins/my-master-war');
    const data = JSON.parse(rs.body);
    return data.market_data.current_price.usd;
}

let timeOldMessCake = moment();
let timeOldMessMAT = moment();

// cron.schedule('*/5 * * * * *', async() => {
//     const price = await currentPriceCake();
//     console.log('usd cake', price);
//     const message = `usd cake ${price}`;

//     if (price > 27) {
//         const timeNewMess = moment();
//         if (timeNewMess.subtract(1, 'minutes').isAfter(timeOldMessCake)) {
//             got(`https://api.telegram.org/bot1999669405:AAHd-bdpapXYgZFL-ObRNJ6V5NYVufQrnl0/sendMessage?chat_id=1282912471&text=${message}`);
//             timeOldMessCake = moment();
//         }
//         //
//     }
// });

cron.schedule('*/10 * * * * *', async() => {
    const price = await currentPriceMAT();
    console.log('usd MAT', price);
    const message = `usd MAT ${price}`;

    if (price > 4.4 || price < 3) {
        const timeNewMess = moment();
        if (timeNewMess.subtract(1, 'minutes').isAfter(timeOldMessMAT)) {
            console.log('sendMessage', message);
            got(`https://api.telegram.org/bot1999669405:AAHd-bdpapXYgZFL-ObRNJ6V5NYVufQrnl0/sendMessage?chat_id=1282912471&text=${message}`);
            timeOldMessMAT = moment();
        }
        //
    }
});
