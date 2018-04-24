import express from 'express';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
const dbUrl = 'mongodb://localhost';

function validate(game){
    let errors = {};
    if (game.title === '') {
        errors.title = 'Can\'t be empty!';
    }
    if (game.cover === '') {
        errors.cover = 'Can\'t be empty!';
    }

    const isValid = Object.keys(errors).length === 0;
    return { errors, isValid };
}

mongodb.MongoClient.connect(dbUrl, function(err,db){

    let dbase = db.db('crud');

    app.get('/api/games', (req,res) => {

       dbase.collection('games').find({}).toArray((err,games) => {
           res.json({ games });
       });
    });

    app.get('/api/games/:_id', (req,res) => {

        dbase.collection('games').findOne({_id: new mongodb.ObjectId(req.params._id)},(err,game) => {
            res.json({ game });
        });
    });

    app.post('/api/games', (req,res) => {
        const { errors, isValid } = validate(req.body);
        if(isValid) {
            const { title, cover } = req.body;
            dbase.collection('games').insert({ title, cover }, (err, result) => {
                if(err){
                    res.status(500).json({errors: {global: "Something went wrong"}});
                } else {
                    res.json({game: result.ops[0]});
                }
            });
        } else {
            res.status(400).json({ errors });
        }
    })

    app.use((req, res) => {
        res.status(404).json({
            errors: {
                global: 'Please try again'
            }
        })
    });

    app.listen(8080, () => console.log('Server is running on localhost:8080'));

});


