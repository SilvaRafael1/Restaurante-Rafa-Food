const express = require("express");
const fs = require("fs");
const csv = require('csv-parser');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    const results = [];
    const delimiter = ';';
    // fs.readFile("glpi.csv", "utf-8", (err, data) => {
    //     if (err) console.error(err)
    //     data = data.split("\n")
    //     // data = data.split(",")
    //     // data = data.split(";")
    //     res.json(data)
    // })

    fs.createReadStream("glpi.csv")
    .pipe(csv({ separator: delimiter }))
    .on('data', (data) => results.push(data))
    .on('end', () => {
        console.log(JSON.stringify(results, null, 2));
        res.json(results[0])
  });
})

app.get("/coluna", (req, res) => {
    const delimiter = ';';

    function processCSVRow(data) {
        // Aqui você pode fazer o que quiser com os dados de cada linha
        const { Localização, Título, Entidade } = data; // Altere os nomes das variáveis de acordo com suas colunas
        console.log(`Coluna 1: ${Localização}, Coluna 2: ${Título}, Coluna 3: ${Entidade}`);
    }
    
    fs.createReadStream("glpi.csv")
      .pipe(csv({ separator: delimiter }))
      .on('data', processCSVRow)
      .on('end', () => {
        console.log('Leitura do CSV finalizada.');
      });
})

app.listen(3000, () => console.log("PORTA 3000"));