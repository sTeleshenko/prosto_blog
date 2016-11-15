'use strict';
app.component('homeComponent', {
    templateUrl: 'app/components/home/home.component.html',
    bindings: {
        $router: '<'
    },
    controller: function () {
        var vm = this;
    },
    controllerAs: 'vm',
    $routeConfig: [
        {path: '/:id', name: 'Posts', component: 'postsListComponent', useAsDefault: true},
        {path: '/register', name: 'Register', component: 'registerComponent'},
        {path: '/login', name: 'Login', component: 'loginComponent'}
    ]
});