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
/* logica que consulta se o usuario esta dentro do banco, e assim, renderiza a pagina
de jogo, ou retorna a tela de login*/
UsuariosDAO.prototype.autenticar = function(usuario, req, res){
	this._connection.open(function(err, mongoclient){
		mongoclient.collection("usuarios", function(err, collection){
			collection.fidn(usuario).toArray(function(err, result){

				if(result[0] != undefined){
					req.session.autorizado = true;

					req.session.usuario = result[0].usuario;
					req.session.casa = result[0].casa;
				}

				if(req.session.autorizado){
					res.redirect("jogo");
				} else {
					res.render("index", {validacao: {}});
				}
			});
			mongoclient.close();
		});
	
	});

}

module.exports = function(dadosForm){
	return UsuariosDAO;
}