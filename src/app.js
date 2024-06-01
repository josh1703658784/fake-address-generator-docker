'use strict';
const express = require('express');
const fakeAddress = require("fake-address-generator");

(function(){
  const app = express();
  const port = 3000;
  const params = {country: "us", sex: 0, state: 0, city: 0, zip: 0 }; // hardcode country, randomize others
  const states = ["AK", "DE", "MT", "NH", "OR"]; // hardcode state options

  app.get('/', (req, res) => {
    params.state = states[Math.floor(Math.random() * states.length)];
    fakeAddress.Generate(params, (err, resp) => {
      if(err) throw new Error('BROKEN');
      res.send(resp);
    })
  });

  app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`);
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({error:'Something broke!'});
  });

}());
