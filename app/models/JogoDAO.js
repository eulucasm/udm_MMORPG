function JogoDAO(connection){
	this._connection = connection();
}

JogoDAO.prototype.gerarParametros = function(){
	this._connection.open(function(err, mongoclient){//essa função esperar um callback, recebendo como primeiro parametro um erro, e o segundo parametro é o objeto de conexão
		mongoclient.collection("jogo", function(err, collection){//a função colection permite manipular os documentos dentro das coleções
			collection.insert({
				usuario: usuario,
				moeda: 15,
				suditos: 10,
				temor: Math.floor(Math.random() * 1000),
				sabedoria: Math.floor(Math.random() * 1000),
				comercio: Math.floor(Math.random() * 1000),
				magia: Math.floor(Math.random() * 1000)
			});
			mongoclient.close();
		});
	
	});
}

JogoDAO.prototype.iniciaJogo = function(res, usuario, casa){
	this._connection.open(function(err, mongoclient){
		mongoclient.collection("jogo", function(err, collection){
			collection.fidn({usuario: usuario}).toArray(function(err, result){


				res.render("jogo", {img_casa: casa, jogo: result[0]});

				mongoclient.close();
			});
		});
	});
}


module.exports = function(dadosForm){
	return JogoDAO;
}