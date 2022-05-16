const express = require("express");
const bodyparser = require("body-parser");



const app = express();



//TOLGO L'UGUALE
app.use  (bodyparser.json())
app.use  (bodyparser.urlencoded({ extended: true }))

//dichiaro dove trovo le cose 

const port = 3000;
const host = "localhost";

//creo un oggetto che conterrebbe i nostri dati

let libreria = [
    {
        isbn: "123456",
        autore: "Maccio Capatonda",
        titolo: "Libro"        
    },
    {
        isbn: "654123",
        autore: "Tre semplici passi",
        titolo: "Fabio Volo"
        
    },
    {
        isbn: "987123",
        autore: "Giorgio Faletti",
        titolo: "Io uccido"
    }
];
//verifica dell'avvenuta connessione alla porta e all'host prima dichiarati

app.listen(port, host, () => {

    console.log(`sono in ascolto alla porta ${port} dell' ${host}`);
})

//se arriva una richista get (da postman) 
app.get("/biblioteca/lista", (req, res) => {

    res.json(libreria);
});

app.get("/biblioteca/dettaglio/:isbn", (req,res) => {

    for(let [idx,item] of libreria.entries()) {

        if(res.isbn == req.params.isbn) {
            res.json(item);
        }
    }

    res.json({item});
})


//----------------------------------------------------AGGIUNGI LIBRO ----------------------------------------

app.post("/biblioteca/inserisci", (req,res) => {

let libro = {
            isbn : req.body.isbn,
            autore : req.body.autore,
            titolo : req.body.titolo
        }
    
        //definisco una booleana come false
        let bool = false;
    
        // se l'oggetto inserito ha un elemento (in questo caso isbn) è gia presente, non lo aggiungo nell'array ma mando messaggio d'errore
        for (let [idx,item] of libreria.entries()){
    
           //se il libro inserito è gia presente, la boolenana diventa true e non aggiunge il libro in array libreria 
    
            if (req.body.isbn == item.isbn) {
                bool = true
                res.json ({Status:"error"})
            }
    
            //se la booleana rimane false, il libro inserito non è presente in libreria e quindi lo aggiunge
    
        }
        
        if (bool == false) {
            libreria.push(libro)
            res.json({status:"success"})
        } 
    }); 


    //  ---------------------------------- ELIMINA LIBRO ---------------------------------


    app.delete("biblioteca/dettaglio/:isbn", (req,res) => {

        for (let [idx,item] of libreria.entries()){
            
            if(item.isbn == req.body.isbn) {
            libreria.splice(idx,1);
            res.json(item);
            }
        }

        res.json({
            status:"Errore",
            data: "Data_Not_Found"
        })
    })