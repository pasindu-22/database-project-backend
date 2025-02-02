const db = require('../config/db');

const LoanInstallments = {
  getAll: async () => {
    try {
      const [rows] = await db.query('SELECT * FROM LoanInstallments');
      return rows;
    } catch (error) {
      throw error;
    }
  },

  create: async (Loan_ID, Branch_ID, Transaction_ID, DueDate, Value) => {
    try {
      const [result] = await db.query(
        'INSERT INTO LoanInstallments (Loan_ID, Branch_ID, Transaction_ID, DueDate, Value) VALUES (?, ?, ?, ?, ?)',
        [Loan_ID, Branch_ID, Transaction_ID, DueDate, Value]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  },

  createLoanInstallmentsSet: async (Loan_ID, Branch_ID, Loan_Period, Interest_Rate, Value, Start_date) => {
    // TODO : remove after testing as done by trigger
    try {
      // Call the stored procedure in MySQL
      await db.query('CALL CreateLoanInstallmentsSet(?, ?, ?, ?, ?, ?)', 
        [Loan_ID, Branch_ID, Loan_Period, Interest_Rate, Value, Start_date]);
    } catch (error) {
      throw new Error(`Error creating loan installments: ${error.message}`);
    }

    // try {
    //   // Calculate monthly interest rate
    //   const monthlyInterestRate = Interest_Rate / 1200;
    //   // Calculate number of payments (months)
    //   const numberOfPayments = Loan_Period;

    //   // Calculate monthly installment using the formula for an amortizing loan
    //   const monthlyInstallment = (Value * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

    //   // Create loan installments
    //   const installments = [];
    //   for (let i = 1; i <= numberOfPayments; i++) {
    //     const dueDate = new Date(Start_date);
    //     dueDate.setMonth(dueDate.getMonth() + i); // Set due date for each installment
    //     installments.push({
    //       Loan_ID,
    //       Branch_ID,
    //       Transaction_ID: null, // Assuming Transaction_ID is not provided
    //       DueDate: dueDate,
    //       Value: monthlyInstallment.toFixed(2) // Round to 2 decimal places
    //     });
    //   }

    //   // Save each installment to the database
    //   for (const installment of installments) {
    //     await LoanInstallments.create(
    //       installment.Loan_ID,
    //       installment.Branch_ID,
    //       installment.Transaction_ID,
    //       installment.DueDate,
    //       installment.Value
    //     );
    //   }
    // } catch (error) {
    //   throw error;
    // }
  },

  getById: async (Installment_ID) => {
    try {
      const [rows] = await db.query('SELECT * FROM LoanInstallments WHERE Installment_ID = ?', [Installment_ID]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  update: async (Installment_ID, updates) => {
    const { Loan_ID, Branch_ID, Transaction_ID, DueDate, Value } = updates;
    try {
      const [result] = await db.query(
        'UPDATE LoanInstallments SET Loan_ID = ?, Branch_ID = ?, Transaction_ID = ?, DueDate = ?, Value = ? WHERE Installment_ID = ?',
        [Loan_ID, Branch_ID, Transaction_ID, DueDate, Value, Installment_ID]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  },

  delete: async (Installment_ID) => {
    try {
      const [result] = await db.query('DELETE FROM LoanInstallments WHERE Installment_ID = ?', [Installment_ID]);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  },

  getByLoanId: async (Loan_ID) => {
    try {
      const [rows] = await db.query('SELECT * FROM LoanInstallments WHERE Loan_ID = ?', [Loan_ID]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  getLate: async (Manager_ID) => {
    try {
      const [rows] = await db.query('SELECT * FROM LoanInstallments WHERE Branch_ID = branchId_by_managerId(?) AND Transaction_ID IS NULL AND DueDate < CURDATE()', [Manager_ID]);
      
      return rows;
    } catch (error) {
      throw error;
    }
  },

  makePayment: async (Installment_ID, Account_ID, Amount) => {
    // TODO : make procedure

    console.log(Installment_ID, Account_ID, Amount);
    try {
      // Call the stored procedure for making a payment
      const [result] = await db.query(
          'CALL MakeLoanPayment(?, ?, ?)',
          [Installment_ID, Account_ID, Amount]
      );

      // Check the affected rows (successful if procedure completes without error)
      console.log(result);
      return result;
  } catch (error) {
      throw new Error(`Payment failed: ${error.message}`);
  }

    // try {
    //   // First, check if the installment exists
    //   const [installment] = await db.query(
    //     'SELECT * FROM LoanInstallments WHERE Installment_ID = ?',
    //     [Installment_ID]
    //   );

    //   // If installment not found, throw an error
    //   if (installment.length === 0) {
    //     throw new Error('Installment not found.');
    //   }

    //   // Check if the installment is already paid (Transaction_ID is not NULL)
    //   if (installment[0].Transaction_ID !== null) {
    //     throw new Error('Installment already paid.');
    //   }

    //   // Insert the transaction record for the payment
    //   const [transaction] = await db.query(
    //     'INSERT INTO Transaction (FromAccount, ToAccount, Date, Value, Type) VALUES (?, 1, NOW(), ?, \'Loan Payment\')',
    //     [Account_ID, Amount]
    //   );

    //   const Transaction_ID = transaction.insertId;

    //   // Update the installment to set the Transaction_ID
    //   const [result] = await db.query(
    //     'UPDATE LoanInstallments SET Transaction_ID = ? WHERE Installment_ID = ?',
    //     [Transaction_ID, Installment_ID]
    //   );

    //   return result.affectedRows;
    // } catch (error) {
    //   throw error;
    // }
  }
};

module.exports = LoanInstallments;