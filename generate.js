module.exports = function(){
    var faker = require('faker');
    var _ = require('lodash');
    return {
        users: [],
        posts: _.times(50, function(i){
            return{
                id: i,
                user: {
                    id: Math.floor(Math.random() * 100),
                    name: faker.name.findName(),
                    avatar: faker.internet.avatar()
                },
                title: faker.lorem.sentence(),
                body: faker.lorem.paragraphs(),
                dateCreate: faker.date.past(),
                image: faker.image.abstract(),
                likes: Math.floor(Math.random() * 100),
                dislikes: Math.floor(Math.random() * 10)
            }
        })
    }
};