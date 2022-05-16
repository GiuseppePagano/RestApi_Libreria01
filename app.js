const express = require("express")
const bodyparser = require("body-parser")

const app = express();
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

const porta = 3000;
const host = "localhost"

let elencoLibri = [
    {
        titolo: "pipo",
        autore: "pipo pipa",
        isbn: "abc123"
    },
    {
        titolo: "pipa",
        autore: "pipa pipa",
        isbn: "abc1234"
    },
    {
        titolo: "pipipipi",
        autore: "popopo",
        isbn: "abc12345"
    },
    {
        titolo: "patata",
        autore: "pata",
        isbn: "abc123456"
    }
]

app.listen(porta, host, () => {
    console.log("Sono in ascolto! ")
})

// http://localhost:3000/stud/lista
app.get("/lib/lista", (req, res) => {
    res.json(elencoLibri);
})

// http://localhost:3000/lib/dettaglio
// con questo codice andiamo a ricuperare un libro specifico con il isbn passato in ingresso
app.get("/lib/dettaglio/:isbn", (req, res) => {
    for(let [idx, item] of elencoLibri.entries()){
        if(item.isbn == req.params.isbn){
            res.json(item);
        }
    }

    res.json({})
})

// inserimento
app.post("/lib/inserisci", (req,res) => {

    let libro = {
        autore : req.body.aut,
        titolo : req.body.tit,
        isbn : req.body.isb
    }
        
            //definisco una booleana come false
    let bool = false;
        
            // se l'oggetto inserito ha un elemento (in questo caso isbn) è gia presente, non lo aggiungo nell'array ma mando messaggio d'errore
    for (let [idx,item] of elencoLibri.entries()){
        
               //se il libro inserito è gia presente, la boolenana diventa true e non aggiunge il libro in array libreria 
        
        if (req.body.isb == item.isbn) {
            bool = true
            res.json ({Status:"error"})
        }
        
                //se la booleana rimane false, il libro inserito non è presente in libreria e quindi lo aggiunge
        
    }
            
    if (bool == false) {
        elencoLibri.push(libro)
        res.json({status:"success"})
    } 
});

app.delete("/lib/dettaglio/:isbn", (req, res) => {
    for(let [idx, item] of elencoLibri.entries()){
        if(item.isbn == req.params.isbn){
            elencoLibri.splice(idx, 1)
            res.json({status: "success"})
        }
    }

    res.json({
        status: "error", 
        data: "item_not_found"
    })
})




app.put("/lib/dettaglio/:isbn", (req, res) => {
    for(let [idx, item] of elencoLibri.entries()){
        if(item.isbn == req.params.isbn){
            
            item.titolo = req.body.tit;
            item.autore = req.body.aut;

            res.json({status: "success"})
            return;
        }
    }

    res.json({
        status: "error", 
        data: "item_not_found"
    })
})



