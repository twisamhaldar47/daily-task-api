const express = require('express');
const { User } = require('./models');
require('dotenv').config();
const userRouter = require('./routes/userRoute')

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());

app.use('/user', userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
