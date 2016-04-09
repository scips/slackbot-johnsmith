var Rest = require('./app/rest');
var Bot = require('./app/bot');
var Infrastructure = require('./app/models/infrastructure');
var Config = require('./config');

var infrastructure = new Infrastructure();

var rest = new Rest();
rest.infrastructure(infrastructure);
rest.init();

var bot = new Bot();
bot.configure(Config);
bot.infrastructure(infrastructure);
bot.init();
