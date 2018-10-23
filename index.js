const express = require("express"); 

//--PARA USAR HANDLEBARS SE DEBE ESCRIBIR ESTO--//
//----------------------------------------------//
const consolidate = require("consolidate");     //
const hbs = require("handlebars");              //
//----------------------------------------------//

var app = express();

//--SE DEBE USAR CONSOLIDATE PARA QUE SE PUEDA USAR HBS-//
//-SE SETEAN LAS VISTAS CON HBS Y Y LOS VIEWS TEMPLATES-//
//---NO OLVIDAR PONER EL "." EN LA RUTA DE LA CARPETA---//
//------------------------------------------------------//
app.engine("hbs", consolidate.handlebars);              //
app.set("view engine", "hbs");                          //
app.set("views", "./views");                            //
//------------------------------------------------------//

//--SE DEFINE EL CSS COMO UN ARCHIVO STATICO PARA LEERLOS-//
//--SE CREA UNA RUTA VIRTUAL PARA LOS ARCHIVOS ESTATICOS--//
//EN PUBLIC ESTA EL CSS, EL JS Y DEMAS CARPERAS DE SOURCES//
app.use(express.static("public"));                        //
//--------------------------------------------------------//


app.get("/", function(req, res){
    res.render("index");
});

app.get("/tienda", function(req, res){
    res.render("tienda");
});

app.listen(5000, function(){
    console.log("Server Iniciado en Puerto 5000");
})