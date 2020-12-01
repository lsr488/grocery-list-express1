const list = document.getElementById('grocery-list');

let isEditable = false;

list.addEventListener('click', function(e) {
	// console.log(e.target);

	if(e.target.dataset.type.includes('edit')) {
		console.log('edit button!');
		// console.log(e.target);

		isEditable = true;
		// console.log("should be true:", isEditable);
		let editBtn = e.target;
		let saveBtn = document.getElementById(`${e.target.dataset.id}-save`);

		let deleteBtns = document.querySelectorAll(`[data-type=delete`);
		deleteBtns.forEach(btn => {
			btn.classList.add('no-show');
		});

		let liItem = editBtn.previousElementSibling;

		liItem.setAttribute('contenteditable', 'true');


		saveBtn.classList.remove('no-show');
		saveBtn.addEventListener('click', function(e) {
			console.log('save button clicked');
			editBtn.previousElementSibling.setAttribute('contenteditable', 'false');

			// submit the changed item name to the api
			let data = {
				id: liItem.id,
				item: liItem.textContent,
				state: false
			}

			fetch(`/api/items/${e.target.id}`, {
				method: 'PUT',
				body: JSON.stringify(data),
				headers: {
					'Content-type': 'application/json; charset=UTF-8'
				}
			})
				.then(response => {
					if(!response.ok) {
						throw new Error("Could not reach website.");
					}
					return response.json();
				})
				.then(json => { console.log("json response:", json) })
				.catch(err => console.error(err));


			deleteBtns.forEach(btn => {
				btn.classList.remove('no-show');
			});

			saveBtn.classList.add('no-show');

			isEditable = false;
		});
	}

	// to isolate the "delete" button
	if(e.target.dataset.type.includes('delete')) {
		console.log("delete button");
		// console.log(e.target);

		e.target.parentElement.style.display = "none";

		let data = {
			id: e.target.dataset.id,
		}

		fetch(`/api/items/${e.target.dataset.id}`, {
			method: 'DELETE',
			body: JSON.stringify(data),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(response => {
				if(!response.ok) {
					throw new Error("Could not reach website.");
				}
				return response.json();
			})
			.then(json => { console.log("json response:", json) })
			.catch(err => console.error(err));
	}

	// to isolate the item for strikethrough
	if(e.target.dataset.type.includes('item') && isEditable == false) {
		// console.log("should be false:", isEditable);
		console.log("item name clicked");
		// console.log(e.target);
		e.target.classList.toggle('checked');
	
		if(e.target.className.includes('checked')) {

			let data = {
				id: e.target.id,
				item: e.target.textContent,
				state: true
			}

			fetch(`/api/items/${e.target.id}`, {
				method: 'PUT',
				body: JSON.stringify(data),
				headers: {
					'Content-type': 'application/json; charset=UTF-8'
				}
			})
				.then(response => {
					if(!response.ok) {
						throw new Error("Could not reach website.");
					}
					return response.json();
				})
				.then(json => { console.log("json response:", json) })
				.catch(err => console.error(err));
		}

		if(!e.target.className.includes('checked')) {
			const data = {
				id: e.target.id,
				item: e.target.textContent,
				state: false
			}

			fetch(`/api/items/${e.target.id}`, {
				method: 'PUT',
				body: JSON.stringify(data),
				headers: {
					'Content-type': 'application/json; charset=UTF-8'
				}
			})
				.then(response => {
					if(!response.ok) {
						throw new Error("Could not reach website.");
					}
					return response.json();
				})
				.then(json => { console.log("json response:", json) })
				.catch(err => console.error(err));
		}
	}
});