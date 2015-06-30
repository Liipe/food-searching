var cadastroController = {

	init: function() {
		cadastroController.setForm();
		cadastroController.showCadList();
	},

	showCadList: function() {
		var list = CadastroDAO.getList(),
		    guestList = document.getElementById('guestList');

		guestList.innerHTML = "";
		
		if(list && list.length > 0) {
			for (var i = 0; i < list.length; i++) {
				var guest = list[i];
				cadastroController.createList(guest);
			};
		}
	},

	setForm: function() {
		var form = document.getElementById('form');
		if(form) {
			form.addEventListener('submit', function(event){
				var guest = {}; 
				guest.name  = form.name.value;
                guest.username = form.username.value;
				guest.email = form.email.value;
                guest.cidade = form.cidade.value;
        
                alert("Cadastro realizado com sucesso.");
                
				cadastroController.addGuest(guest);
				cadastroController.clearForm(form);

				event.preventDefault();
			});
		}
		else {
			console.err('Formulário não encontrado!');
		}
	},

	clearForm: function(form) {
		form.name.value = "";
        form.username.value = "";
		form.email.value = "";
        form.cidade.value = "";
	},

	addGuest: function(guest) {
		CadastroDAO.create(guest);
		cadastroController.createList(guest);
	},
    
    editGuest: function(email) {
		if(confirm("Do you want edit " + email)) {
			var contact = CadastroDAO.getList();
			if (contact) {
				var guest = document.getElementById('form');
                
                guest.name = contact.name.value;
				guest.username = contact.username.value;
				guest.email = contact.email.value;
                guest.cidade = contact.cidade.value;
			}
		}
	},

	deleteGuest: function(email) {
		if(CadastroDAO.delete(email)) {
			cadastroController.showCadList();
		}
	},

	createList: function(guest) {
		var guestListContainer = document.getElementById('guestList'),
		    dl = document.createElement('dl'),
		    dt = document.createElement('dt'),
		    deleteImg = document.createElement('img'),
            editaImg = document.createElement('img'),
		    ddName = document.createElement('dd'),
            ddUsername = document.createElement('dd'),
		    ddEmail = document.createElement('dd'),
            ddCidade = document.createElement('dd');
		    
		ddName.innerHTML = guest.name;
		ddName.className = "name";
        
        editaImg.src = "http://www.abccmm.org.br/imgs/editar.gif";
        editaImg.setAttribute('data-email', guest.email);
        
        editaImg.addEventListener('click', function() {
            if(confirm("Tem certeza que deseja editar este contato?" + guest.email)){
                cadastroController.editGuest(editaImg.getAttribute('data-email'));
            }
        });

		deleteImg.src = "http://www.777icons.com/libs/med/16x16/delete-patient-man.gif";
		deleteImg.setAttribute('data-email', guest.email);

		deleteImg.addEventListener('click', function() {
			if(confirm("Tem certeza que deseja deletar este contato? " + guest.email)) {
				cadastroController.deleteGuest(deleteImg.getAttribute('data-email'));
			}			
		});
		ddName.appendChild(deleteImg);
        ddName.appendChild(editaImg);

		ddUsername.innerHTML = guest.username;
		ddUsername.className = "username";
        
        ddEmail.innerHTML = guest.email;
		ddEmail.className = "email";
        
        ddCidade.innerHTML = guest.cidade;
		ddCidade.className = "cidade";

		dl.appendChild(dt);
		dl.appendChild(ddName);
        dl.appendChild(ddUsername);
		dl.appendChild(ddEmail);
        dl.appendChild(ddCidade);

		guestListContainer.appendChild(dl);
	}
	
};

cadastroController.init();
