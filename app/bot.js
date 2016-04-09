var Bot = function Bot() {
  var Botkit = require('botkit');
  this._infrastructure = null;
  this.controller = Botkit.slackbot();
  this.config = {};
};

Bot.prototype.configure = function botConfigure(config) {
  this.config = config;
}

Bot.prototype.infrastructure = function botInfrastructure(infrastructure){
  this._infrastructure = infrastructure;
};

Bot.prototype.init = function botInit() {
  this.bot = this.controller.spawn({
    token: this.config.slackBotToken
  });
  this.bot.startRTM(function(err,bot,payload) {
    if (err) {
      throw new Error('Could not connect to Slack');
    }
  });
  this.controller.hears(["status"],["direct_message","direct_mention","mention","ambient"],function(bot,message) {
    // do something to respond to message
    // all of the fields available in a normal Slack message object are available
    // https://api.slack.com/events/message
    this.bot.reply(message,'infrastructure: '+JSON.stringify(this._infrastructure));
  }.bind(this));
  this.controller.hears(["site"], ["direct_message","direct_mention","mention","ambient"],function(bot,message) {
    // try to find out which site we are talking about and return the current site status on all env
    var sites = message.text.match(/\/[^\/\s]+\/[^\/\s]+/g);
    for (var i = sites.length - 1; i >= 0; i--) {
      var siteData = this._infrastructure.get(sites[i]);
      this.bot.reply(message, sites[i]+': '+JSON.stringify(siteData));
    }
    // except if a specific env is requested
  }.bind(this));
  this.controller.hears(["please.*leave|leave.*please"], ["direct_message"], function(bot, message) {
    console.log('direct message received:', message);
    this.bot.say('/leave bye bye',message.channel);
  }.bind(this));
  this.controller.on('channel_joined',function(bot,message) {
    this.bot.reply(message, 'Thanks for inviting me, anytime you want me to leave, just kindly ask me to');
  }.bind(this));
};

module.exports = Bot;