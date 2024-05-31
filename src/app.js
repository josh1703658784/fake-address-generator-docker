'use strict';
const express = require('express');
const fakeAddress = require("fake-address-generator");

(function(){
  const app = express();
  const port = 3000;
  const params = {
    country: "us",
    sex: null,
  };

  app.get('/', (req, res) => {
    params.sex = Math.floor(Math.random()*100) % 2 ? "Female" : "Male";
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
