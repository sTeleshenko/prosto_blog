'use strict';
app.component('mainComponent', {
    templateUrl: 'app/components/main/main.component.html',
    controller: function () {
        var vm = this;
    },
    controllerAs: 'vm',
    $routeConfig: [
        {path: '/...', name: 'Home', component: 'homeComponent', useAsDefault: true}
    ]
});