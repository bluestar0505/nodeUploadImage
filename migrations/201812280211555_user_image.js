exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_image', table => {
    table.increments();
    table.integer('user_id').references('user.id').unsigned();
    table.integer('image_id').references('images.id').unsigned();
    table.integer('thumb').unsigned().defaultTo(1); //1: up, 2:down

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user_image');
};
