const db = require('../config/db');

const Employee = {
  getAll: async () => {
    try {
      const [rows] = await db.query('SELECT * FROM Employee');
      return rows;
    } catch (error) {
      throw error;
    }
  },

  create: async (Branch_ID) => {
    try {
      const [result] = await db.query('INSERT INTO Employee (Branch_ID) VALUES (?)', [Branch_ID]);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  },

  getById: async (ID) => {
    try {
      const [rows] = await db.query('SELECT * FROM Employee WHERE ID = ?', [ID]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  update: async (ID, updates) => {
    const { Branch_ID } = updates;
    try {
      const [result] = await db.query('UPDATE Employee SET Branch_ID = ? WHERE ID = ?', [Branch_ID, ID]);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  },

  delete: async (ID) => {
    try {
      const [result] = await db.query('DELETE FROM Employee WHERE ID = ?', [ID]);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Employee;