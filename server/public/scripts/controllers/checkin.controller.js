app.controller('CheckController', ['HopService',
function(HopService) {
    console.log('check in controller loaded');
    let self = this;

    let rabbitService = HopService;

    self.getOwner = rabbitService.getOwner;
    self.getRab = rabbitService.getRab;
    self.checkRab = rabbitService.checkRab;

    self.rab = rabbitService.rab;
    self.own = rabbitService.own;
}]);