var chai = require('chai');
var should = chai.should();
var Infrastructure = require('../../app/models/infrastructure');

describe('infrastructure', function() {

  describe('constructor', function(){
    it('should have an empty sites list by default', function() {
      var infrastructure = new Infrastructure();
      infrastructure.sites.should.be.empty;
    });
  });

  describe('update', function(){
    it('should add an element if not exisiting or update it', function() {
      var infrastructure = new Infrastructure();
      infrastructure.sites.should.be.empty;
      infrastructure.update('site1', 'itt', 'branch', 'hash', 'scips');
      infrastructure.sites.should.be.eql({
        "site1": {
          "itt": {
            "branch": "branch",
            "hash": "hash",
            "who": "scips"
          },
          "prd": {
            "branch": null,
            "hash": null,
            "who": null
          },
          "uat": {
            "branch": null,
            "hash": null,
            "who": null
          }
        }
      });
      infrastructure.update('site1', 'itt', 'branch', 'hash2', 'hayabusa');
      infrastructure.sites.should.be.eql({
        "site1": {
          "itt": {
            "branch": "branch",
            "hash": "hash2",
            "who": "hayabusa"
          },
          "prd": {
            "branch": null,
            "hash": null,
            "who": null
          },
          "uat": {
            "branch": null,
            "hash": null,
            "who": null
          }
        }
      });
    });
  });

  describe('get', function(){
    it('should be able to get a specific site property once set', function() {
      var infrastructure = new Infrastructure();
      infrastructure.update('site1', 'itt', 'branch', 'hash', 'me');
      infrastructure.get('site2').should.be.empty;
      infrastructure.get('site1').should.be.eql({
          "itt": {
            "branch": "branch",
            "hash": "hash",
            "who": "me"
          },
          "prd": {
            "branch": null,
            "hash": null,
            "who": null
          },
          "uat": {
            "branch": null,
            "hash": null,
            "who": null
          }
        });
    });
    it('should be able to get a specific site property and to reflect update', function() {
      var infrastructure = new Infrastructure();
      infrastructure.update('site1', 'itt', 'branch', 'hash', 'scips');
      infrastructure.get('site1').should.be.eql({
          "itt": {
            "branch": "branch",
            "hash": "hash",
            "who": "scips"
          },
          "uat": {
            "branch": null,
            "hash": null,
            "who": null
          },
          "prd": {
            "branch": null,
            "hash": null,
            "who": null
          }
        });
      infrastructure.update('site1', 'uat', 'branch', 'hash', 'me');
      infrastructure.get('site1').should.be.eql({
          "itt": {
            "branch": "branch",
            "hash": "hash",
            "who": "scips"
          },
          "uat": {
            "branch": "branch",
            "hash": "hash",
            "who": "me"
          },
          "prd": {
            "branch": null,
            "hash": null,
            "who": null
          }
        });
    });
  });

});