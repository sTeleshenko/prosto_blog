"use strict";
app.component('likeComponent', {
    templateUrl: 'app/components/like/like.component.html',
    bindings: {
        post: '='
    },
    controller: function(Auth, Like){
        var vm = this;
        vm.Auth = Auth;
        vm.Like = Like;
    },
    controllerAs: 'vm'
});