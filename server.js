const express = require('express');
const routes = require('./Routes/index');

const connectDB = require('./Config/dbConfig');

const app = express();
const port = 3000;


connectDB();

app.use(express.json());
app.get('/api', function(req, res){
    res.send('Hello, World!');

});
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
