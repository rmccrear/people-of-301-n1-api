/*

Hello Explorer, you have been selected to be part of an early beta for a new system.
If you encounter any issues with running, packager, and language server (autocomplete, code diagnostics),
please email devex@replit.com or post on ask.replit.com
You can always turn off Explorer from https://replit.com/account#roles

Thank you!

*/

// import React from 'react';
// import express from 'express';

// import express
const express = require('express');

// create our webserver app
const app = express();


// load our .env file
// don't forget to npm install dotenv
require('dotenv').config()

// import data
// const data = require("data.json");

// define the port
const port = process.env.PORT || 3002;

const data = [
  {
    id: "1",
    name: "Robert",
    homeState: "Taiwan",
    favTea: "Green",
    favNum: 101,
    favCol: "Red"
  },
  {
    id: "3",
    name: "Bianca",
    homeState: "Florida",
    favTea: "Chai",
    favNum: 3,
    favColor: "Green",
  },
  {
    id: "21",
    name: "Justine",
    homeState: "Tennessee",
    favBook: "The Bluest Eye"
  },
  {
    id: "4",
    name: "Ajamu",
    homeState: "Louisiana",
    favDay: "My BDay"
  },
  {
    id: "5",
    name: "Gerard",
    homeState: "Louisiana",
    favGame: "Hollow Knight",
  },

  {
    id: "7",
    name: "Justin",
    homeState: "Tennessee"
  },
  {
    id: "6",
    name: "Andrea",
    homeState: "Tennessee",
    favColor: "Purple",
    favCar: "65 Chevy",
  },
  {
    id: "8",
    name: "Anya",
    homeState: "Mississippi"
  }
];


class Person {
  constructor(personObj) {
    this.id = personObj.id;
    this.name = personObj.name;
    this.homeState = personObj.homeState;
    if(personObj.favColor !== undefined) {
      this.favColor = personObj.favColor;
    }
  }
}

app.get('/', (request, response) => {
  response.send('Hello Everyone!');
});

app.get('/search-by-home-state-tn', (request, response) => {
  let homeState = "Tennessee";
  // {
  //    id: ...
  //    name: ...
  //    homeState: ...
  // }
  let peopleOfState = data.filter((p) => p.homeState === "Tennessee" )

  response.send(peopleOfState);
})

app.get('/search-by-home-state', (request, response) => {
  // get homeState query
  // ?homeState=Mississippi
  let homeState = request.query.homeState;
  let peopleOfState = data
                        .filter(p => p.homeState === homeState )
                        .map(   p => new Person(p)             );

  response.send(peopleOfState);
})

app.get('/find-by-id', (request, response, next) => {
  // get id from query
  // ?id=123
  console.log(request.query);
  let id = request.query.id;
  if(!id) {
    // return response.status(500).send({error: "please include an id"})
    return next(new Error("Id required in query!!!"));
  }
  let person = data.find((p) => p.id === id )
  response.status(200).send(new Person(person));
})




app.get('/robert', (request, response) => {
  let me = new Person(data[0]);
  response.send(me);
});


app.get('/andrea', (request, response) => {
  let me = new Person(data[6]);
  response.send(me);
});


app.get('/bianca', (request, response) => {
  let me = new Person(data[1]);
  response.send(me);
})

// path is /gerard
// callback function is the handler for the path
app.get('/gerard', (request, response) => {
  let me = new Person (data[7]);
  response.send("Hey Gerard");
})



app.get('/justin', (request, response) => {
  let me = new Person (data[7]);
  response.send(me);
})


app.get('/mu', (request, response) => {
  let me = new Person(data[3]);
  response.send(me);
})


app.get('/anya', (request, response) => {
  let me = new Person(data[7]);
  response.send(me);
})

app.get('/justine', (request, response) => {
  let me = data[2];
  response.send(me);
  // response.send('Hello Justine');
});


// catch all for not found
// this will be a 404.
app.get('*', (request, response) => {
  response.status(404).send("Not found!!!");
});


app.use((error, request, response, next) => {
  response.status(500).send({error: error.message});
});


// start the web app on port 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
