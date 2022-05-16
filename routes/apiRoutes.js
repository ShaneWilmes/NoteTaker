const fs = require('fs');
const uuid = require('uuid');
const router = require('express').Router();

// Acquiring data for the note
router.get('/notes', (req, res) => {
    const data = fs.readFileSync('./db/db.json');
    res.json(JSON.parse(data));
});

// Posts the data to the website
router.post('/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json'));
    const newNote = req.body;
    newNote.id = uuid.v4();
    notes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(notes);
});

// Bonus:  adding a delete notes option

router.delete('/notes/:id', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json'))
    const deleteNote= notes.filter((eraseNote) => eraseNote.id !== req.params.id);
    fs.writeFileSync('./db/db.json', JSON.stringify(deleteNote));
    res.json(deleteNote);
});

module.exports = router;


