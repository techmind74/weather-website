const request = require('request');

const forecast = (long, lat, callback) => {
    const url = 'https://api.darksky.net/forecast/9aaf1faa66a700f6bad97aa21abaacaf/' + long + ', ' + lat;
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined);
        } else if (body.error) {
            callback('Unable to find location.', undefined);
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precip: body.currently.precipProbability
            })
        }
    })
}


module.exports = {
    forecast: forecast
}