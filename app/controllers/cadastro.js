module.exports.cadastro = function(application, req, res){
    res.render('cadastro', { validacao: {}, dadosForm: {} });
}


module.exports.cadastrar  = function(application, req, res){

	var dadosForm = req.body;

	req.assert('nome', 'Nome não pode ser vazio').notEmpty();
	req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
	req.assert('senha', 'Senha não pode ser vazia').notEmpty();
	req.assert('casa', 'Casa não pode ser vazia').notEmpty();

	var erros = req.validationErrors();

	if(erros){
		res.render('cadastro', {validacao: erros, dadosForm: dadosForm});
		return;
	}

	var connection = application.config.dbConnection;
    var UsuariosDAO = new application.app.models.UsuariosDAO(connection);
    var JogoDAO = new application.app.models.JogoDAO(connection);

		//A variavel usuariosDAO que contem a instancia do nosso objeto
	
	UsuariosDAO.inserirUsuario(dadosForm);//recuperei função de conexão com o modulo que conexão com o banco
	JogoDAO.gerarParametros(dadosForm.usuario);
		//os () faz com que a funcão contida dentro da variavel seja executada.


	res.send('Podemos cadastrar')
}	