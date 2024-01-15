const Userdb = require("../model/usermodel");

exports.create = (req, res) => {
  //validation request
  if (!req.body) {
    res.status(400).send({ message: "content can not be empty" });
  }

  //new user
  const user = new Userdb({
    username: req.body.username,
    password: req.body.password,
    wishlist: req.body.wishlist,
    cart: req.body.cart,
  });

  //save user in the databse

  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "some error occured while creating a create opertion",
      });
    });
};


exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "not found with id" + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "error retriving user with id" + id });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res
          .status(500)
          .send({
            message:
              err.message || "error occured while retriving user information",
          });
      });
  }
};