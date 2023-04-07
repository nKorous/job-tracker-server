
const express = require('express')
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json())

const PORT = process.env.PORT || 8888;

const db = require('./database')

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})

// GET
app.get('/jobs', (req, res) => {
    db.query('select * from jobs order by id')
        .then(response => res.status(200).send(response.rows))
        .catch(error => res.status(500).send(error.stack))
})

app.get('/jobNotes', (req, res) => {
    const jobKey = req.query.jobKey

    db.query('select * from notes where job_key = $1 order by id desc', [jobKey])
        .then(response => res.status(200).send(response.rows))
        .catch(error => res.status(500).send(error.stack))
})

app.get('/job', (req, res) => {
    const jobKey = req.query.jobKey

    db.query('select * from jobs where id = $1', [jobKey])
        .then(response => res.status(200).send(response.rows))
        .catch(error => res.status(500).send(error.stack))
})



// POST
app.post('/job', (req, res) => {
    const body = req.body

    db.query('insert into jobs (company, job_title, location, salary, application_status, site_applied, date_applied) values ($1, $2, $3, $4, $5, $6, $7)', [body.company, body.jobTitle, body.location, body.salary, body.applicationStatus, body.siteApplied, body.dateApplied])
        .then(response => res.status(200).send(response.rows))
        .catch(error => res.status(500).send(error.stack))
})

app.post('/note', (req, res) => {
    const body = req.body

    db.query('insert into notes (job_key, note_title, note_body) values ($1, $2, $3)', [body.jobKey, body.noteTitle, body.noteBody])
        .then(response => res.status(200).send(response.rows))
        .catch(error => res.status(500).send(error.stack))
})

// UPDATES THAT SHOULD BE PUT/PATCH INSTEAD OF POST BUT MEH...
app.post('/updateContactedBack', (req, res) => {
    const body = req.body

    db.query('update jobs set contacted_back = $1 where id = $2', [body.contactedBack, body.id])
        .then(response => res.status(200).send(response.rows))
        .catch(error => res.status(500).send(error.stack))
})

app.post('/updateApplicationStatus', (req, res) => {
    const body = req.body

    db.query('update jobs set application_status = $1 where id = $2', [body.applicationStatus, body.id])
        .then(response => res.status(200).send(response.rows))
        .catch(error => res.status(500).send(error.stack))
})