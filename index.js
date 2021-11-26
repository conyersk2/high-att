const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const accountSid = "AC4650689f4351d6ed6d59cb8a1b5f9ec3";
const authToken = "1cc5806d2e64b5f1b97d624978182f28";

const client = new twilio(accountSid, authToken);

const MessagingResponse = require('twilio').twiml.MessagingResponse;

let randomNum = '';
let guessNum = '';
let gamesWon = parseInt(0);

let app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.post('/sms', function (request, response){
  const twiml = new MessagingResponse();

  switch(request.body.Body.toLowerCase())
  {
    case "new game":
      randomNum = Math.floor(Math.random() * 10) + 1;
      twiml.message('New game started. Guess a number between 1 and 10.');
      break;
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "10":
	guessNum = request.body.Body;
	if (guessNum == randomNum){
	  gamesWon += 1;
	  twiml.message("Congratulations, that is the correct number. Type 'New Game' to play again. Games won: ");
	  twiml.message(gamesWon);
	  break;
	}else if (guessNum < randomNum){
	  twiml.message("You guess is too low. Try guessing again");
	  break;
	}else if (guessNum > randomNum){
	  twiml.message("You guess is too high. Try guessing again");
	  break;
	}
    default:
      lastMessage = request.body.Body;
      twiml.message('You have registered your message as the last message. Type last to see the last');

  }

  response.writeHead(200, {'Content-Type' : 'text/xml'})
  response.end(twiml.toString());
});

app.listen(8000);