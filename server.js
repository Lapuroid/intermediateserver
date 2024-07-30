const express = require('express');
const request = require('request');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.post('/update', (req, res) => {
    const { device, status, ip } = req.body;

    // Construct the URL for the ESP device
    const espUrl = `http://${ip}/update`;

    // Forward the request to the ESP device
    request.post(
        espUrl,
        { form: { device, status } },
        (error, response, body) => {
            if (error) {
                return res.status(500).send('Error forwarding request');
            }
            res.send(body);
        }
    );
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
