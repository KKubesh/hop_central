app.service('HopService', ['$http', 
function($http){
    console.log('HopService running in Service');
    let self = this;

    self.rab = { list: [] };

    self.getRab = function() {
        console.log('get rabbits function called in service');
        $http.get('/rabbits').then(function(response) {
            self.rab.list = response.data;
            console.log(response.data);
            
        }).catch(function(err){
            console.log('error in getRab', err);
            
        })
    }

    self.getRab();
}])