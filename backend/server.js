import express from 'express';
import mongodb from 'mongodb';

const app = express();
const dbUrl = 'mongodb://localhost';


mongodb.MongoClient.connect(dbUrl, function(err,db){
    let dbase = db.db('crud');
    app.get('/api/games', (req,res) => {

       dbase.collection('games').find({}).toArray((err,games) => {
           res.json({ games });
       });
    })

    app.listen(8080, () => console.log('Server is running on localhost:8080'));

});


