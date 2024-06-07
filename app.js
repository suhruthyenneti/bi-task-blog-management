const express=require('express');
const app=express();
const port=process.env.PORT||3000;

const {config,engine}=require('express-edge');
app.use(express.static('public'));
app.use(engine);
app.set('views',`${__dirname}/views`);

app.get('/',(req,res)=>{
  res.render('index');
})

app.listen(3000, ()=>  {
    console.log(`server is running on port ${port} `);
});