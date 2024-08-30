const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));

// Set view engine to EJS
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.join(__dirname, "views"));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {    
        id: uuidv4(),

        username: "apnacollege",
        content: "I love coding!"
    },
    {    
        id: uuidv4(),

        username: "shradhakhapra",
        content: "Hard work is important to achieve success"
    },
    {    
        id: uuidv4(),

        username: "rahulkumar",
        content: "I love coding!"
    }
];

// Route to display posts
app.get("/posts", (req, res) => {
    res.render("index", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs", { posts });
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    // Generate a new id for the post
    let newId = Math.random().toString(36).substring(2, 7);
    posts.push({ id: newId, username, content });
    res.redirect("/posts");
});


app.post("/posts/:id",(req,res) => {
    let{ username,content }  = req.body;
    let id = uuidv4();

    posts.push({id,username,content});

    res.redirect("/posts");

});



app.get("/posts/:id", (req,res) => {
    let { id } = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs",{posts});
});

//to get the unique id

/*app.patch("/posts/:id",(req,res) => {
 let {id } = req.params;
 console.log(id);
 res.send("patch request working");
}); */

app.patch("/posts/:id",(req,res) => {
    let {id } = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("edit.ejs", {post}); 


});

app.get("/posts/:id/edit",(req,res) =>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);

    res.render("edit.ejs",{post});
});

// we make delete route

app.delete("/posts/:id",(req,res) =>{
    let {id} = req.params;
     posts = posts.filter((p) => id !=== p.id);
  //  res.send("delete success"); 
  res.redirect("/posts");

});


app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
