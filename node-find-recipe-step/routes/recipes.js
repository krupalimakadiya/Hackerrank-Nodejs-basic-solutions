var recipes = require('../recipes.json');
var router = require('express').Router();
var recipes = require('../recipes.json');

router.get('/step/:id', (req, res) => {
  const { id } = req.params;

  if ((id && isNaN(id)) || !id) {
    return res.status(400).send("NOT_FOUND");
  }
  // find recipe step
  const recipe = recipes[+id - 1];

  if (!recipe) {
    return res.status(400).send("NOT_FOUND");
  }

  let { elapsedTime = '' } = req.query;
  if (!elapsedTime) {
    elapsedTime = 0;
  }
  elapsedTime = +elapsedTime;

  let stop = false;
  const stepIndex = recipe.timers.reduce((prev, currentTime, index) => {
    if (!stop) {
      if (currentTime >= elapsedTime) {
        stop = true;
      }
      return index;
    }

    return prev;
  }, 0);

  res.json({
    index: stepIndex
  });
});

module.exports = router;
