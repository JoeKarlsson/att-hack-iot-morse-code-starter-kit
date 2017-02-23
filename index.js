const express = require('express');
const app = express();
const Gpio = require('onoff').Gpio;
const sleep = require('sleep');
const bodyParser = require('body-parser');
const PORT = 3000;

// The connection to the LED is on the Raspberry Pis Gpio 17 pin
const led = new Gpio(17, 'out');

// Initialize the timers for the morse code
const _baseTime = 128000; //micro seconds
const sleepTime = _baseTime;
const btwCodes = _baseTime * 2;
const btwLetters = _baseTime * 4;
const btwWords = _baseTime * 8;

// static html files in public directory
app.use(express.static('./public'));

// Use body parser so we can read in text input from the website
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

// var text = (process.argv[2] ? process.argv[2] : '').toLowerCase();

// Mapping for english to morse code.
const MorseCode = {
   pattern: {
      'a': '._',
      'b': '_...',
      'c': '_._.',
      'd': '_..',
      'e': '.',
      'f': '.._.',
      'g': '__.',
      'h': '....',
      'i': '..',
      'j': '.___',
      'k': '_._',
      'l': '._..',
      'm': '__',
      'n': '_.',
      'o': '___',
      'p': '.__.',
      'q': '__._',
      'r': '._.',
      's': '...',
      't': '_',
      'u': '.._',
      'v': '..._',
      'w': '.__',
      'x': '_.._',
      'y': '_.__',
      'z': '__..',
      '1': '.____',
      '2': '..___',
      '3': '...__',
      '4': '...._',
      '5': '.....',
      '6': '_....',
      '7': '__...',
      '8': '___..',
      '9': '____.',
      '0': '_____'
   },

   // If the light is active - shut it off
   active: function(t) {
      led.writeSync(1);
   },

   // if the light is inactive - turn it on - duh
   inactive: function() {
      led.writeSync(0);
   }
};

// Function for making the LED light blink the morse code
const morseLED = ( text ) => {
  for(let i = 0; i < text.length; i++) {
     let _l = text[i];

     if(_l == ' ') { // if the char is a space
        sleep.usleep(btwWords);
     }
     else {
        let _c = MorseCode.pattern[_l].split('');
        sleep.usleep(btwLetters);
        console.log('Letter Starts >> ', _l);
        for(let j = 0; j < _c.length; j++) {
           console.log("code >> ", _c[j]);
           MorseCode.active();
           if(_c[j] == '.') {
              sleep.usleep(sleepTime);
              MorseCode.inactive();
              sleep.usleep(btwCodes);
           }
           else {
              sleep.usleep(sleepTime * 3);
              MorseCode.inactive();
              sleep.usleep(btwCodes);
           }
        }
     }
  };
};

app.route('/morse')
  .post((req, res) => {
    // Split the text input into an array of letters that we can read in
    console.log(req.body)
    const _t = req.body.message.split('');
    res.redirect('/');
    morseLED( _t );
  });

const server = app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
