'use strict';
const FACEBOOK_ACCESS_TOKEN = 'EAAbPT27MpnUBAOTQz4SycjMTqJCCOaA5zvhzvzyZBY3YrYUy7lXRQnO9RKcp8TMyc2jqAZBZCxoyspKT4ZCZBX21GZBw8xgqZAVTLu5ZBshU3rW8OZAjJBu6lB0MPyyiwOFZAkk6fbbeLx0X2zr4V1JPNigCobrSwioXjHIWydEecPWgZDZD';
//const machine_url = '../carrusel1.JPG';
const machine_url = 'http://www.packagingequipment.es/12Automatic/2-1.jpg';
const API_AI_TOKEN = '1f5e146444b740f69146b962bf48262e';
const apiAiClient = require('apiai')(API_AI_TOKEN);

const request = require('request');



const sendTextMessage = (senderId, text) => {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: { text },
        }
    });
};

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;

    const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'crenteria_co'});

    apiaiSession.on('response', (response) => {
        const result = response.result.fulfillment.speech;

        sendTextMessage(senderId, result);
    });

    apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
};