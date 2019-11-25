class List {

    constructor(oldList) {
        this.sections = (oldList && {...oldList.sections}) || {};
        this.version = (oldList && oldList.version) || undefined;
        this.visible = true;
        this.server = false;
        this.id = oldList && oldList.id;
    }

}

export default List;