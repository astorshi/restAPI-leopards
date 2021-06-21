const router = require('express').Router();
const Good = require('../db/models/Good.model');

router
  .route('/')
  .get(async (req, res) => {
    const goods = await Good.find();
    res.json(goods);
  })
  .post(async (req, res) => {
    try {
      console.log('BODY===>>>', req.body);
      const newItem = await Good.create(req.body);
      console.log(newItem);
      res.json(newItem);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  })
  .delete(async (req, res) => {
    try {
      console.log(req.body.id);
      const deletedItem = await Good.findByIdAndDelete(req.body.id);
      console.log(' deletedItem ==>', deletedItem);
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500);
    }
  })
  .patch(async (req, res) => {
    try {
      console.log(req.body.id);
      const updItem = await Good.findByIdAndUpdate(
        req.body.id,
        { $inc: { price: -10 } },
        { new: true }
      );
      console.log(updItem);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  })
  .put(async (req, res) => {
    try {
      console.log(' PUT ===> BODY ', req.body);
      const { id, name, quantity, price } = req.body;
      const updItem = await Good.findByIdAndUpdate(
        id,
        { name: name, quantity: quantity, price: price },
        { new: true }
      );
      console.log(updItem);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

module.exports = router;
