const Message = require('../models/Message')
const User = require('../models/User')

module.exports = {
    getMessages: async (req,res)=>{
        try{
            let messageItems = await Message.find({}).lean() //.lean() gives us back a normal looking object instead of a mongo document object
            const users = await User.find({}).lean() //.lean() gives us back a normal looking object instead of a mongo document object
            messageItems.forEach(message => {
                //the purpose of the following lines is to have the object we send back to ejs to have more suitable properties
                message.authorDisplayName = users.find(el => el._id == message.userId).userName //add to the object the author display name from his id
                message.authorProfilePic = users.find(el => el._id == message.userId).profilePicture //add to the object the author profile picture from his id
                let d = ''+ message.createdAt
                d = d.slice(0, 25)
                message.createdAt = d //make the date more readable
            })
            //console.log(messageItems);
            res.render('chatrooms.ejs', {messages: messageItems, user: req.user}) //req.user is the connected user meaning req.user._id or req.user.id (equivalent) would give us back his id.
            //meaning we can check user.id === message.userId and add a trash icon if so

        }catch(err){
            console.log(err)
        }
    },
    createMessage: async (req, res)=>{
        try{
            await Message.create({content: req.body.messageContent, userId: req.user.id})
            console.log('Message has been posted')
            res.redirect('/chatrooms')
        }catch(err){
            console.log(err)
        }
    },
    // markComplete: async (req, res)=>{
    //     try{
    //         await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
    //             completed: true
    //         })
    //         console.log('Marked Complete')
    //         res.json('Marked Complete')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    // markIncomplete: async (req, res)=>{
    //     try{
    //         await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
    //             completed: false
    //         })
    //         console.log('Marked Incomplete')
    //         res.json('Marked Incomplete')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    deleteMessage: async (req, res)=>{
        // console.log(req.body.messageIdFromJSFile)
        try{
            await Message.findOneAndDelete({_id:req.body.messageIdFromJSFile})
            console.log('Message deleted')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    