exports.up = function(knex, Promise) {
  return knex.schema.createTable('images', table => {
    table.increments();
    table.text('file_name').notNullable();
    table.float('lat').notNullable();
    table.float('lng').notNullable();
    table.integer('user_id').references('user.id').unsigned();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('images');
};
