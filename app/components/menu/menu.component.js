'use strict';
app.component('menuComponent', {
    templateUrl: 'app/components/menu/menu.component.html',
    bindings: {
        $router: '<'
    },
    controller: function(Auth){
        var vm = this;
        vm.Auth = Auth;

        vm.logout = function(){
            Auth.logout();
            vm.$router.navigate(['Posts', {id: ''}]);
        }
    },
    controllerAs: 'vm'
});