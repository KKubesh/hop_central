app.controller('RabController', ['HopService',
function(HopService) {
    console.log('rabbit/guest controller loaded');
    let self = this;

    let rabbitService = HopService;
    //functions used in /rabbits
    self.delRab = rabbitService.delRab;
    self.getRab = rabbitService.getRab;
    self.checkoutRab = rabbitService.checkoutRab;
    self.eName = rabbitService.eName;
    self.eDescription = rabbitService.eDescription;
    self.eHopHour = rabbitService.eHopHour;
    self.eOwner = rabbitService.eOwner;
    // information being sent between via functions above    
    self.rab = rabbitService.rab;

}]);