class BlockWithDrag extends Block  {

    constructor ({name, head, parent, createItem, addItemText}) {
        super({name, head, parent, createItem, addItemText});
    }

    init () {
        super.init ();
        let self=this;

        self.list.addEventListener('dragenter', function (e)  {e.preventDefault(); return true; }, false);
        self.list.addEventListener('dragover', function (e) {e.preventDefault();}, false);
        self.list.addEventListener('drop', self.handleDropForList.bind(self), false);
    }

    addItem() {
        let self=this;
        let listItem = super.addItem();

        listItem.setAttribute('draggable', 'true');

        //Обработчики событий
        listItem.addEventListener('dragstart', self.handleDragStartForItem.bind(listItem), false);
    }


    handleDropForList = function (e) {
        let self=this;

        let data = e.dataTransfer.getData('id');
        let parentEl=findClosest(e.target, 'UL');

        let dragSrcEl = document.getElementById(data);
        parentEl.appendChild(dragSrcEl);
        dragSrcEl.removeAttribute('id');

        e.stopPropagation();
        return false;
    };

   handleDragStartForItem (e) {

        this.id = "drag-src-el";

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('id', this.id);

        return true;
    };

}