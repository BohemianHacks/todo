const path = require('path');
const api = require('./api');
const gauth = require('./gauth');

module.exports = function(app){

    app.get('/api/fetchtasks', api.fetchTasks);
    app.post('/api/addtask', api.addTask);
    app.delete('/api/deltask', api.delTask);
    app.put('/api/updatetask', api.updateTask);

    app.get('/app', function(req, res){
        if (req.session.ginfo){
            res.send('Welcome back '+ req.session.ginfo.email +'!');
        } else {
            if (req.query.code){
                gauth.getGoogleAccountFromCode(req.query.code).then(function(ginfo){
                    req.session.ginfo = ginfo;
                    res.send('Thanks for joining us!');
                });
            } else {
                res.redirect(gauth.urlGoogle());
            }
        }
    });
};