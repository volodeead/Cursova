import express from 'express';
import * as brain from 'brain.js';
import fs from 'fs';
import neatCsv from 'neat-csv';
import { convertCSVToArray } from 'convert-csv-to-array';
import converter from 'convert-csv-to-array';
import { resourceLimits } from 'worker_threads';
import csv from 'csv-parser'
import cors from 'cors';

var tD = [];
var trainData = [];

const PORT = 5000;
var result = []

const app = express();

app.use(cors());

app.listen(PORT, () => console.log('Start'))

app.get('/', (req, res) => {

    fs.createReadStream('D:/Курсова/cursova2/mushrooms____1650287485 (1) (1).csv')
        .pipe(csv())
        .on('data', (data) => tD.push(data))
        .on('end', () => {
            console.log('END')
            res.status(200).json('complite');
        })
})

app.get('/testData', (req, res) => {

    for (let i = 0; i < tD.length; i++) {

        trainData.push({
            input: [
                parseInt(tD[i]["1f"]),
                parseInt(tD[i]["1x"]), parseInt(tD[i]["1b"]), parseInt(tD[i]["2s"]), parseInt(tD[i]["2y"]),
                parseInt(tD[i]["2f"]), parseInt(tD[i]["3n"]), parseInt(tD[i]["3b"]), parseInt(tD[i]["3c"]),
                parseInt(tD[i]["3g"]), parseInt(tD[i]["3r"]), parseInt(tD[i]["3p"]), parseInt(tD[i]["3u"]),
                parseInt(tD[i]["3e"]), parseInt(tD[i]["3w"]), parseInt(tD[i]["3y"]), parseInt(tD[i]["4"]),
                parseInt(tD[i]["5n"]), parseInt(tD[i]["5f"]), parseInt(tD[i]["5ather"]), parseInt(tD[i]["6"]),
                parseInt(tD[i]["7c"]), parseInt(tD[i]["7w"]), parseInt(tD[i]["8"]), parseInt(tD[i]["9k"]),
                parseInt(tD[i]["9n"]), parseInt(tD[i]["9b"]), parseInt(tD[i]["9h"]), parseInt(tD[i]["9g"]),
                parseInt(tD[i]["9r"]), parseInt(tD[i]["9o"]), parseInt(tD[i]["9p"]), parseInt(tD[i]["9u"]),
                parseInt(tD[i]["9e"]), parseInt(tD[i]["9w"]), parseInt(tD[i]["9y"]), parseInt(tD[i]["10"]),
                parseInt(tD[i]["11b"]), parseInt(tD[i]["11c"]), parseInt(tD[i]["11u"]), parseInt(tD[i]["11e"]),
                parseInt(tD[i]["11z"]), parseInt(tD[i]["11r"]), parseInt(tD[i]["11?"]), parseInt(tD[i]["12s"]),
                parseInt(tD[i]["12k"]), parseInt(tD[i]["12ather"]), parseInt(tD[i]["13s"]), parseInt(tD[i]["13k"]),
                parseInt(tD[i]["13ather"]), parseInt(tD[i]["14n"]), parseInt(tD[i]["14b"]), parseInt(tD[i]["14c"]),
                parseInt(tD[i]["14g"]), parseInt(tD[i]["14o"]), parseInt(tD[i]["14p"]), parseInt(tD[i]["14e"]),
                parseInt(tD[i]["14w"]), parseInt(tD[i]["14y"]), parseInt(tD[i]["15n"]), parseInt(tD[i]["15b"]),
                parseInt(tD[i]["15c"]), parseInt(tD[i]["15g"]), parseInt(tD[i]["15o"]), parseInt(tD[i]["15p"]),
                parseInt(tD[i]["15e"]), parseInt(tD[i]["15w"]), parseInt(tD[i]["15y"]), parseInt(tD[i]["16"]),
                parseInt(tD[i]["17w"]), parseInt(tD[i]["17o"]), parseInt(tD[i]["17n"]), parseInt(tD[i]["17y"]),
                parseInt(tD[i]["18"]), parseInt(tD[i]["19c"]), parseInt(tD[i]["19e"]), parseInt(tD[i]["19f"]),
                parseInt(tD[i]["19l"]), parseInt(tD[i]["19n"]), parseInt(tD[i]["19p"]), parseInt(tD[i]["19s"]),
                parseInt(tD[i]["19z"]), parseInt(tD[i]["20k"]), parseInt(tD[i]["20n"]), parseInt(tD[i]["20b"]),
                parseInt(tD[i]["20h"]), parseInt(tD[i]["20r"]), parseInt(tD[i]["20o"]), parseInt(tD[i]["20u"]),
                parseInt(tD[i]["20w"]), parseInt(tD[i]["20y"]), parseInt(tD[i]["21a"]), parseInt(tD[i]["21c"]),
                parseInt(tD[i]["21n"]), parseInt(tD[i]["21s"]), parseInt(tD[i]["21v"]), parseInt(tD[i]["21y"]),
                parseInt(tD[i]["22g"]), parseInt(tD[i]["22l"]), parseInt(tD[i]["22m"]), parseInt(tD[i]["22p"]),
                parseInt(tD[i]["22u"]), parseInt(tD[i]["22w"]), parseInt(tD[i]["22d"])],

            output: [parseInt(tD[i]["1p"])]
        })
    }

    const net = new brain.NeuralNetwork({
        errorThresh: 0.01,
        iterations: 20000000,
        hiddenLayers: [105],
        log: (stats) => console.log(stats),
        logPeriod: 10,
        learningRate: 0.001
    });

    net.train(trainData, {
        timeout: Infinity, // the max number of milliseconds to train for --> number greater than 0
    });

    //0
    console.log(net.run([0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0]))

    //1
    console.log(net.run([1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]));

    //1
    console.log(net.run([1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0]));

    //0
    console.log(net.run([1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1]));

    //0
    console.log(net.run([1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1]));

    //1 final
    console.log(net.run([0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]));

    //0
    console.log(net.run([0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0]));

res.status(200).json(net.toJSON());


})

app.get('/trained/:elem', (req, res) => {

    (async () => {

        const net = new brain.NeuralNetwork();
        const jsonFile = fs.readFileSync('net.json');
        const json = JSON.parse(jsonFile);
        net.fromJSON(json);

        var el = [];

        for (let i = 0; i < req.params.elem.length; i++) {
            el.push(parseInt(req.params.elem[i]));
        }

        console.log(net.run(el));

        var ret = net.run(el)

        res.status(200).json(ret[0]);

    })();



})


