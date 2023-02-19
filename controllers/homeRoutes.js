const router = require("express").Router();
const { Todo, Note, User } = require("../models");

router.delete("/", async (req, res) => {
});

router.put("/", async (req, res) => {
});

router.post("/", async (req, res) => {
  try {
    const dbData = await Posts.create({
      user_id: req.session.loggedIn,
      title: req.body.title,
      content: req.body.content,
    });

    req.session.save(() => {
      res.status(200).json(dbData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {

    if (!req.session.logged_in) {
        res.redirect('/login');
        return;
      }

    let todos;
    try {
        const todosData = await Todo.findAll({
            where: {
                user_id: req.session.user_id,
            },
        });
        todos = todosData.map((todo) => todo.get({ plain: true }));

    } catch (error) {
        res.status(500).json(error);
    }

    console.log(req.session.user_id);
    console.log(todos);

    res.render("homepage", {
        logged_in: req.session.logged_in,
        todos: todos,
    });
});

router.get("/login", async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
      }

    res.render("login")
})

module.exports = router;
