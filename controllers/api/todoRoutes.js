const router = require("express").Router();
const { Todo, User } = require("../../models");
const auth = require("../../utils/auth");

const handlebars = 'todo';

//router.get('/', async(req, res) => {
router.get('/', auth, async(req, res) => {
   try {
      const dbData = await Todo.findAll({
         include: [{
           model: User,
           attributes: ['username']
         }],
         attributes: ['id', 'title', 'text', 'user_id']
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

//router.get('/:id', async(req, res) => {
router.get('/:id', auth, async(req, res) => {
   try {
      const dbData = await Todo.findOne({
         where: {
           id: req.params.id
         },
         include: [{
           model: User,
           attributes: ['username']
         }],
         attributes: ['id', 'title', 'text', 'user_id']
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

//router.post("/", async (req, res) => {
router.post("/", auth, async (req, res) => {
    try {
        const dbData = await Todo.create({
            user_id: req.body.user_id,
            title: req.body.title, 
            text: req.body.text
        });
        req.session.save(() => {
          res.status(200).json(dbData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

//router.put("/", async (req, res) => {
router.put("/", auth, async (req, res) => {
    try {
        const dbData = await Todo.update(
            {
               text: req.body.text,
               title: req.body.title,
               user_id: req.body.user_id
            },
            {
               where: {
                    id: req.body.id,
                    //user_id: req.session.user_id,
                }
            }
        );

        if (!dbData) {
            res.status(404).json({ message: "No todo found with this id!" });
            return;
        }

        req.session.save(() => {
            res.status(200).json(dbData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//router.delete("/", async (req, res) => {
router.delete("/", auth, async (req, res) => {
    try {
        const dbData = await Todo.destroy({
            where: {
                id: req.body.id
                //user_id: req.session.user_id,
            },
        });

        if (!dbData) {
            res.status(404).json({ message: "No todo found with this id!" });
            return;
        }

        res.status(200).json(dbData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
