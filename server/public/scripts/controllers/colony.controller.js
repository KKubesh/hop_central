app.controller('ColonyController', ['HopService',
function(HopService) {
    console.log('colony controller loaded');
    let self = this;
    
    let colonyService = HopService;
    // functions used to display content and button events
    self.delRab = colonyService.delRab;
    self.getRab = colonyService.getRab;
    // information being sent between via functions above
    self.rab = colonyService.rab;

}]);