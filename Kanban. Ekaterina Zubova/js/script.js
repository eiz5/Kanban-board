function addCard(value, parent) {
	let card=new Card(value, parent);
	card.init();
}

function addColumn(head, parent) {
	let column=new BlockWithDrag({name: 'column', head: head, parent: parent, createItem: addCard, addItemText: 'карточку'});
    column.init();
}

let list=new Block({name: "board", parent: document.querySelector(".wrapper"), createItem: addColumn, addItemText: 'колонку'});
list.init();
