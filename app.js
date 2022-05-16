const express = require('express')
const bodyparser = require('body-parser')

const app = express();
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true })) // non chiaro


const port = 3000;
const host = "localhost";

let elencoLibri = [

    {

        titolo: "Harry Potter",
        ISBN: "123455",
        autore: "j.k rowling"
    },
    {

        titolo: "libro cuore",
        ISBN: "123456",
        autore: "edmondo de amicis"
    },
    {

        titolo: "maurizio costanzo biografia",
        ISBN: "123457",
        autore: "maurizio costanzo"
    },

    {

        titolo: "bibbia",
        ISBN: "123458",
        autore: "ignoto"
    }

];

app.listen(port, host, () => {          // 
    console.log(`DAJE SU http://${host}:${port}/`)
})

app.get("/libri/lista", (req, res) => {
    res.json(elencoLibri);
})


app.get("/libri/dettaglio/:ISBN", (req, res) => {       // for of da guardare
    for (let [idx, item] of elencoLibri.entries()) {
        if (item.ISBN == req.params.isbn) {
            res.json(item);
        }
    }

    res.json({})
})

app.post("/libri/inserisci", (req, res) => {

    let libro = {
        titolo: req.body.tito,
        ISBN: req.body.isbn,
        autore: req.body.aut
    };

    for (let [idx, item] of elencoLibri.entries()) {
        if (item.ISBN == req.params.ISBN) {
            res.json(
                {
                    status: "error"
                })
        }}
        elencoLibri.push(libro);

        res.json(
            {
                status: "success"
            }
        )
    }
)
app.delete("/libri/dettaglio/:ISBN", (req, res) => {
    for (let [idx, item] of elencoLibri.entries()) {
        if (item.ISBN == req.params.ISBN) {
            elencoLibri.splice(idx, 1)
            res.json({ status: "success" })
        }
    }

    res.json({
        status: "error",
        data: "item_not_found"
    })
})

app.put("/libri/dettaglio/:ISBN", (req, res) => {
    for (let [idx, item] of elencoLibri.entries()) {
        if (item.ISBN == req.params.ISBN) {

            item.titolo = req.body.tito;
            item.autore = req.body.aut;

            res.json({ status: "success" })
        }
    }

    res.json({
        status: "error",
        data: "item_not_found"
    })
})