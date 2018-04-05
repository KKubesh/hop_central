const router = require('express').Router();
const pool = require('../modules/pool');

router.get('/', (req,res) => {
    console.log('rabbit router called');
    let queryText = 'SELECT * FROM rabbit;'
    pool.query(queryText).then((result) => {
        const responseArray = result.rows;
        console.log(responseArray);
        res.send(result.rows);
    }).catch( (err) => {
        console.log('Error on GET in Router', err);
        res.sendStatus(500);
    });
});

module.exports = router;