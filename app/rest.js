var Rest = function Rest() {
  var Deploy = require('./models/deploy');
  var express = require('express');
  this.app = express();
  this._infrastructure = null;
  var bodyParser = require('body-parser');
  
  this.app.use(bodyParser.urlencoded({extended: true}));
  this.app.use(bodyParser.json());

  this.app.post('/deploy', function(req, res){
    if(req.body && req.body.site && req.body.env && req.body.branch && req.body.hash) {
      this._infrastructure.update(req.body.site, req.body.env, req.body.branch, req.body.hash);
    }
    res.json(this._infrastructure);
  }.bind(this));
};

Rest.prototype.init = function restInit() {
  this.app.listen(5000);
};

Rest.prototype.infrastructure = function restInfrastructure(infrastructure){
  this._infrastructure = infrastructure;
};

module.exports = Rest;