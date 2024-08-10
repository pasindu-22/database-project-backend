const Loan = require('../models/loanModel');

exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.getAll();
    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createLoan = async (req, res) => {
  const { Branch_ID, Customer_ID, LoanPeriod, InterestRate, Date, LoanValue, Application_ID } = req.body;
  try {
    const loanId = await Loan.create(Branch_ID, Customer_ID, LoanPeriod, InterestRate, Date, LoanValue, Application_ID);
    res.status(201).json({ Loan_ID: loanId, Branch_ID, Customer_ID, LoanPeriod, InterestRate, Date, LoanValue, Application_ID });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLoanById = async (req, res) => {
  const { id } = req.params;
  try {
    const loan = await Loan.getById(id);
    if (loan) {
      res.json(loan);
    } else {
      res.status(404).json({ message: 'Loan not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLoan = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const affectedRows = await Loan.update(id, updates);
    if (affectedRows) {
      res.json({ message: 'Loan updated successfully' });
    } else {
      res.status(404).json({ message: 'Loan not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteLoan = async (req, res) => {
  const { id } = req.params;
  try {
    const affectedRows = await Loan.delete(id);
    if (affectedRows) {
      res.json({ message: 'Loan deleted successfully' });
    } else {
      res.status(404).json({ message: 'Loan not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};