const router = require('express').Router();
const pool = require('../modules/pool');

// function gets the rabbits and joins owners
router.get('/', (req, res) => {
    console.log('GET /rabbits & owner');
    const queryText = `SELECT "r"."name", 
                              "r"."description", 
                              "r"."altered",
                              "r"."checked_in",
                              "r"."id",
                              "o"."name" as "owner_name"
                       FROM "rabbit" as "r" LEFT JOIN "owner" as "o" 
                       ON "r"."owner_id" = "o"."id";`;
    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log('ERROR SELECTING Rabbits - GET /rabbits -', error);
        res.sendStatus(500);
    });
});

// edits the name of rabbit
router.put('/:id', (req,res) =>{
    console.log('PUT in checkin router', req.params.id);
    const rab = req.body;
    const id = req.params.id;
    let queryText = `UPDATE "rabbit" SET "name" = $1 
                    WHERE "id" = $2;`;
    pool.query(queryText, [id, rab.name]).then((response) => {
        res.sendStatus(201);
    }).catch((err) => {
        console.log('error in put checkin router', err);
        res.sendStatus(500);
    })
})

// deletes rabbits all together
router.delete('/:id', (req,res) => {
    console.log('DELETE /rabbits in router');
    let id = req.params.id;
    console.log(id);
    let rab = req.body;
    const queryText = `DELETE FROM "rabbit" WHERE "id" = $1;`
    pool.query(queryText, [id]).then((response) => {
        console.log(response);
        res.sendStatus(201);
    }).catch((err) => {
        res.sendStatus(500);
    });
});

module.exports = router;