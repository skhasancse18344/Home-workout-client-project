const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { query } = require("express");
const port = process.env.PORT || 5000;

//Add Form file to server and  send a link via multer

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "_" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({
  storage: storage,

  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png|gif|webp/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimeType && extname) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
}).single("image");

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

//Connect MongoDB

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yalqvm0.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//Server Side Code Start from here

async function run() {
  try {
    //Create Client
    const userCollection = client.db("workout").collection("allUsers");
    const AllPost = client.db("workout").collection("AllPost");
    const AllCategory = client.db("workout").collection("AllCategory");
    const savedWorkoutCollection = client.db("workout").collection("savedWorkout");

    //User Sign UP

    app.post("/signup", async (req, res) => {
      const { username, email, password } = req.body;
      console.log(email);
      const existingUser = await userCollection.findOne({ email: email });
      console.log(existingUser);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await userCollection.insertOne({
        email: email,
        password: hashedPassword,
        username: username,
      });

      const token = jwt.sign(
        { email: result.email, id: result._id },
        process.env.SECRET_KEY
      );
      res.status(201).json({ user: result, token: token });
    });

    //User Sign In

    app.post("/login", async (req, res) => {
      const { email, password } = req.body;
      const existingUser = await userCollection.findOne({ email: email });

      if (!existingUser) {
        return res.status(400).json({ error: "User does not exist" });
      }
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
      const token = jwt.sign(
        {
          email: existingUser.email,
          id: existingUser._id,
          name: existingUser.username,
          height: existingUser.height,
          weight: existingUser.weight,
          image: existingUser.image,
        },
        process.env.SECRET_KEY
      );
      res.status(200).json({ user: existingUser, token: token });
    });

    // Find Login User information By Token
    app.get("/findUser/:token", async (req, res) => {
      let token = req.params.token;
      await jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(400).json({ error: err });
        }
        res.status(200).json({ user: decoded });
      });
    });
    //Add Post
    app.post("/addPost", upload, async (req, res) => {
      try {
        const date = new Date();
        const newPost = {
          userName: req.body.userName,
          userEmail: req.body.userEmail,
          title: req.body.title,
          description: req.body.description,
          muscleGroupId: req.body.muscleGroupId,
          image: req.file.path,
          postDate: date,
        };

        const result = await AllPost.insertOne(newPost);
        res.send(result);
      } catch (err) {}
    });
    app.post("/addPost", upload, async (req, res) => {
      try {
        const date = new Date();
        const newPost = {
          userName: req.body.userName,
          userEmail: req.body.userEmail,
          title: req.body.title,
          description: req.body.description,
          muscleGroupId: req.body.muscleGroupId,
          image: req.file.path,
          postDate: date,
        };

        const result = await AllPost.insertOne(newPost);
        res.send(result);
      } catch (err) {}
    });

    //Get All Post
    app.get("/getAllPost", async (req, res) => {
      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);
      const search = req.query.search;
      const category = req.query.category;
      const query = {};
      if (search) {
        query.title = { $regex: search, $options: "i" }; // Case-insensitive search using regex
      }
      if (category) {
        query.muscleGroupId = category;
      }

      const result = await AllPost.find(query)

        .skip(page * size)
        .limit(size)
        .sort({ postDate: -1 })
        .toArray();
      const count = await AllPost.estimatedDocumentCount();
      res.status(200).json({ count, result });
    });

    //Get My All Post
    app.get("/getMyAllPost/:email", async (req, res) => {
      const email= req.params.email;
      const query = {userEmail: email};
      const result = await AllPost.find(query).toArray();
      res.status(200).json(result);
    });

    //Get Recent Posts
    app.get("/getRecentPost", async (req, res) => {
      const query = {};
      const result = await AllPost.find(query)
        .sort({ postDate: -1 })
        .limit(6)
        .toArray();

      res.status(200).json(result);
    });

    //Add A Category
    app.post("/addCategory", async (req, res) => {
      const categoryName = req.body.categoryName;
      const userEmail = req.body.userEmail;

      const alreadyExistCategory = await AllCategory.findOne({
        categoryName: categoryName,
      });
      
      if (alreadyExistCategory ) {

        return res.status(400).json({ error: "Category already exists" });
      }
      const newCategory = {
        categoryName: categoryName,
      };
      const result = await AllCategory.insertOne(newCategory);
      res.send(result);
    });

    //Save My Workout
    app.post("/saveWorkout", async (req, res) => {
      const saveMyWorkout = {
        postId : req.body._id,
        userEmail: req.body.userEmail,
        title: req.body.title,
        description: req.body.description,
        muscleGroupId: req.body.muscleGroupId,
        image: req.body.image,
      };
      const alreadyExist = await savedWorkoutCollection.findOne({postId:saveMyWorkout.postId , userEmail:saveMyWorkout.userEmail});
     
      if(alreadyExist) {
        return res.status(400).json({error: 'Already Saved Work'})
      }
      const result = await savedWorkoutCollection.insertOne(saveMyWorkout);
      res.send(result);
    });

    // Get my workout
    app.get("/getMyWorkout/:email", async (req, res) => {
      const email= req.params.email;
      const query = {userEmail: email};
      const result = await savedWorkoutCollection.find(query).toArray();
      res.status(200).json(result);
    });

    //Get All Category
    app.get("/getAllCategory", async (req, res) => {
      const result = await AllCategory.find().toArray();
      res.status(200).json(result);
    });
    //Get Post Details by id
    app.get("/getPost/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await AllPost.findOne(query);
      res.status(200).json(result);
    });

    //User Update
    app.put("/userUpdate", upload, async (req, res) => {
      const id = req.body.id;
      const filter = { _id: new ObjectId(id) };

      const option = { upsert: true };
      const currentUser = {
        $set: {
          userName: req.body.userName,
          weight: req.body.weight,
          height: req.body.height,
          image: req.file.path,
        },
      };
      const result = await userCollection.updateOne(
        filter,
        currentUser,
        option
      );

      res.send(result);
    });
  
  } finally {
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("Server is running");
});
app.listen(port, () => console.log(`Server is running on ${port}`));
