const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');


router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.render('index', { employees });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.get('/add', (req, res) => {
  res.render('add');
});


router.post('/employees', async (req, res) => {
  try {
    const { EmployeeName, EmployeeDesignation, EmployeeLocation, Salary } = req.body;
    await Employee.create({ EmployeeName, EmployeeDesignation, EmployeeLocation, Salary });
    res.redirect('/');
  } catch (err) {
    res.status(400).send('Unable to create employee');
  }
});


router.get('/edit/:id', async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if(!emp) return res.redirect('/');
    res.render('edit', { employee: emp });
  } catch (err) {
    res.redirect('/');
  }
});


router.put('/employees/:id', async (req, res) => {
  try {
    const { EmployeeName, EmployeeDesignation, EmployeeLocation, Salary } = req.body;
    await Employee.findByIdAndUpdate(req.params.id, { EmployeeName, EmployeeDesignation, EmployeeLocation, Salary }, { runValidators: true });
    res.redirect('/');
  } catch (err) {
    res.status(400).send('Unable to update');
  }
});


router.delete('/employees/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    res.status(400).send('err');
  }
});

module.exports = router;
