const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// set port for heroku and local
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log =`${now}: ${req.method} ${req.url}`;
    console.log(log);

    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    })

    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express</h1>');
    // res.send({
    //     name : 'Susanta',
    //     likes : [
    //         'Biking',
    //         'cities'
    //     ]
    // })

    res.render('home.hbs', {
        pageTitle: 'Home Page',
        // currentYear: new Date().getFullYear(), //Replaced with handlebar helper
        welcomeMessage: 'Welcome to node express'
    })
});

app.get('/about', (req, res) => {
    //send a static string in response
    // res.send('About Page');

    res.render('about.hbs', {
        pageTitle: 'About Page',
        // currentYear: new Date().getFullYear() //Replaced with handlebar helper
    });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'unable to handle request'
    })
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});