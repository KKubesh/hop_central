app.controller('NewController', ['HopService',
function(HopService) {
    console.log('new controller loaded');
    let self = this;

    let newService = HopService;

    self.addOwner = newService.addOwner;
    self.addRab = newService.addRab;
    self.delRab = newService.delRab;
    self.getOwner = newService.getOwner;
    self.getRab = newService.getRab;
    self.addRab = newService.addRab;

    self.own = newService.own;
    self.rabbit = {altered: false};
}]);