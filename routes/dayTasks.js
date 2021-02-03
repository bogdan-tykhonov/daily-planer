const {Router} = require('express');
const DayTasks = require('../models/DayTasks');
const authMiddleWare = require('../middleware/auth.middleware');
const router = Router();

router.post('/addTask',authMiddleWare, async (req, res) => {
    try{
        console.log(req.body);
        const tasks = req.body;
        const owner = req.user.userId;
        const dayTasks = new DayTasks({daysTasks: tasks, owner:owner});
        await dayTasks.save();
        return res.json('Data has been saved');
    } catch(e){
        res.status(500).json('Something goes wrong');
    }
});

router.post('/getTasks', authMiddleWare , async (req, res)=> {
    try{
        //console.log(req.user.userId);
        const tasks = await DayTasks.find({owner: req.user.userId});
        console.log(tasks);
        res.json(tasks);
    }catch(e){
        res.status(500).json(e);
    }
});

module.exports = router;