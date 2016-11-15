'use strict';
app.component('postsListComponent', {
    templateUrl: 'app/components/posts-list/posts-list.component.html',
    bindings: {
        $router: '<'
    },
    controller: function ($http, $filter, Auth, $mdDialog) {
        var vm = this;
        vm.Auth = Auth;
        var key;
        vm.$routerOnActivate = function (next) {
            key = next.params.id;
            var query = '?';
            switch (key) {
                case '':
                {
                    var currentDate = new Date();
                    var queryMonth = currentDate.getMonth() > 0 ? currentDate.getMonth() - 1 : 11;
                    var queryYear = queryMonth !== 11 ? currentDate.getFullYear() : currentDate.getFullYear() - 1;
                    var queryDate = new Date(queryYear, queryMonth);
                    query += 'dateCreate_gte=' + $filter('date')(queryDate, 'yyyy-MM-dd');
                    query+='&published=true';
                    break;
                }
                case 'my':
                {
                    query += 'userId=' + Auth.user.id;
                }
            }
            query+='&_expand=user';
            query+='&_sort=dateCreate&_order=DESC';
            $http.get("http://localhost:3000/posts" + query)
                .then(function (response) {
                    vm.posts = response.data;
                })
                .catch(function (error) {
                    alert("error");
                });
        };

        vm.create = function(ev){
            var parentEl = angular.element(document.body);
            var createModal = $mdDialog.show({
                parent: parentEl,
                targetEvent: ev,
                template: '<post-create-component></post-create-component>',
                fullscreen: true,
                clickOutsideToClose: true,
                escapeToClose: true
            });
            createModal.then(function(post){
                if(key === 'my'){
                    $http.get('http://localhost:3000/posts/' + post.id + '?_expand=user')
                        .then(function(response){
                            vm.posts.unshift(response.data);
                        });
                } else  {
                    vm.$router.navigate(['Posts', {id: 'my'}]);
                }
            });
        }
    },
    controllerAs: 'vm'
});