var recipes = require('../recipes.json');
var router = require('express').Router();


router.get('/', async (req, res) => {
    const {context} = req;
    const page = context && context.page || req.query.page
    const limit = context && context.limit || req.query.limit
    const skip = context && context.skip || req.query.skip || ((page-1) * limit)
    const search = context && context.searchTerm || req.query.q;
    let results = [];
     if (search) {
        results = recipes.filter(({name}) => name.match(search))
    } else {
        results = recipes
    }
    results = await results.slice(skip, (skip + limit))
    res.json({
        page: Number(page),
        limit: Number(limit),
        skip: Number(skip),
        search: search,
        data: results || []
    });
});

module.exports = router;

