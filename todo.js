const path = require('node:path');
const express = require('express');
const app = express();

const { MongoClient, ObjectId } = require('mongodb');

const client = new
    MongoClient('mongodb://localhost:27017');

let db;

// publicディレクトリ以下のファイルを静的ファイルとして配信
app.use('/static', express.static(path.join(__dirname, 'public')));

// ejsをビューエンジンに指定
app.set('view engine', 'ejs');

//todoリスト一覧
app.get('/', async (req, res) => {
    try {
        const todos = await db.collection('todo').find().toArray();

        res.render(
            path.join(__dirname, 'views', 'index.ejs'),
            { todos: todos }
        );
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
});

//追加
app.post('/api/todo', express.json(), async (req, res) => {
    const task = req.body.task;
    if (!task) {
        res.status(400).send('Bad Request');
        return;
    }

    if (typeof task !== 'string') {
        res.status(400).send('Not String');
        return;
    }

    const result = await db.collection('todo').insertOne({ task: task });
    res.json({
        id: result.insertedId
    });
});

//削除
app.delete('/api/todo/:id', express.json(), async (req, res) => {
    const id = req.params.id;

    await db.collection('todo').deleteOne({ _id: new ObjectId(id) });

    res.status(200).send('Deleted');
});


async function main() {
    // サーバーの listen前に接続する
    await client.connect();
    db = client.db('my-app');
    app.listen(3000, () => {
        console.log('start listening');
    });
}

main()