
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(function () {
      // Inserts seed entries
      return knex('todos').insert([
        { id: 1,
          title: 'go to store for milk',
          user_id: 1,
        },
        { id: 2,
          title: 'walk the dog',
          user_id: 2,
        },
        { id: 3,
          title: 'go to the gym',
          user_id: 3,
        }
      ]);
    });
};
