const db = require('./database');

const Category = {

    findAll: async () => {
        const result = await db.query(`SELECT * FROM categories ORDER BY name`);
        return result.rows; 
    },

    findById: async (id) => {
        const result = await db.query(`SELECT * FROM categories WHERE id = $1`, [id]);
        return result.rows[0];
    },

    create: async (name) => {
        const result = await db.query(`INSERT INTO categories (name) VALUES ($1) RETURNING *`, [name]);
        return result.rows[0];
    },

    update: async (id, name) => {
        const result = await db.query(
            `UPDATE categories 
            SET name = $1 
            WHERE id = $2 AND is_system = false
            RETURNING *`,
            [name, id]
        );
        return result.rows[0];
    },

    delete: async (id) => {
        try{
            const result = await db.query(
                `DELETE FROM categories 
                WHERE id = $1 AND is_system = false
                RETURNING *`, [id]);
            return result.rows[0];
        }catch(error){throw error;}
    },

    countBooks: async (categoryId) => {
        const result = await db.query(
            `SELECT COUNT(*) FROM items WHERE category_id = $1`,
            [categoryId]
        );
        return parseInt(result.rows[0].count);
    },


};

module.exports = Category;