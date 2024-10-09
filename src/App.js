import React, { useState } from "react";
import "./App.css";
import "./index.css";

function App() {
  // Initial state with no transactions, and income/expense set to zero
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);

  // Add new transaction
  const addTransaction = () => {
    const newTransaction = { id: Date.now(), text, amount: parseFloat(amount) };
    setTransactions([newTransaction, ...transactions.slice(0, 5)]); // Keep last 3 transactions
    updateBalance(parseFloat(amount));
    setText(""); // Clear input fields
    setAmount(0);
  };

  // Update income/expense based on the amount added
  const updateBalance = (amount) => {
    if (amount > 0) {
      setIncome((prev) => prev + amount);
    } else {
      setExpense((prev) => prev + Math.abs(amount));
    }
  };

  // Delete transaction and update income/expense accordingly
  const deleteTransaction = (id, amount) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
    if (amount > 0) {
      setIncome((prev) => prev - amount);
    } else {
      setExpense((prev) => prev - Math.abs(amount));
    }
  };

  // Reset all values to zero
  const restartApp = () => {
    setTransactions([]);
    setIncome(0);
    setExpense(0);
  };

  return (
    <div className="container">
      <div className="title">
        <h3>Expense Tracker</h3>
      </div>
      <div className="balance">
        <p>YOUR BALANCE</p>
        <h1>${income - expense}</h1>
      </div>
      <div className="balance-table">
        <div className="income">
          <h3>INCOME</h3>
          <h3 className="plus">${income}</h3>
        </div>
        <div className="income">
          <h3>EXPENSE</h3>
          <h3 className="minus">${expense}</h3>
        </div>
      </div>
      <div className="history">
        <h3>HISTORY</h3>
        <ul className="list">
          {transactions.map((transaction) => (
            <li
              key={transaction.id}
              className={transaction.amount > 0 ? "plus" : "minus"}
            >
              {transaction.text}
              <span>${transaction.amount}</span>
              <button
                className="delete-btn"
                onClick={() =>
                  deleteTransaction(transaction.id, transaction.amount)
                }
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="new-transaction">
        <h3>ADD NEW TRANSACTION</h3>
        <h4>TEXT</h4>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="enter text..."
        />
        <h4>AMOUNT</h4>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="enter amount..."
        />
        <button type="submit" className="btn" onClick={addTransaction}>
          Add transaction
        </button>
        <button className="btn restart-btn" onClick={restartApp}>
          Restart
        </button>
      </div>
    </div>
  );
}

export default App;
