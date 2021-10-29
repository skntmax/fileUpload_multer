const express = require('express')  
const app = express();
const port = 4000 || process.env.PORT
const hbs = require('hbs');
const bodyParser= require('body-parser')
const multer = require('multer')
app.set('view engine' ,'hbs')
// hbs.registerPartials( __dirname+"/component/" )
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
// app.use(express.static(__dirname+"/css/"))

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
    },
  });

  const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "jpeg") {
      cb(null, true);
    } else {
      cb(new Error("Not a PDF File!!"), false);
    }
  };

  const upload = multer({
     dest: "public/files/" ,   
    storage: multerStorage,
    fileFilter: multerFilter,
  });

app.get('/upload' ,(req,res)=>{ 
 res.render('upload')
})

app.post("/api/uploadFile",upload.single("myFile") , (req, res) => {
    console.log(req.file);
   res.send("file sent " + req.file )

});

app.get('/' ,(req,res)=>{ 
res.send('hiii')
})
 
app.listen(port, ()=>{ 
    console.log(`server started at ${port}`)
})