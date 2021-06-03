module.exports.jogo = function(application, req, res){
	
	if(req.session.autorizado !== true){,
		res.send('Usuário precisa fazer login');
		return;
	}
	var usuario = req.session.usuario;
	var casa = req.session.casa;

	var connection = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(connection);

    JogoDAO.iniciaJogo(res, usuario, casa);
}

module.exports.sair = function(application, req, res){
	
	req.session.destroy(function(){
		res.render("index", {validacao: {}});
	});
}

module.exports.suditos = function(application, req, res){
	res.render("aldeoes", {validacao: {}});
}

module.exports.pergaminhos = function(application, req, res){
	res.render("pergaminhos", {validacao: {}});
}