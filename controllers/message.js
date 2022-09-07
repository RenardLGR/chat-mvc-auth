const Message = require('../models/Message')
const User = require('../models/User')

module.exports = {
    getMessages: async (req,res)=>{
        //console.log(req.user)
        try{
            let messageItems = await Message.find({})
            //{userId:req.user.id}
            const users = await User.find({})
            let cpyMessageItems = []
            // const itemsLeft = await Messages.countDocuments({userId:req.user.id,completed: false})
            messageItems.forEach(message => {
                // console.log(message.userId);
                // let filtered = users.filter(user => user._id == message.userId)
                // console.log(filtered);
                //console.log(users.find(el => el._id === message.userId));
                // message.authorName = users.find(el => el._id == message.userId).userName
                //message.authorName = 'jean'
                // message['authorName'] = 'jean'
                let temp = Object.assign({}, message)
                temp.authorName = users.find(el => el._id == message.userId).userName
                temp.profilePicture = users.find(el => el._id == message.userId).profilePicture
                let date = ''+temp._doc.date
                // date = date.replace('T', ' ').slice(0,-4)
                temp._doc.date = date.slice(0, 25)
                cpyMessageItems.push(temp)
            })
            //console.log(messageItems);
            //console.log(cpyMessageItems);
            res.render('chatrooms.ejs', {messages: cpyMessageItems,  user: req.user})
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