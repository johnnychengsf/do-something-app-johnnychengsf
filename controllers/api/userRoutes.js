const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
    try {
        const dbData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = dbData.dataValues.id;
            req.session.logged_in = true;

            res.status(200).json(dbData);
        });
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post("/login", async (req, res) => {
    try {
        const dbData = await User.findOne({
            where: { email: req.body.email },
        });

        if (!dbData) {
            res.status(400).json({
                message: "Incorrect email or password invalid.",
            });
            return;
        }

        const validPassword = await dbData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({
                message: "Incorrect email or password invalid.",
            });
            return;
        }
        req.session.save(() => {
            req.session.user_id = dbData.dataValues.id;
            req.session.logged_in = true;

            res.json({ user: dbData, message: "You are now logged in!" });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
