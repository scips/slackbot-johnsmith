var Infrastructure = function Infrastructure (){
    this.sites = {};
};

Infrastructure.prototype.update = function infrastructureUpdate(site, env, branch, hash) {
  if(!this.sites[site]) {
    this.sites[site] = {
      itt: {branch: null, hash: null},
      uat: {branch: null, hash: null},
      prd: {branch: null, hash: null}
    };
  }
  this.sites[site][env] = {branch: branch, hash: hash};
};

Infrastructure.prototype.get = function infrastructureGet(site) {
  if(this.sites[site]) {
    return this.sites[site];
  }
  return {};
};

module.exports = Infrastructure;