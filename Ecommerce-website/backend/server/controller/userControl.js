const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Userdb = require("../model/usermodel");

const productDatas = require("../model/model")


exports.userRegister = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }

    const userExists = await Userdb.findOne({ username }); // Check if user already exists
    if (userExists) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Userdb({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Registration failed");
  }
};





exports.getUser = (req, res) => {
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




// Login
exports.userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Userdb.findOne({ username });

    console.log("user=",user)

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET,
        {
          expiresIn: "1hr",
        }
      );


      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60,
      });


      res.setHeader("Authorization", token);
      console.log( "requested token=",token);

      res.status(200).json({ message: "welcome user", token });
    } else {
      res.status(401).send("Invalid username or password");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Login failed");
  }
};





exports.addToWish = async (req, res) => {
  try {
    const productId = req.body.id;

    console.log(productId)

    // Fetch the product by its ID using productDatas.findById
    const product = await productDatas.findById(productId);
    console.log(product)

    // If the product is not found, return a 404 response
    if (!product) {
      return res.status(404).json({ message: "Product not foundddd" });
    }

    // Retrieve the token from the request cookies
    const token = req.cookies.token;

    console.log("token=",token)

    // Verify the token and decode the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by their username in the database
    const user = await Userdb.findOne({ username: decoded.username });

    if (user.wishlist.includes(productId)) {
      return res
        .status(400)
        .json({ message: "product is already in wishlist" });
    }

    // Populate the 'wish' field of the user object before sending the response
    const updatedUser = await Userdb.findById(user._id).populate('wishlist');

    // Add the product to the user's wishlist
    user.wishlist.push(productId);

    // Save the updated user object with the new wishlist
    await user.save();

    // Send a 200 response with a success message and the updated user object
    res.status(200).json({
      message: "Product added to wish successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);

    // If there's an error, send a 500 response with an error message
    res.status(500).json({ error: "Server error", message: err.message });
  }
};


exports.getWish = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    console.log(id)

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
        res.status(500).send({
          message:
            err.message || "error occured while retriving user information",
        });
      });
  }
};


