const router = require('express').Router();
const { Note, User } = require("../../models");
const auth = require("../../utils/auth");

const handlebars = 'note';

router.get('/', auth, async(req, res) => {
   try {
      const dbData = await Note.findAll({
         include: [{
           model: User,
           attributes: ['username']
         }],
         attributes: ['id', 'text', 'user_id']
      });

      items = dbData.map((item) =>
        item.get({ plain: true })
      );
      /*

      res.render(handlebars, {
        items
      });
*/
      res.send(items);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.get('/:id', auth, async(req, res) => {
   try {
      const dbData = await Note.findOne({
         where: {
           id: req.params.id
         },
         include: [{
           model: User,
           attributes: ['username']
         }],
         attributes: ['id', 'text', 'user_id']
       });
      const item = dbData.get({ plain: true });
/*
      res.render(handlebars, {
         item
       });
*/
      res.send(item);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});
// router.post('/', sync(req, res) => {
router.post('/', auth, async(req, res) => {
   try {
     const dbData = await Note.create({
         user_id: req.body.user_id,
         text: req.body.text
     });
 
     req.session.save(() => {
       res.status(200).json(dbData);
     });
   } catch (err) {
     console.log(err);
     res.status(500).json(err);
   }
});

//router.put('/', async(req, res) => {
router.put('/', auth, async(req, res) => {
  try {
   const dbData = await Note.update(
      {
         text: req.body.text,
         user_id: req.body.user_id
      },
      {
         where: {
            id: req.body.id,
            //user_id: req.session.user_id,
         }
      }
   );

   req.session.save(() => {
     res.status(200).json(dbData);
   });
 } catch (err) {
   console.log(err);
   res.status(500).json(err);
 }
});

router.delete('/', auth, async(req, res) => {
  try {
   const dbData = await Note.destroy(
     {
       where: {
         id: req.body.id,
         //user_id: req.session.user_id,
      }
     }
   );

   req.session.save(() => {
     res.status(200).json(dbData);
   });
 } catch (err) {
   console.log(err);
   res.status(500).json(err);
 }
});

module.exports = router