const express =  require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Set static path

app.use(express.static(path.join(__dirname, "client")))

app.use(bodyParser.json());

const publicVapidKey = 'BDaHz0N5vvKqfMXjvhVe6aURkoIprsolLDTsoa9rJTwR86hwgSEehpjIGYLv8EK_EcFAE3BOmnZFI6_qEMrxlkY';
const privateVapidKey = 'RjoZtLkymwty8h3qH3E5p6UhymxhXEY5S6lRNQUpczM';

webpush.setVapidDetails('mailto:alexsotog82@gmail.com', publicVapidKey, privateVapidKey);

// Subscribe Route

app.post('/subscribe', (req,res) => {
    // Get push subscription object
    const subscription = req.body;

    // Send 201 - resource create
    res.status(201).json({})

    // Create a payload
    const payload = JSON.stringify({
        title: 'Push Test'
    })

    // Pass object  into send the notification
    webpush.sendNotification(subscription,payload).catch(error => console.error(error))
})



const PORT = 3000;

app.listen(PORT, ()=> console.log(`server initialize in port ${PORT}`))


// ./node_modules/.bin/web-push generate-vapid-keys