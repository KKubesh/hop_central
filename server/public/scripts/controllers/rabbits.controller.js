app.controller('RabController', ['HopService',
function(HopService) {
    console.log('rabbit/guest controller loaded');
    let self = this;

    let rabbitService = HopService;
    //adding new rabbit
    self.addRab = rabbitService.addRab;
    self.delRab = rabbitService.delRab;
    self.getOwner = rabbitService.getOwner;
    self.getRab = rabbitService.getRab;
    self.addRab = rabbitService.addRab;
    self.checkoutRab = rabbitService.checkoutRab;

    self.rab = rabbitService.rab;

}]);