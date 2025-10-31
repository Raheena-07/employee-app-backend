const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  EmployeeName: { type: String, required: true },
  EmployeeDesignation: { type: String, required: true },
  EmployeeLocation: { type: String, required: true },
  Salary: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);
