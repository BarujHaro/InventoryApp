const pool = require('./pool');

const seedData = async () => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query('DELETE FROM items');
    await client.query('DELETE FROM categories');
    await client.query('ALTER SEQUENCE categories_id_seq RESTART WITH 1');
    await client.query('ALTER SEQUENCE items_id_seq RESTART WITH 1');

    const categories = [
      ['Fiction'],
      ['Science Fiction'],
      ['Horror'],
      ['Nonfiction'],
      ['Technology'],
      ['Children'],
    ];

    for (const [name] of categories) {
      await client.query(
        'INSERT INTO categories (name, is_system) VALUES ($1, true)',
        [name]
      );
    }

    const books = [
      ['One Hundred Years of Solitude', 'Gabriel García Márquez', 1967, '9780307350488', 'A family saga in Macondo', 1],
      ['1984', 'George Orwell', 1949, '9780451524935', 'Dystopian novel', 1],
      ['Dune', 'Frank Herbert', 1965, '9780441172719', 'Epic sci-fi', 2],
      ['Foundation', 'Isaac Asimov', 1951, '9780553293357', 'Galactic empire', 2],
      ['It', 'Stephen King', 1986, '9780670813025', 'Horror novel', 3],
      ['Drácula', 'Bram Stoker', 1897, '9780199564095', 'Classic vampire', 3],
      ['Sapiens', 'Yuval Noah Harari', 2011, '9780062316097', 'Human history', 4],
      ['Clean Code', 'Robert C. Martin', 2008, '9780132350884', 'Programming practices', 5],
      ['Eloquent JavaScript', 'Marijn Haverbeke', 2018, '9781593279509', 'JS intro', 5],
      ['The Little Prince', 'Antoine de Saint-Exupéry', 1943, '9780156012195', 'Children classic', 6],
    ];

    for (const book of books) {
      await client.query(
        `
        INSERT INTO items (
          title, author, year, isbn, description, category_id, is_system
        ) VALUES ($1, $2, $3, $4, $5, $6, true)
        `,
        book
      );
    }

    await client.query('COMMIT');
    console.log('Seed completed');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
  } finally {
    client.release();
    await pool.end();
  }
};

if (require.main === module) {
  seedData();
}

module.exports = { seedData };