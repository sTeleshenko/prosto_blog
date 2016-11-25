"use strict";
app.service('Like', function(Auth, $http, $mdToast){
    var vm = this;
    vm.hasLike = function(post, value) {
        if(!Auth.isLoggedin) return false;
        for (var i = 0; i < post.likes.length; i++){
            if(post.likes[i].userId == Auth.user.id && post.likes[i].value === value){
                return true
            }
        }
        return false;
    };

    vm.setLike = function(post, value){
        if(!Auth.isLoggedin) return false;
        var index;
        for (var i = 0; i < post.likes.length; i++){
            if(post.likes[i].userId == Auth.user.id){
                index = i;
                break;
            }
        }
        var _post = angular.copy(post);
        delete _post.user;
        delete _post.id;
        var indexTypeOf = typeof  index;
        if(indexTypeOf === 'number'){
            if(value === post.likes[index].value){
                _post.likes.splice(index, 1);
            } else {
                _post.likes[index].value = value;
            }
        } else {
            _post.likes.push({
                userId: Auth.user.id,
                value: value
            });
        }
        $http.put('http://localhost:3000/posts/' + post.id, _post)
            .then(function(response){
                post.likes = response.data.likes;
            })
            .catch(function(error){
                var message = 'Не удалось ';
                if(value && indexTypeOf === "number" && !post.likes[index].value ||
                    value && indexTypeOf !== "number"){
                    message += 'лайкнуть';
                } else if(!value && indexTypeOf === "number" && post.likes[index].value ||
                    !value && indexTypeOf !== "number"){
                    message += 'дислайкнуть';
                } else if(value){
                    message += 'убрать лайк';
                } else {
                    message += 'убрать дислайк';
                }
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(message)
                        .position('bottom right')
                );
            });
    };

});