var generateResponse = function(req, res, next) {
    res.body = req.body;
    next();
};

module.exports = {
    path: '/serverInstrumentLink',
    callback: generateResponse
};
