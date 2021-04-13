const { MongoClient } = require("mongodb");
require("dotenv").config();

function MyDB() {
    const myDB = {};
    const DB_NAME = "gamesDB";
    const url = process.env.URL;

    myDB.signin = async (Users) => {
        const client = new MongoClient(url, {useUnifiedTopology: true});
        await client.connect();
        const db = client.db(DB_NAME);
        let flag = false;
        const result = await db.collection("userInfo").find().toArray();
        result.forEach(item => {
            if (item.name === Users.userName && item.password === Users.passWord || flag) {
                flag = true;
            } else {
                flag = false;
            }
        });
        console.log("db flag is :   ", flag);
        return flag;
    };

    myDB.signup = async (Users) =>{
        const client = new MongoClient(url, {useUnifiedTopology: true});
        await client.connect();
        const db = client.db(DB_NAME);
        const result = await db.collection("userInfo");
        const users = await result.find().toArray();
        // console.log("what is users I have now?   ", users);
        let flag = true;
        await users.every(item => {
            if (item.name === Users.userName) {
                flag =  false;
                return flag;
            }
        });
        if(flag){
            const myobj = {name: Users.userName,password: Users.passWord};
            await result.insertOne(myobj, function(err) {
                if (err) throw err;
            });
        }
        return flag;
    };

    myDB.getGames = async () => {
        const client = new MongoClient(url, { useUnifiedTopology: true });
        await client.connect();
        const db = client.db(DB_NAME);
        const gameCollection = db.collection("gameInfo");
        const query = {};
        return gameCollection.find(query)
            .sort({_id: 1})
            .toArray()
            .finally(() => client.close());
    };

    myDB.insertGame = async (newGame) => {
        const client = new MongoClient(url, {useUnifiedTopology: true});
        await client.connect();
        const db = client.db(DB_NAME);
        const games = db.collection("gameInfo");
        games.insertOne(newGame);
    };

    myDB.addComment = async (newComment) =>{
        //const ObjectId = require("mongodb").ObjectId;
        const id = newComment[0];
        //const o_id = new ObjectId(id);
        const client = new MongoClient(url, {useUnifiedTopology: true});
        await client.connect();
        const db = client.db(DB_NAME);
        const games = db.collection("gameInfo");
        console.log("running addcomment");
        const query = { _id: id };
        const update = {
            $push: {
                commentList:{
                    comment: newComment[1]
                },
            },
        };
        games.findOneAndUpdate(query, update);
        console.log(query)
    }

    myDB.loadGame = async () => {
        const client = new MongoClient(url, {useUnifiedTopology: true});
        await client.connect();
        const db = client.db(DB_NAME);
        db.collection("gameInfo", (err, collection) =>{
           collection.insertOne({
               _id: "001",
               Name: "Pokémon Shield",
               Rating: "5",
               Type: "Pokemon",
           });
            collection.insertOne({
                _id: "002",
                Name: "Ring Fit Adventure",
                Rating: "5",
                Type: "Sport",
            });
            collection.insertOne({
                _id: "003",
                Name: "Apex Legends",
                Rating: "5",
                Type: "Action",
            });
            collection.insertOne({
                _id: "004",
                Name: "Pikmin3 Deluxe",
                Rating: "5",
                Type: "Adventure",
            });
            collection.insertOne({
                _id: "005",
                Name: "Xenoblade",
                Rating: "5",
                Type: "Adventure",
            });
            collection.insertOne({
                _id: "006",
                Name: "Animal Crossing",
                Rating: "5",
                Type: "RPG",
            });
            collection.insertOne({
                _id: "007",
                Name: "Pokémon Sword",
                Rating: "5",
                Type: "Pokemon",
            });
            collection.insertOne({
                _id: "008",
                Name: "Luigi's Mansion",
                Rating: "5",
                Type: "Adventure",
            });
            collection.insertOne({
                _id: "009",
                Name: "Link's Awakeding",
                Rating: "5",
                Type: "RPG",
            });
            collection.insertOne({
                _id: "010",
                Name: "DRAGON QUEST",
                Rating: "5",
                Type: "Action",
            });
            collection.insertOne({
                _id: "011",
                Name: "MARVEL ULTIMATE ALLIANCE",
                Rating: "5",
                Type: "Action",
            });
            collection.insertOne({
                _id: "012",
                Name: "Pokémon Let's Go",
                Rating: "5",
                Type: "Pokemon",
            });
            collection.insertOne({
                _id: "013",
                Name: "Overcooked 2",
                Rating: "5",
                Type: "RPG",
            });
            collection.insertOne({
                _id: "014",
                Name: "Bayonetta",
                Rating: "5",
                Type: "Action",
            });
            collection.insertOne({
                _id: "015",
                Name: "Mario Tennis",
                Rating: "5",
                Type: "Sport"
            });
            collection.insertOne({
                _id: "016",
                Name: "Fortnite",
                Rating: "5",
                Type: "Action",
            });
            collection.insertOne({
                _id: "017",
                Name: "Xenoblade 2",
                Rating: "5",
                Type: "Adventure",
            });
            collection.insertOne({
                _id: "018",
                Name: "Hyrule Warriors",
                Rating: "5",
                Type: "Action",
            });
            collection.insertOne({
                _id: "019",
                Name: "Kirby Fighters",
                Rating: "5",
                Type: "Action",
            });
            collection.insertOne({
                _id: "020",
                Name: "Pokémon Let's Go2",
                Rating: "5",
                Type: "Pokemon",
            });
            collection.insertOne({
                _id: "021",
                Name: "Tetris99",
                Rating: "5",
                Type: "Action",
            });
        });
        return;
    };

    return myDB;
}

module.exports = MyDB();