const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const dateUtil = require(__dirname + "/util/dateUtil");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('resources'));
app.set('view engine', 'ejs');

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/itemDB");

const itemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
});

const Item = mongoose.model("Item", itemSchema); 

const bookSchema = new mongoose.Schema({
    name:String
});
const Book = mongoose.model("Book", bookSchema);

const workSchema = new mongoose.Schema({
    name:String
});
const Work = mongoose.model("Work", workSchema);

app.get("/", (req, res)=>{

    const d_format_tday = dateUtil.dateFormat();
    const listArray=[];

    const option={

    }
    const projeciton={
        _id:0
    }

    Item.find(option, projeciton, (e, docs)=>{
        if (undefined!==e && null!==e){
            console.log(e);
        }else{
            docs.forEach((element)=>{
                listArray.push(element.name);
            });
        }
        res.render('index',{listTitle: d_format_tday, listArray:listArray});
    });

    
});

app.get("/books", (req, res)=>{
    const booksArr=[];
    const option={

    }
    const projeciton={
        _id:0
    }

    Book.find(option, projeciton, (e, docs)=>{
        if (undefined!==e && null!==e){
            console.log("here");
            console.log(e);
        }else{
            docs.forEach((element)=>{
                booksArr.push(element.name);
            });
        }
        res.render('index', {
            listTitle:"Book List",
            listArray:booksArr
        });
    });
});

app.get("/works", (req, res)=>{
    const worksArr=[];
    const option={

    }
    const projeciton={
        _id:0
    }

    Work.find(option, projeciton, (e, docs)=>{
        if (undefined!==e && null!==e){
            console.log(e);
        }else{
            docs.forEach((element)=>{
                worksArr.push(element.name);
            });
        }
        res.render('index', {
            listTitle:"Work List",
            listArray:worksArr
        });
    });
});

app.post("/", (req, res)=>{

    const srcPage = req.body.btn;

    if ("Book List" === srcPage){

        const book = new Book({
            name:req.body.item
        });
        book.save((e)=>{
            if (undefined!==e && null!==e){
                console.log("book saved");
            }else{
                console.log(e);
            }
            res.redirect("/books");
        });

    }else if ("Work List" === srcPage){
        const work = new Work({
            name:req.body.item
        });
        work.save((e)=>{
            if (undefined!==e && null!==e){
                console.log("work saved");
            }else{
                console.log(e);
            }
            res.redirect("/works");
        });
    }else{
        const item = new Item({
            name:req.body.item
        });
        item.save((e)=>{
            if (undefined===e || null===e){
                console.log("item saved");
            }else{
                console.log(e);
            }
            res.redirect("/");
        });
    }    

});

app.post("/delete", (req, res)=>{

    const srcPage = req.body.hiddn;

    if ("Book List" === srcPage){

        const option={
            name:req.body.chkbox
        }
        Book.deleteOne(option, (e, resp)=>{
            if (undefined!==e && null!==e){
                console.log(e);
            }else{
                console.log("book deleted");
            }
            res.redirect("/books");
        });

    }else if ("Work List" === srcPage){
        const option={
            name:req.body.chkbox
        }
        Work.deleteOne(option, (e, resp)=>{
            if (undefined!==e && null!==e){
                console.log(e);
            }else{
                console.log("work deleted");
            }
            res.redirect("/works");
        });
    }else{
        const option={
            name:req.body.chkbox
        }
        Item.deleteOne(option, (e, resp)=>{
            if (undefined!==e && null!==e){
                console.log(e);
            }else{
                console.log("item deleted");
            }
            res.redirect("/");
        });
    }

});

app.listen(PORT, ()=>{
    console.log('Server started in run mode.');
});
