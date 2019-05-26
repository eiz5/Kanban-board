class Card  {

    constructor (value, parent) {
        this.task=value;
        this.card;
        this.parent=parent;
    }

    init () {

        let self=this;

        self.card=createElement ({
            tag: "p",
            parent: self.parent,
            classList: ["card"],
            innerHTML: self.task
        });

    }

}
