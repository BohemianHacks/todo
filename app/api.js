const db = require('./db');

const fetchTasks = function(req, res){

    if (req.session.ginfo.email){
        db.query('SELECT * FROM tasks where owner = $1', [req.session.ginfo.email], (err, result) => {
            if (err) {
                res.status(400).json({error: 'Query error. Check logs for details.'});
                throw err;
            } else {
                res.status(200).json(result.rows);
            }
        });
    } else {
        res.status(401).json({error: "No valid email in session."});
    }
};

const addTask = function(req, res){

    if(req.session.ginfo.email){
        if (req.body.label && req.body.description && req.body.interval){

            const query = {
                text: 'INSERT INTO tasks(owner, label, description, interval, last) VALUES($1, $2, $3, $4, $5)',
                values: [req.session.ginfo.email, req.body.label, req.body.description, req.body.interval, new Date()],
            };

            db.query(query, (err, result) => {

                if (err) {
                    res.status(400).json({error: 'Query error. Check logs for details.'});
                    throw err;
                } else {
                    res.status(200).json(result);
                }
            }); 

        } else {
            res.status(400).json({error: 'Incomplete task data.'});
        }
    } else {
        res.status(401).json({error: "No valid email in session."});
    }
};

const delTask = function(req, res){

    console.log("del");

    res.status(200).json({});

};

const updateTask = function(req, res){

    console.log("update");

    res.status(200).json({});

};

module.exports = {
    fetchTasks: fetchTasks,
    addTask: addTask,
    delTask: delTask,
    updateTask: updateTask
};