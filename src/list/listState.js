class List {

    constructor(oldList) {
        this.sections = (oldList && {...oldList.sections}) || {};
        this.version = (oldList && oldList.version) || undefined;
        this.visible = true;
    }

}

export default List;