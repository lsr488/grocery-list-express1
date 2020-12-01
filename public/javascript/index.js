console.log('hello from public/javascript/index.js');

const list = document.getElementById('grocery-list');

list.addEventListener('click', function(e) {
	// console.log(e.target);
	// console.log(e.target.dataset.id);


	if(e.target.dataset.type.includes('edit')) {
		console.log('edit button!');
		console.log(e.target);
	}

	// to isolate the "delete" button
	if(e.target.dataset.type.includes('delete')) {
		console.log("delete button");
		console.log(e.target);

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
	if(e.target.className.includes('form-item')) {
		console.log("form-item");
		console.log(e.target);
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