app.controller('CheckController', ['HopService',
function(HopService) {
    console.log('check in controller loaded');
    let self = this;

    let rabbitService = HopService;
    // functions used to display content and button events    
    self.getOwner = rabbitService.getOwner;
    self.getRab = rabbitService.getRab;
    self.checkRab = rabbitService.checkRab;
    // information being sent between via functions above    
    self.rab = rabbitService.rab;
    self.own = rabbitService.own;
}]);