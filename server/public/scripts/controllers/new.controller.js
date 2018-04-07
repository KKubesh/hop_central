app.controller('NewController', ['HopService',
function(HopService) {
    console.log('new controller loaded');
    let self = this;

    let newService = HopService;
    // functions used to display content and button events    
    self.addOwner = newService.addOwner;
    self.addRab = newService.addRab;
    self.getOwner = newService.getOwner;
    self.getRab = newService.getRab;
    // information being between via functions above    
    self.own = newService.own;
    self.rabbit = {altered: false};

}]);