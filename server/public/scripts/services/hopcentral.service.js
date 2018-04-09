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
                swal({
                    title: "New Owner!", 
                    text: `You added ${owner.name}!`,
                    button: "OK",
                    className: "hopBanner",
                    button: {
                        className: "albutton"
                    },
                });
                self.getOwner();
        }).catch(function(err) {
            console.log('error in addOwner Service', err);
        })
    }

    //function that adds new rabbits
    self.addRab = function(rab) {
        console.log('checkin rabbit in!', rab);
            $http.post('/checkin', rab).then(function(response) {
                console.log('Rabbit successfully checked in', rab);
                swal({
                    title: "New rabbit!", 
                    text: `You added ${rab.name}!`,
                    button: "OK",
                    className: "hopBanner",
                    button: {
                        className: "albutton"
                    },
                });
                self.getRab();
                self.getOwner();               
            }).catch(function(err){
                console.log('error in addRab Service', err);                
            })
    }

    // function that deletes rabbits from the database
    self.delRab = function(rab) {
        swal({
            title: `You sure you want to delete ${rab.name}`, 
            text: "You cannot undo!",
            className: "hopBanner",
            buttons: {
                cancel: true,
                confirm: true
             }
        }).then(function(isConfirm) {
            if (isConfirm == true) {
                $http.delete('/rabbits/' + rab.id).then(function(response){
                    console.log(response);
                    self.getRab();
        }).catch(function(err){
            console.log('Error in delRab service'. err);            
            })
        }
        })        
    }

        // function that deletes rabbits from the database
        self.delOwner = function(own) {
            swal({
                title: `You sure you want to delete ${own.name}`, 
                text: "You cannot undo!",
                className: "hopBanner",
                buttons: {
                    cancel: true,
                    confirm: true
                 }
            }).then(function(isConfirm) {
                if (isConfirm == true) {
                    $http.delete('/new/' + own.id).then(function(response){
                        console.log(response);
                        self.getOwner();
            }).catch(function(err){
                swal({
                    title: `It appears ${own.name} currently is the owner of a rabbit`, 
                    text: "You cannot delete until the rabbit is deleted first",
                    className: "hopBanner",
                    buttons: {
                        cancel: true,
                        confirm: true
                     }
                })
                console.log('Error in delRab service'. err);            
                })
            }
            })        
        }

    // function that checks out rabbits upon pick-up
    self.checkRab = function(rab) {
        $http.put(`/checkin/${rab.rabbit_id}`).then(function(response) {
            swal({
                title: `Rabbit Checked In!`,
                button: "OK",
                className: "hopBanner",
                button: {
                    className: "albutton"
                },
            });
            self.getRab();
        }).catch(function(err){
            console.log('error in making put request/services', err);
        })
    }

    // function that checks out rabbits upon pick-up
    self.checkoutRab = function(rab) {
        let rabbit = rab;
        swal({
            title: `You sure you want to check out ${rabbit.name}?`, 
            text: "You cannot undo!",
            className: "hopBanner",
            buttons: {
                cancel: true,
                confirm: true
             }
        }).then(function(isConfirm) {
            if (isConfirm == true) {
                $http.put(`/checkin/checkout/${rabbit.id}`).then(function(response) {
                self.getRab();
        }).catch(function(err){
            console.log('error in making put/checkout request/services', err);
            })
            }
        })
    }

    self.eName = function(rab) {
        console.log('edit profile function');
        let rabbit = rab;
        swal({
            title: `Edit ${rabbit.name}'s Name`, 
            text: "Name:",
            content: {
                element: "input",
                attributes: {
                    placeholder: "Edit Name",
                    type: "name",
                },
            },
            className: "hopBanner",
            buttons: {
                cancel: true,
                confirm: true
             }
        }).then(function(isConfirm) {
            console.log('this is isConfirm', isConfirm);
            
            if (isConfirm == true) {
                $http.put(`/rabbits/${rabbit.id}`).then(function(response) {
                self.getRab();
        }).catch(function(err){
            console.log('error in making put/checkout request/services', err);
            })
            }
        })
    }
        
    
    // functions are run for page load gathering existing data
    self.getRab();
    self.getOwner();
}])