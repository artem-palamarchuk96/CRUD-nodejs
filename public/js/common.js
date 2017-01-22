// /* click on add btn and create object from table data */
document.addEventListener('click', function(e) {

	/* "add" btn */
	if (e.target.id == 'add') {
		var formData = {
			name: document.personForm.name.value,
			surname: document.personForm.surname.value,
			age: document.personForm.age.value,
			email: document.personForm.email.value
		}
		/* send created data to server */
		sendReq('POST', '/api/create', formData, 'application/json', function() {
			// TODO: add popup or message that data added
			console.log('person added');
		})
	}
	/* load data */
	if (e.target.id == 'load') {
		sendReq('GET', '/api/read', null, null, function(res) {
			/* clear old table */
			var table = document.querySelector('#result');
			while (table.firstChild) {
				table.removeChild(table.firstChild);
			}

			/* creating table */
			for (var i = 0; i < res.length; i++) {
				/* creating row with "data=row" class */
				var tr = document.createElement('tr');
				tr.classList.add('data-row');
				for (prop in res[i]) {
					/* creating cells with "data-cell" class, ignore _id and __v in output table */
					if (prop != '_id' && prop != '__v') {
						td = document.createElement('td');
						td.classList.add('data-cell');
						td.innerHTML = res[i][prop];
						tr.appendChild(td);
					}
				}
				tr.dataset.id = res[i]['_id'];
				var deleteBtn = document.createElement('td');
				deleteBtn.className = 'data-cell delete';
				deleteBtn.innerHTML = 'delete';
				tr.appendChild(deleteBtn);
				/* append each row to table */
				table.appendChild(tr);
			}
		})
	}
	/* delete data */
	if (e.target.classList.contains('delete')) {
		sendReq('DELETE', '/api/delete', {'id' : e.target.parentNode.dataset.id}, 'application/json', function() {
			document.querySelector('#result').removeChild(e.target.parentNode);
		})
	}

	if (e.target.className == 'data-cell') {
		var renameField = document.createElement('input');
		renameField.className = 'temp-field';
		var fieldText = e.target.textContent;
		renameField.value = fieldText;
		e.target.parentNode.insertBefore(renameField, e.target);
		renameField.focus();
		renameField.addEventListener('blur', function() {
			var td = document.createElement('td');
			td.classList.add('data-cell');
			td.innerHTML = this.value;
			this.parentNode.insertBefore(td, this);
			this.parentNode.removeChild(this);
			var obj = {
				'_id': td.parentNode.dataset.id,
				'name': td.parentNode.children[0].textContent,
				'surname': td.parentNode.children[1].textContent,
				'age': td.parentNode.children[2].textContent,
				'email': td.parentNode.children[3].textContent
			};
			if (td.textContent != fieldText) {
				sendReq('PUT', '/api/update', obj, 'application/json', function() {
					console.log('Succes update');
				});
			}
		})
		e.target.parentNode.removeChild(e.target);
	}
})

function sendReq(reqType, url, data, contentType, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open(reqType, url);
	xhr.setRequestHeader('Content-Type', contentType ? contentType : 'text/plain');
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var response = xhr.responseText ? JSON.parse(xhr.responseText) : "";
			if (callback) callback(response);
		}
	}
	if (data) {
		xhr.send(JSON.stringify(data));
	} else {
		xhr.send();
	}
	
}













































	// function sendReq(reqType, url) {
// 	var xhr = new XMLHttpRequest();
// 	console.log(reqType, url)
// 	xhr.open(reqType, url);
// 		// xhr.setRequestHeader('Content-Type', 'application/json');
// 		xhr.onreadystatechange = function() {
// 			if (xhr.readyState == 4 && xhr.status == 200) {
// 				console.log('state',xhr.readyState);
// 				console.log('response', xhr.responseText)
// 				return xhr.responseText;
// 			}
// 		}
// 		xhr.send();
// 	}

// console.log(sendReq('GET', '/api/read'));