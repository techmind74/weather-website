const express = require('express');
const path = require('path');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

const hbs  = require('hbs');

const publicDirectoryPath = path.join(__dirname, '../public');

const viewsPath = path.join(__dirname, '../templates/views');

const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// User Defined Middleware
const myLogger = (req, res, next) => {
    console.log('LOGGED');
    next();
}

app.use(express.static(publicDirectoryPath));
// app.use(myLogger, express.static(publicDirectoryPath));

//app.use(express.static(publicDirectoryPath));

// End User defined Middleware

// app.get('/', (req, res) => {
//    res.send('index.html');

// //  res.send('<h1>Test</h1>');
// });

// app.get('/help', (req, res) => {
//     res.sendFile('help.html');
// });

// app.get('/about', (req, res) => {
//     res.sendFile('about.html');
// });
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Alan'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Alan Oberlander'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Section',
        help: 'Site help is down below...',
        name: 'Alan'
    });
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode.geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        //console.log(process.argv[2]);
        if (error) {
            return res.send({
            error
            }) 
        }
        // console.log('Error', error);
        // console.log('Data', data);

        forecast.forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        })
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Alan',
        errorMsg: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Alan Oberlander', 
        errorMsg: 'Page Not Found.'
    });
})

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});