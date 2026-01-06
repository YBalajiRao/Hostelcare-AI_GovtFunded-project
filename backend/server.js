const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));

// In-memory storage
let complaints = [];
let complaintId = 1;

// Home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Submit complaint
app.post('/api/complaints', (req, res) => {
    const newComplaint = {
        id: complaintId++,
        studentName: req.body.studentName || 'Student',
        roomNumber: req.body.roomNumber || 'N/A',
        complaint: req.body.complaint,
        status: 'pending',
        createdAt: new Date()
    };
    complaints.push(newComplaint);
    console.log('New Complaint:', newComplaint.complaint);
    res.json({ message: 'Complaint submitted!' });
});

// Get all complaints
app.get('/api/complaints', (req, res) => {
    res.json(complaints);
});

// Update status
app.patch('/api/complaints/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const complaint = complaints.find(c => c.id === id);
    if (complaint) {
        complaint.status = req.body.status;
    }
    res.json({ message: 'Updated!' });
});

// Delete complaint
app.delete('/api/complaints/:id', (req, res) => {
    const id = parseInt(req.params.id);
    complaints = complaints.filter(c => c.id !== id);
    res.json({ message: 'Deleted!' });
});

// Start server
app.listen(3000, () => {
    console.log('');
    console.log('=================================');
    console.log('  HostelCare AI Server Running!');
    console.log('=================================');
    console.log('');
    console.log('Student Page: http://localhost:3000');
    console.log('Warden Page:  http://localhost:3000/warden.html');
    console.log('');
});