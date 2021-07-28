const { Router } = require("express");
const router = Router();
const Comment = require('../db/models/commentModel')

router.delete('/delete/:id',  (req, res) => {
    const {id} = req.params
    Comment.findByIdAndDelete(id)
    .then((data) => res.json(id))
    
})


module.exports = router