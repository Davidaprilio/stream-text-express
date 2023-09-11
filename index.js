const express = require('express');
const path = require('path');
const app = express();

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/stream', async (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream', // Mengaktifkan mode streaming
        'Transfer-Encoding': 'chunked',
        'Connection': 'keep-alive'
    });
    
    const texts = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat esse excepturi quibusdam voluptates architecto reprehenderit provident nostrum id voluptatibus amet? Nisi assumenda ratione quis sapiente est? Saepe eum ex sunt maiores veritatis. Ex, inventore dolorum? Laboriosam incidunt labore debitis tempora voluptates inventore nostrum corporis, perspiciatis, dicta eum ducimus praesentium eos quam fugit recusandae, distinctio veniam! Ducimus maiores odio itaque temporibus. Et odit iure modi perferendis quae veritatis eligendi alias vitae, nisi iste voluptatem illo ad ducimus, unde autem blanditiis! Repellat enim sed alias excepturi nisi illo in iusto consequatur voluptates harum blanditiis saepe aspernatur nam, repellendus dolore temporibus impedit ipsam.`.split(' ');

    const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const getText = () => `${texts[random(0, (texts.length - 1))]} `
    const textLength = random(50, 170);

    for (let i = 0; i < textLength; i++) {
        res.write(getText());
        if (random(0, 20) === 0) {
            await sleep(random(7, 20) * 100);
        }
        await sleep(random(0.1, 4) * 100);
    }

    res.end(getText()); // Mengakhiri respon
})

try {
    const PORT = process.env.PORT || 3005;
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
} catch (error) {
    if (error.code === 'EADDRINUSE') {
        console.error(`Alamat server sudah digunakan, coba dengan PORT lain`);200
    }

    process.exit(1);
}
