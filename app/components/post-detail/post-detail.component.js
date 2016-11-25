"use strict";
app.component('postDetail', {
    templateUrl: 'app/components/post-detail/post-detail.component.html',
    controller: function($http, Auth, $mdToast){
        var vm = this;
        vm.Auth = Auth;
        vm.$routerOnActivate = function(next){
            $http.get('http://localhost:3000/posts/' + next.params.id + '?_expand=user')
                .then(function(response){
                    vm.post = response.data;
                })
                .catch(function(error){
                    alert(error)
                });
            $http.get('http://localhost:3000/comments?postId=' + next.params.id + '&_expand=user')
                .then(function(response){
                    vm.comments = response.data;
                })
                .catch(function(error){
                    alert(error)
                });
            vm.comment = {
                postId: next.params.id,
                text: ''
            };
        };

        vm.addComment = function() {
            if(!Auth.isLoggedin) return false;
            vm.comment.userId = Auth.user.id;
            vm.comment.dateCreate = new Date();
            $http.post('http://localhost:3000/comments', vm.comment)
                .then(function(response){
                    vm.comment.text = '';
                    var comment = response.data;
                    comment.user = Auth.user;
                    vm.comments.push(comment);
                    vm.commentForm.$setPristine();
                    vm.commentForm.$setUntouched();
                })
                .catch(function(err){
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Не удалось добавить комментарий')
                            .position('bottom right')
                    );
                });
        };
    },
    controllerAs: 'vm'
});
