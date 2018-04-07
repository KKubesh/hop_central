app.service('HopService', ['$http', 
function($http){
    console.log('HopService running in Service');
    let self = this;

    self.rab = { list: [] };
    self.own = { list: [] };

    // function gets the rabbits and joins owners
    self.getRab = function() {
        console.log('get rabbits function called in service');
        $http.get('/rabbits').then(function(response) {
            self.rab.list = response.data;
            console.log(response.data);
        }).catch(function(err){
            console.log('error in getRab', err);
        })
    }

    // function that gets all owners 
    self.getOwner = function() {
        console.log('get owners function called in service');
        $http.get('/new').then(function(response){
            self.own.list = response.data;
            console.log(response.data);
        }).catch(function(err){
            console.log('error in getOwner', err);
        })
        
    }

    // function that adds new owners
    self.addOwner = function(owner) {
        console.log('adding owner called in service');
            $http.post('/new', owner).then(function(response) {
            console.log('Owner successfully added', owner);
            self.getOwner();
        }).catch(function(err) {
            console.log('error in addOwner Service', err);
        })
    }

    //function that adds new rabbits
    self.addRab = function(rab) {
        console.log('checkin rabbit in!');
            $http.post('/checkin', rab).then(function(response) {
                console.log('Rabbit successfully checked in', rab);
                self.getRab();
                self.getOwner();               
            }).catch(function(err){
                console.log('error in addRab Service', err);                
            })
    }

    // function that deletes rabbits from the database
    self.delRab = function(rab) {
        console.log('called delRab in service', rab);
        $http.delete('/rabbits/' + rab.id).then(function(response){
            console.log(response);
            self.getRab();
        }).catch(function(err){
            console.log('Error in delRab service'. err);            
        })
    }

    // function that checks out rabbits upon pick-up
    self.checkRab = function(rab) {
        $http.put(`/checkin/${rab.rabbit_id}`).then(function(response) {
        }).catch(function(err){
            console.log('error in making put request/services', err);
        })
    }

    // function that checks out rabbits upon pick-up
    self.checkoutRab = function(rab) {
        $http.put(`/checkin/checkout/${rab.id}`).then(function(response) {
            self.getRab();
        }).catch(function(err){
            console.log('error in making put/checkout request/services', err);
        })
    }

    // functions are run for page load gathering existing data
    self.getRab();
    self.getOwner();
}])