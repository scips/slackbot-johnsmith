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
      infrastructure.update('site1', 'itt', 'branch', 'hash');
      infrastructure.sites.should.be.eql({
        "site1": {
          "itt": {
            "branch": "branch",
            "hash": "hash"
          },
          "prd": {
            "branch": null,
            "hash": null
          },
          "uat": {
            "branch": null,
            "hash": null
          }
        }
      });
      infrastructure.update('site1', 'itt', 'branch', 'hash2');
      infrastructure.sites.should.be.eql({
        "site1": {
          "itt": {
            "branch": "branch",
            "hash": "hash2"
          },
          "prd": {
            "branch": null,
            "hash": null
          },
          "uat": {
            "branch": null,
            "hash": null
          }
        }
      });
    });
  });

  describe('get', function(){
    it('should be able to get a specific site property once set', function() {
      var infrastructure = new Infrastructure();
      infrastructure.update('site1', 'itt', 'branch', 'hash');
      infrastructure.get('site2').should.be.empty;
      infrastructure.get('site1').should.be.eql({
          "itt": {
            "branch": "branch",
            "hash": "hash"
          },
          "prd": {
            "branch": null,
            "hash": null
          },
          "uat": {
            "branch": null,
            "hash": null
          }
        });
    });
    it('should be able to get a specific site property and to reflect update', function() {
      var infrastructure = new Infrastructure();
      infrastructure.update('site1', 'itt', 'branch', 'hash');
      infrastructure.get('site1').should.be.eql({
          "itt": {
            "branch": "branch",
            "hash": "hash"
          },
          "uat": {
            "branch": null,
            "hash": null
          },
          "prd": {
            "branch": null,
            "hash": null
          }
        });
      infrastructure.update('site1', 'uat', 'branch', 'hash');
      infrastructure.get('site1').should.be.eql({
          "itt": {
            "branch": "branch",
            "hash": "hash"
          },
          "uat": {
            "branch": "branch",
            "hash": "hash"
          },
          "prd": {
            "branch": null,
            "hash": null
          }
        });
    });
  });

});