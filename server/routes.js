const controller = require("./controller");
const bikes = require("./models").Bike;
const users = require("./models").User;
var path = require('path');

module.exports = function(app){
    app.post('/api/users',controller.create)
    app.post('/api/login',controller.login)
    app.post('/api/logout',controller.logout)
    app.get('/api/id',controller.getid)
    app.get('/api/contact', controller.getContact)

    app.get('/api/bikes',controller.showAll)
    app.post('/api/bikes',controller.create)
    app.get('/api/bikes/:id',controller.show)
	app.put('/api/bikes/:id',controller.update)
    app.delete('/api/bikes/:id',controller.destroy)
    app.post('/api/search',controller.search)

    // app.all('*',(req,res,next)=>{
	// 	res.sendFile(path.resolve("./client/dist/client/index.html"))
	// })

}