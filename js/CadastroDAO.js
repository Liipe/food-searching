var CadastroDAO = {

	list: [],

	create: function(guest) {
		var list = CadastroDAO.list;
		list.push(guest);
		CadastroDAO.saveToLocalStorage();
	},

	getList: function() {
		return CadastroDAO.list;
	},


	delete: function(email) {
		var list = CadastroDAO.getList(),
		    contact;
		for (var i = 0; i < list.length; i++) {
			contact = list[i];
			if(contact.email == email) {
				list.splice(i,1);
				CadastroDAO.saveToLocalStorage();
				return true;
			}
		}
		return false;
	},

	saveToLocalStorage: function() {
		var jsonString = JSON.stringify(CadastroDAO.list);
		window.localStorage.setItem("contatcs", jsonString);
	},

	retriveFromLocalStorage: function() {
		var jsonString = window.localStorage.getItem("contatcs");
		
		CadastroDAO.list = [];

		if (jsonString) {
			CadastroDAO.list = JSON.parse(jsonString);
		}
	},
    

};

CadastroDAO.retriveFromLocalStorage();
