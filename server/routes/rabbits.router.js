const router = require('express').Router();
const pool = require('../modules/pool');

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