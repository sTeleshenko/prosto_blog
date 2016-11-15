'use strict';
app.service('Auth', function ($http) {
    var vm = this;
    var storedUser = JSON.parse(localStorage.getItem('user'));
    vm.user = storedUser ? storedUser : {};
    vm.isLoggedin = vm.user.hasOwnProperty('id');
    vm.login = function(email, password){
        return $http.get('http://localhost:3000/users?email=' + email + '&password=' + password)
            .then(function(response){
                if(response.data.length){
                    var user = response.data[0];
                    localStorage.setItem('user', JSON.stringify(user));
                    vm.user = user;
                    vm.isLoggedin = true;
                } else {
                    vm.logout();
                    throw new Error();
                }
            });
    };
    vm.register = function(user){
        return $http.get('http://localhost:3000/users?email=' + user.email)
            .then(function(response){
                if(!response.data.length){
                    return $http.post('http://localhost:3000/users', user);
                }
                throw new Error('isRegistered');
            });
    };
    vm.logout = function(){
        localStorage.removeItem('user');
        vm.user = {};
        vm.isLoggedin = false;
    }
});