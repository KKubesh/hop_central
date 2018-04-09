const router = require('express').Router();
const pool = require('../modules/pool');

// function adds in the owners to owner table
router.post('/', (req,res) => {
    console.log('owner ADD in router called');
    console.log(req.body);
    let owner = req.body;
    let queryText = `INSERT INTO owner ("name", "contact")
                     VALUES ($1, $2);`
    pool.query(queryText, [owner.name, owner.contact]).then((result) => {
        const responseArray = result.rows;
        console.log(responseArray);
        res.send(result.rows);
    }).catch( (err) => {
        console.log('Error on POST in new Router', err);
        res.sendStatus(500);
    });
});

// function gets the names of the owners and joins rabbits
router.get('/', (req,res) => {
    console.log('owner GET in router called');
    let owner = req.body;
    let queryText = `SELECT "o".*, count("r") as "current_rab" 
                     FROM "owner" as "o" LEFT JOIN "rabbit" as "r" 
                     ON "o"."id" = "r"."owner_id"
                     GROUP BY "o"."id";`
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch ((err) => {
        console.log('Error on GET in new Router', err);
        res.sendStatus(500);
    })
})

// deletes owner
router.delete('/:id', (req,res) => {
    console.log('DELETE /rabbits in router');
    let id = req.params.id;
    console.log(id);
    let rab = req.body;
    const queryText = `DELETE FROM "owner" WHERE "id" = $1;`
    pool.query(queryText, [id]).then((response) => {
        console.log(response);
        res.sendStatus(201);
    }).catch((err) => {
        res.sendStatus(500);
    });
});

module.exports = router;