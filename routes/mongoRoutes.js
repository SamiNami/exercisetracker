const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = app => {
    app.post('/api/exercise/new-user', async (req, res) => {
        const { username } = req.body;
        const foundUser = await User.findOne({ username });
        if (foundUser) {
            return res.send('Sorry that username is taken');
        }
        const user = await new User({ username, exercise: [] }).save();
        res.json(user);
    });
};
