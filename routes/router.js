const express = require("express");

const router = new express.Router();
const Products = require("../models/productSchema");

const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");

const authenticate = require("../middleware/authenticate");
//get productsdata api
router.get("/getproducts", async (req, res) => {
  try {
    const productsdata = await Products.find();
    // console.log(productsdata);
    res.status(201).json(productsdata);
  } catch (e) {
    // console.log("error" + e.message);
  }
});

// get individual data
router.get("/getproductsone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);

    const individualdata = await Products.findOne({ id: id });
    // console.log(individualdata+"individual data");
    res.status(201).json(individualdata);
  } catch (e) {
    res.status(400).json(individualdata);
    // console.log("error" + error.message);
  }
});

// register data

router.post("/register", async (req, res) => {
  const { fname, email, mobile, password, cpassword } = req.body;
  if (!fname || !email || !mobile || !password || !cpassword) {
    res.status(422).json({ error: "fill all the data" });
    // console.log("no data available");
    ``;
  }
  // console.log(cpassword);
  try {
    const preuser = await USER.findOne({ email: email });

    if (preuser) {
      // console.log(preuser);
      res.status(422).json({ error: "This email is already exist" });
    } else if (password !== cpassword) {
      res.status(422).json({ error: "password are not matching" });
    } else {
      const finaluser = new USER({
        fname,
        email,
        mobile,
        password,
        cpassword,
      });

      // yaha pe hasing krenge

      const storedata = await finaluser.save();
      // console.log(storedata + "user successfully added");
      res.status(201).json(storedata);
    }
  } catch (e) {
    // console.log("error the bhai catch ma for registratoin time" + e.message);
    // res.status(422).send(e);
  }
});

// login user api
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //   console.log(req.body);
  if (!email || !password) {
    res.status(400).json({ error: "fill all the data" });
  }
  try {
    const userlogin = await USER.findOne({ email: email });

    if (userlogin) {
      const ismatch = await bcrypt.compare(password, userlogin.password);
      // console.log(ismatch);

      if (!ismatch) {
        res.status(400).json({ error: "invalid details" });
      } 
    else {
      const token = await userlogin.generateAuthtoken();
      console.log(token);
      res.cookie("Amazonweb", token, {
        
        path: '/',
        expires: new Date(Date.now() + 86400000), // 24 hours from now
        httpOnly: true,
        secure: true,
        domain: '.netlify.app'
      });
      res.status(201).json(userlogin);
    }}
      else{

        res.status(400).json({ error: "invalid details" });
      }
    }
  catch (e) {
    res.status(400).json({ error: "invalid details" });
  }
});

// adding the data into cart
router.post("/addcart/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Products.findOne({ id: id });
    // console.log(cart + "cart value");

    const UserContact = await USER.findOne({ _id: req.userID });
    // console.log(UserContact);

    if (UserContact) {
      const cartData = await UserContact.addcartdata(cart);
      await UserContact.save();
      // console.log(cartData);
      res.status(201).json(UserContact);
    } else {
      res.status(401).json({ error: "invalid user" });
    }
  } catch (e) {
    res.status(401).json({ e: "invalid user" });
  }
});

// get cart details
router.get("/cartdetails", authenticate, async (req, res) => {
  try {
    const buyuser = await USER.findOne({ _id: req.userID });
    res.status(201).json(buyuser);
  } catch (error) {
    // console.log("error" + error);
  }
});

// get valid user
router.get("/validuser", authenticate, async (req, res) => {
  try {
    const validuserone = await USER.findOne({ _id: req.userID });
    res.status(201).json(validuserone);
  } catch (error) {
    // console.log("error" + error);
  }
});
// remove item from cart
router.delete("/remove/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    req.rootUser.carts = req.rootUser.carts.filter((cruval) => {
      return cruval.id != id;
    });
    req.rootUser.save();
    res.status(201).json(req.rootUser);
    // console.log("item remove");
  } catch (error) {
    // console.log("error" + error);
    res.status(400).json(req.rootUser);
  }
});

// logout user
router.get("/logout", authenticate, (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
      return curelem.token !== req.token;
    });

    res.clearCookie("Amazonweb", { path: "/" });
    req.rootUser.save();
    res.status(201).json(req.rootUser.tokens);
    // console.log("user logout");
  } catch (error) {
    // console.log("error for user logout");
  }
});

module.exports = router;
