function UsuariosDAO(connection){
	this._connection = connection();
		//o _ é uma convenção que indica pra quem utiliza o modulo que aquela variavel faz parte do contexto da função
		//nao devendo ser usada fora dessa função
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
	this._connection.open(function(err, mongoclient){//essa função esperar um callback, recebendo como primeiro parametro um erro, e o segundo parametro é o objeto de conexão
		mongoclient.collection("usuarios", function(err, collection){//a função colection permite manipular os documentos dentro das coleções
			collection.insert(usuario);
			mongoclient.close();
		});
	
	});
}

module.exports = function(){
	return UsuariosDAO;
}