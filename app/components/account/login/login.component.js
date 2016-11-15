"use strict";
app.component('loginComponent',{
    bindings: {
        $router: '<'
    },
    templateUrl: 'app/components/account/login/login.component.html',
    controller: function(Auth, $timeout){
        var vm = this;
        vm.error = false;
        vm.$routerOnActivate = function(){
            Auth.logout();
            vm.user = {
                email: '',
                password: ''
            };
        };
        vm.submit = function(){
            Auth.login(vm.user.email, vm.user.password)
                .then(function(){
                    vm.$router.navigate(['Posts', {id: 'my'}]);
                })
                .catch(function(){
                    vm.showErrorMessage();
                });
        };
        vm.showErrorMessage = function(){
            vm.error = true;
            $timeout(function(){
                vm.error = false;
            }, 2000);
        };
    },
    controllerAs: 'vm'
});