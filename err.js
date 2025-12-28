//  error handling middleware---->custom error handling middleware
const express = require("express");
const app = express();


let ExpressError = require("./ExpressError")




app.get("/err", (req, res) =>{
    abc = abc;
    
    // throw error  -->by default express will send 500 error
    // when after not avalable middleware
});



//   BY CUSTOM---> error handling middleware---->
app.use( (err, req, res, next) =>{
    let {status = 500 , message} = err;   // log the error 
    res.status(status).send(message)
});

//
// 
// 
// 

const checkToken = (req, res, next) => {
    let { token } = req.query;
        if (token === "giveaccess") {
            next()
        }
        throw new ExpressError(401, "ACCESS .DENIED!");
};

app.get("/api", checkToken, (req, res) =>{
    res.send("data");
});

//   custom error handling middleware---->
// app.use( (err, req, res, next) =>{
//     console.log("-----------ERROR  --------");    // log the error 
//      res.send(err)// pass -error handler middleware 
// });




// //   error handling middleware---->
// app.use( (err, req, res, next) =>{
//     console.log("-----------ERROR -1 --------");    // log the error 
//      next(err)// pass -error handler middleware 
// });

//  error handling middleware -> 2---->
// app.use( (err, req, res, next) =>{
//     console.log("-----------ERROR-2------");     // log the error 
//     next()   // pass - error handler middleware or any path
// });


// app.use((req,res) => {
//     res.status(404).send(" 404! ---Page Not Found");
// })





//    ---------activity--------------

app.get("/admin", (req, res) =>{
    throw new ExpressError(403, " Admin Forbidden");
});

app.use( (err, req, res, next) =>{
    res.status(403).send(err.message)
})

    


// --------synchronously error handle-------->

app.get("/chats/new", (req, res) =>{
    throw new ExpressError(404, "Page not found");
});

// err handler middleware
app.use((err, req, res, next) =>{
    let {status = 404 , message = " Server Error"} = err;
    res.status(status).send(message)
})


// ---------asynchronously error handle-------->

// NEW - show route    (from wrong req ->id)
app.get("/chats/id", async (req, res,next) => {
    try {
        res.render("abcd")
        } catch (err) {
        next(err);
    }  
})

// err handler middleware
app.use((err, req, res, next) =>{
    let {status = 404 , message = " Server Error"} = err;
    res.status(status).send(message)
})





















app.listen(8080, () => { 
console.log("server is listening to port 8080");
});