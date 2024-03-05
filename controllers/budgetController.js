const express = require("express")

function validateForm(req, res, next) {
  if (!req.body.item_name || !req.body.category || !req.body.date || !req.body.from || !req.body.amount ) 
    res.status(400).json({ message: "Invalid Inputs" });
  else next();
}

const transactions = express.Router()

let transactionsArray = require("../models/budget.model.js")

transactions.get('/', (req, res) => {
    res.json({ transactions: transactionsArray })
})

transactions.get("/:id", (req, res) => {
  const { id } = req.params;

  const transaction = transactionsArray.find((transaction) => transaction.id === +id);

  res.json({ transaction });
});

transactions.post('/', validateForm, (req, res) => {
const newId = transactionsArray.length > 0 ? Math.max(...transactionsArray.map(transaction => transaction.id)) + 1 : 1;
req.body.id = newId;
transactionsArray.push(req.body);
  
res.json({ transactions: transactionsArray });
});

transactions.put("/:id", (req, res) => {
const { id } = req.params;

const transactionsIndex = transactionsArray.findIndex((log) => log.id === +id);

if (transactionsIndex > -1) transactionsArray[transactionsIndex] = req.body;

res.json({ transactions: transactionsArray });
});

transactions.delete("/:id", (req, res) => {
const { id } = req.params;

transactionsArray = transactionsArray.filter((transaction) => transaction.id !== +id);

res.json({ transactions: transactionsArray });
});

module.exports = transactions