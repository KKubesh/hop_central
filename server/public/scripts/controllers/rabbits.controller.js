app.controller('RabController', ['HopService',
function(HopService) {
    console.log('rabbit/guest controller loaded');
    let self = this;

    let rabbitService = HopService;
    //adding new rabbit
    self.delRab = rabbitService.delRab;
    self.getRab = rabbitService.getRab;
    self.checkoutRab = rabbitService.checkoutRab;
    // information being sent between via functions above    
    self.rab = rabbitService.rab;

}]);