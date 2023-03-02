import express from 'express'
import nodemailer from 'nodemailer'
import twilio from 'twilio'
import __dirname from './utils.js'

const TWILIO_ACCOUN_SID = 'AC2e2a8660adede115f63ddca901e5ade8'
const TWILIO_AUTHO_TOKEN = '5a75419b1cc39425f679e00d77926e9b'
const TWILIO_SMS_NUMBER = '+12765331891'


const app = express()
const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'r2coderhouse@gmail.com',
        pass: 'sihkgnjcdurcwqzt'
    }
})
const client = twilio(TWILIO_ACCOUN_SID, TWILIO_AUTHO_TOKEN)

app.get('/sms', async (req, res) => {
    const result = await client.messages.create({
        body: 'Tanjiro is the best!!',
        from: TWILIO_SMS_NUMBER,
        to: '+573163386191'
    })
    console.log(result);

    res.send('SMS sent')
})

app.get('/mail', async(req, res) => {
    const result = await transport.sendMail({
        from: 'r2coderhouse@gmail.com',
        to: 'r2coderhouse@gmail.com',
        subject: 'Correo de Tanjiro',
        html: `
            <div>
                <h1>Este es el correo de Tanjiro Kamado!!! 🗡</h1>
                <img src="cid:tanjiro1" />
            </div>
        `,
        attachments: [{
            filename: 'tanjiro-1.jpeg',
            path: __dirname + '/images/tanjiro_1.jpeg',
            cid: 'tanjiro1'
        },{
            filename: 'tanjiro-2.jpg',
            path: __dirname + '/images/tanjiro-2.jpg',
            cid: 'tanjiro2'
        }]
    })

    console.log(result);

    res.send('The mail was sent!')
})


app.listen(8080)