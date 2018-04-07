const router = require('express').Router();
const pool = require('../modules/pool');

// creating a new rabbit on the rabbit table
router.post('/', (req,res) => {
    let rabbit = req.body;
    console.log('rabbit ADD in router called');
    let queryText = `INSERT INTO rabbit (name, description, altered, checked_in, owner_id)
                     VALUES ($1, $2, $3, $4, $5);`
    pool.query(queryText, [rabbit.name, rabbit.description, rabbit.altered, false, rabbit.owner_id]).then((result) => {
        const responseArray = result.rows;
        console.log(responseArray);
        res.send(result.rows);
    }).catch( (err) => {
        console.log('Error on GET in Router', err);
        res.sendStatus(500);
    });
});

// checking in the rabbit
router.put('/:id', (req,res) =>{
    console.log('PUT in checkin router', req.params.id);
    const rab = req.body;
    const id = req.params.id;
    let queryText = `UPDATE "rabbit" SET "checked_in" = 'true' 
                    WHERE "id" = $1;`;
    pool.query(queryText, [id]).then((response) => {
        res.sendStatus(201);
    }).catch((err) => {
        console.log('error in put checkin router', err);
        res.sendStatus(500);
    })
})

// checking out the rabbit
router.put('/checkout/:id', (req,res) =>{
    console.log('PUT in checkin router', req.params.id);
    const rab = req.body;
    const id = req.params.id;
    let queryText = `UPDATE "rabbit" SET "checked_in" = 'false' 
                    WHERE "id" = $1;`;
    pool.query(queryText, [id]).then((response) => {
        res.sendStatus(201);
    }).catch((err) => {
        console.log('error in put checkin/checkout router', err);
        res.sendStatus(500);
    })
})

module.exports = router;