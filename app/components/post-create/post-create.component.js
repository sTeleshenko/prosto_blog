'use strict';
app.component('postCreateComponent', {
    templateUrl: 'app/components/post-create/post-create.component.html',
    controller: function($http, Auth, $mdDialog){
        var vm = this;
        vm.post = {
            title: '',
            categoryId: 0,
            image: '',
            body: '',
            likes: 0,
            dislikes: 0
        };
        vm.$onInit =function(){
            $http.get('http://localhost:3000/categories')
                .then(function(response){
                    vm.categories = response.data;
                })
                .catch(function(error){
                    console.log(error);
                });
        };
        vm.submit = function(){
            vm.post.userId = Auth.user.id;
            vm.post.dateCreate = new Date();
            vm.post.published = false;
            $http.post("http://localhost:3000/posts", vm.post)
                .then(function (response) {
                    $mdDialog.hide(response.data);
                })
                .catch(function (error) {
                    alert("error");
                });
        };
    },
    controllerAs: 'vm'
});