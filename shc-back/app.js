const express = require("express")
const db = require("./db");
const app = express();
const cors = require("cors")
app.use(cors())

app.get("/ping", (req, res) => {
    res.send({ date: new Date().toISOString() })
})

app.get("/products", async (req, res) => {
    try {
        const sql = 'select * from products limit 10';
        const [result, fields] = await db.query(sql, []);
        res.send(result);
    }catch(err) {
        console.log(err);
        res.status(500).send({ error: err.message });
    }
})

app.get("/products/:id", async (req, res) => {
    try {
        const sql = 'select * from products where product_id = $1';
        const [result, fields] = await db.query(sql, [req.params.id]);
        res.send(result);
    }catch(err) {
        console.log(err);
        res.status(500).send({ error: err.message });
    }
})

app.listen(5555, () => {
    console.log('listen to 5555');
})