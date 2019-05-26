class Block {

    constructor ({name, head='', parent, createItem, addItemText})
    {
        this.name = name;
        this.head = head;
        this.list;
        this.block;
        this.parent = parent;
        this.editableField;
        this.buttonForShowingField;
        this.buttonForAddingItem;
        this.buttonForHiding;
        this.createItem=createItem;
        this.addItemText=addItemText;
    }

    init () {

        let self=this;

        self.block=self._createBlock();


        createElement ({
            tag: "h2",
            parent: self.block,
            classList: [`${self.name}__head`],
            innerHTML: self.head
        });


        self.list=createElement ({
            tag: "ul",
            parent: self.block,
            classList: [`${self.name}__list`]
        });

        self.fieldContainer=createElement ({
            tag: "div",
            parent: self.block,
            classList: [`${self.name}__field-container`, 'field-container', 'field-container--invisible']
        });

        self.editableField=createElement ({
            tag: "input",
            parent: self.fieldContainer,
            classList: [`${self.name}__editable-field`, 'editable-field', 'editable-field--invisible'],
            attributes: [{name: 'type', value: 'text'}]
        });

        self.buttonForAddingItem=createElement ({
            tag: "button",
            parent: self.fieldContainer,
            classList: [`${self.name}__button-for-adding-item`, 'button-for-adding-item'],
            innerHTML: 'Добавить ' + self.addItemText
        });

        self.buttonForHiding=createElement ({
            tag: "button",
            parent: self.fieldContainer,
            classList: [`${self.name}__button-for-hiding`, 'button-for-hiding']
        });

        self.buttonForShowingField=createElement ({
            tag: "button",
            parent: self.block,
            classList: [`${self.name}__button-for-showing-field`, 'button-for-showing-field'],
            innerHTML: 'Добавить ещё одну ' + self.addItemText
        });



        self.parent.appendChild(self.block);

        //Обработчики событий
        self.buttonForShowingField.addEventListener('click', self.showEditableField.bind(self));
        self.buttonForAddingItem.addEventListener('click', self.addItem.bind(self));
        self.buttonForHiding.addEventListener('click', self._hideButton.bind(self));

    }

    _createBlock  () {
        let block = document.createElement("div");
        block.classList.add(this.name);
        return block;
    }


    showEditableField  () {
        this.fieldContainer.classList.remove("field-container--invisible");
        this.buttonForShowingField.classList.add("button-for-showing-field--invisible");
    }


    addItem(){

        let self=this;

        this._hideButton();

        /**/
        let value = this.editableField.value || '';
        this.editableField.value='';
        let listItem=createElement ({
            tag: "li",
            parent: this.list,
            classList: [`${this.name}__list-item`]
        });

        let buttonForDeleteItem=createElement ({
            tag: "button",
            parent: listItem,
            classList: [`${this.name}__button-for-delete-item`]
        });

        buttonForDeleteItem.addEventListener('click', self.removeItem);

        this.createItem(value, listItem);

        return listItem;
    }

    removeItem  (e){
        let parentEl=findClosest(e.target, 'UL');
        parentEl.removeChild(e.target.parentElement);
    }

    _hideButton () {
        this.buttonForShowingField.classList.remove("button-for-showing-field--invisible");
        this.fieldContainer.classList.add("field-container--invisible");
    }

}