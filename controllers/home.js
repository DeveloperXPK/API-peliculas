function home(req, res){
    res.status(200)
    .send('<h1>Home</h1>');
}

module.exports = {
    home
};