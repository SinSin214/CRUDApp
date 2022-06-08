const app = require('../../app')
const userRoute = require('../user/userRoute');
const articleRoute = require('../article/articleRoute');
const commentRoute = require('../comment/commentRoute');

app.use('/users', userRoute);
app.use('/articles', articleRoute);
app.use('/comments', commentRoute);