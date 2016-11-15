"use strict";
app.component('registerComponent', {
    bindings: {
        $router: '<'
    },
    templateUrl: 'app/components/account/register/register.component.html',
    controller: function(Auth, $timeout){
        var vm = this;
        vm.isRegistered = false;
        vm.error = false;
        vm.$routerOnActivate = function(){
            Auth.logout();
            vm.user = {
                name: '',
                email: '',
                password: '',
                avatar: '',
                confirmation: ''
            };
        };
        vm.submit = function(){
            var user = angular.copy(vm.user);
            delete user.confirmation;
            Auth.register(user)
                .then(function(response){
                    vm.$router.navigate(['Posts', {id: ''}]);
                })
                .catch(function(error){
                    vm.showErrorMessage(error);
                });
        };
        vm.showErrorMessage = function(error){
            if(error.message === 'isRegistered'){
                vm.isRegistered = true;
            } else {
                vm.error = true;
            }
            $timeout(function(){
                vm.isRegistered = false;
                vm.error = false;
            }, 2000);
        };
    },
    controllerAs: 'vm'
});