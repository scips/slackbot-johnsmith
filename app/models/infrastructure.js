var Infrastructure = function Infrastructure (){
    this.sites = {};
};

Infrastructure.prototype.update = function infrastructureUpdate(site, env, branch, hash, who) {
  if(!this.sites[site]) {
    this.sites[site] = {
      itt: {branch: null, hash: null, who: null},
      uat: {branch: null, hash: null, who: null},
      prd: {branch: null, hash: null, who: null}
    };
  }
  this.sites[site][env] = {branch: branch, hash: hash, who: who};
};

Infrastructure.prototype.get = function infrastructureGet(site) {
  if(this.sites[site]) {
    return this.sites[site];
  }
  return {};
};

module.exports = Infrastructure;