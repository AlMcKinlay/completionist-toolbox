class List {

    constructor(oldList) {
        this.sections = (oldList && {...oldList.sections}) || {};
        this.version = (oldList && oldList.version) || undefined;
    }

}

export default List;