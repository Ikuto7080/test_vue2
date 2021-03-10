
const puppeteer = require('puppeteer');

const url = 'https://scontent-nrt1-1.cdninstagram.com/v/t51.29350-15/109130871_149225830105794_6871359187132379915_n.jpg?_nc_cat=107&ccb=3&_nc_sid=8ae9d6&_nc_ohc=AoGs_p1J_4QAX8tve2S&_nc_ht=scontent-nrt1-1.cdninstagram.com&oh=582aca1c23691b3782fd72db3daa5090&oe=606736BB';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({ path: 'screenshot.png' });
    
    await browser.close();
    })();