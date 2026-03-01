const db = require('./database');

const Item = {
    findOne: async (id) => {
        const result = await db.query(
            `SELECT items.*, categories.name as category_name
            FROM items
            LEFT JOIN categories ON items.category_id = categories.id
            WHERE items.id = $1`,
            [id]
        );
        return result.rows[0];
    }, 

    findAll: async () => {
        const result = await db.query(
            `SELECT items.*, categories.name as category_name
            FROM items
            LEFT JOIN categories ON items.category_id = categories.id
            ORDER BY title
            `
        );
        return result.rows;
    },

    findByCategory: async (CategoryId) => {
        const result = await db.query(
            `
            SELECT * FROM items
            WHERE category_id = $1
            ORDER BY title
            `, [CategoryId]
        );
        return result.rows;
    },

    create: async (bookData) => {
        const {
            title,
            author,
            year,
            isbn,
            description,
            category_id
        } = bookData;

        const result = await db.query(
            `
            INSERT INTO items
            (title, author, year, isbn, description, category_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
            `,
            [title, author, year, isbn, description, category_id]
        );
        return result.rows[0];
    },

    update: async (id, bookData) => {
        const {
            title,
            author,
            year,
            isbn,
            description,
            category_id
        } = bookData;

        const result = await db.query(
            `
            UPDATE items SET
            title = $1, author = $2, year = $3, isbn = $4, description = $5, category_id = $6
            WHERE id = $7 AND is_system = false
            RETURNING *
            `,
            [title, author, year, isbn, description, category_id, id]
        );
        return result.rows[0];
    },

    delete: async (id) => {
        const result = await db.query('DELETE FROM items WHERE id = $1 AND is_system = false RETURNING *', [id]);
        return result.rows[0];
    },
 
    search: async(term) => {
        const result = await db.query(
            `
            SELECT items.*, categories.name as category_name
            FROM items
            LEFT JOIN categories ON items.category_id = categories.id
            WHERE title ILIKE $1 OR author ILIKE $1
            ORDER BY title
            `,[`%${term}%`] 
        );
        return result.rows;
    },



};

module.exports = Item;