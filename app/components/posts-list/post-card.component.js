"use strict";
app.component("postCardComponent", {
   templateUrl: "app/components/posts-list/post-card.component.html",
    bindings: {
        post: '='
    },
    controller: function(){
        var vm = this;
    },
    controllerAs: 'vm'
});