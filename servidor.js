var express=require("express");
app=express(),
servidor=require("http").createServer(app);
io=require("socket.io").listen(servidor);

servidor.listen(4000);

app.use(express.static(__dirname+"/"));

app.get("/",function(req,res){
	res.sendfile(__dirname+"/index.html");
});
setInterval(conectado,5000);
seg_conectados=1;
function conectado(){
	console.log("Coneccion Segura 0000" + seg_conectados);
	seg_conectados +=1;
}

//listener
io.sockets.on("connect",function(socket){
	socket.on("crear",function(data){
		io.sockets.emit("creado",data);
	});
	socket.on("mover",function(data){
		io.sockets.emit("moviendo",data);
	});
	socket.on("eliminar",function(data){
		io.sockets.emit("eliminado",data);
	});
	socket.on("posicionar",function(data){
		io.sockets.emit("posicionado",data);
	});
});