app.controller('RabController', ['HopService',
function(HopService) {
    console.log('rabbit controller loaded');
    let self = this;

    let rabbitService = HopService;
    //initial get
    self.getRab = rabbitService.getRab;

    self.rab = rabbitService.rab;

}]);