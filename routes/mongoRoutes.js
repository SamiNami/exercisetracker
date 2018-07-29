const mongoose = require('mongoose');
const User = mongoose.model('users');
// const Exercise = mongoose.model('exercises');

module.exports = app => {
    app.post('/api/exercise/new-user', async (req, res) => {
        const { username } = req.body;
        const foundUser = await User.findOne({ username });
        if (foundUser) {
            return res.send('Sorry that username is taken');
        }
        const user = await new User({ username }).save();
        res.json(user);
    });

    app.post('/api/exercise/add', async (req, res) => {
        const { userId, description, duration, date } = req.body;
        // validate values?
        if (!userId || !description || !duration) {
            return res.status(422).send('missing values');
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.send('Sorry no user found');
        }

        const formattedDate = handleDate(date);

        user.logs.push({ description, duration, date: formattedDate });
        user.count = user.logs.length;
        user.save();

        res.send(user);
    });

    app.get('/api/exercise/log', async (req, res) => {
        console.log(req.query);
        const { userId, from, to, limit } = req.query;
        if (!userId) {
            return res.send('You need a userId');
        }

        let query = {
            _id: userId
        };
        if (from) {
            const compareDate = toDate(from);
            query.logs = { $lte: compareDate };
        }

        console.log(query);
        // 'logs.date': { $gt: 17, $lt: 66 }

        const foundUser = await User.find(query);

        res.send(foundUser);
    });
};

function handleDate(date) {
    // if no date is provied, set the time to now
    if (!date) {
        return new Date();
    }
    return toDate(date);
}

// converts strings in the format YYYY-MM-DD to date objects
function toDate(dateStr) {
    const [year, month, day] = dateStr.split('-');
    return new Date(year, month - 1, day);
}
