class List {

    constructor(oldList) {
        this.sections = (oldList && {...oldList.sections}) || {};
        this.version = (oldList && oldList.version) || undefined;
    }

    clone(list) {
        const clone = new List();
        clone.sections = {...list.sections};
        return clone;
    }

}

export default List;