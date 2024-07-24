module.exports = {

  up: function(queryInterface, Sequelize) {

// Define dummy data for posts
    const posts = [
      {
        title: 'A silly post',
        content: 'Roses are red, violets are blue, I am a poet.',
        createdAt: new Date('2010/08/17 12:09'),
        updatedAt: new Date('2010/08/17 12:09')
      },
      {
        title: 'New technology',
        content: 'These things called "computers" are fancy.',
        createdAt: new Date('2011/03/06 15:32'),
        updatedAt: new Date('2011/03/06 15:47')
      }
    ];

// Insert posts into the database
    return queryInterface.bulkInsert('Posts', posts, {});
  },

  down: function(queryInterface, Sequelize) {

// Delete all posts from the database
    return queryInterface.bulkDelete('Posts', null, {});
  }
};