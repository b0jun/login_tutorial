const { User } = require("../../db/models");

module.exports = {
  signup: async (req, res, next) => {
    const { name, password, email } = req.body;
    try {
      const users = await User.findOrCreate({
        where: {
          email,
        },
        defaults: {
          name,
          password,
          email,
        },
      }).then(async ([user, created]) => {
        if (!created) {
          return res.status(409).send("Already exists user");
        }
        const data = await user.get({ plain: true });
        res.status(200).json(data);
      });
      res.status(201).json(users);
    } catch (error) {
      console.log(error);
      next(err);
    }
  },
  signin: async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(401).send("Unauthorized");
      return;
    }
    try {
      const result = await User.findOne({
        where: {
          email,
          password,
        },
      });
      if (result === null) {
        res.status(404).send("unvalid user");
      } else {
        res.status(200).json({ id: result.id });
      }
    } catch (error) {
      console.log(error);
      next(err);
    }
  },
  check: (req, res, next) => {
    res.send("hi");
  },
  logout: (req, res, next) => {
    res.send("hi");
  },
};
