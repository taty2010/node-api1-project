// implement your API here
const express = require('express');
const db = require('./data/db');
const server = express();

server.listen(5000, () => {
    console.log('listening on port 5000...')
})

server.use(express.json())

server.get('/', (req,res)=>{
    res.send('Node Api Project')
});

server.get('/api/users', (req,res) =>{
    db.find()
        .then(users => {
            res.status(200).json({users});
        })
        .catch(err => {
            res.status(500).json({success:false, errMessage: 'The users information could not be retrieved.'})
        });
});

server.post('/api/users', (req,res)=>{
    const users = req.body;
    if(!users.name || !users.bio){
       return res.status(400).json({success:false, message: 'Please provide name and bio for the user.'})
    }else{
    db.insert(users)
        .then(user => {
            res.status(201).json({success: true, user})
        })
        .catch(() => {
            res.status(400).json({success:false, message: 'Please provide name and bio for the user.'})
        })
    }
});

server.get('/api/users/:id', (req,res) =>{
    const {id} = req.params;
    
    db.findById(id)
        .then(users => {
            if(Number(id) !== users.id){
                res.status(404).json({success:false, message: 'The user with the specified ID does not exist.'})
            }else{
                res.status(200).json({users});
            }
        })
        .catch(err => {
            res.status(500).json({success:false, message: 'The user information could not be retrieved.'})
        });
});

server.delete('/api/users/:id', (req,res) =>{
    const {id} = req.params;

    db.remove(id)
    .then(users => {
        if(Number(id) !== users.id){
            res.status(404).json({success:false, message: 'The user with the specified ID does not exist.'})
        }else{
            res.status(200).json({users});
        }
    })
    .catch(err => {
        res.status(500).json({success:false, message: 'The user could not be removed'})
    });
});

server.put('/api/users/:id', (req,res) =>{
    const {id} = req.params;
    const user = req.body;

    db.update(id,user)
    .then(update => {
        if(update){
            res.status(200).json({success:true,id, user})
        }
        else if(!users.name || !users.bio){
         res.status(400).json({success:false, message: 'Please provide name and bio for the user.'})
        }
        else{
            res.status(400).json({success: false, message: 'The user with the specified ID does not exist.'});
        }
    })
    .catch(err => {
        res.status(500).json({success:false, message: 'The user could not be removed'})
    });
});

