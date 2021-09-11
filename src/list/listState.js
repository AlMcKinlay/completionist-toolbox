class List {

    constructor(oldList) {
        this.sections = (oldList && {...oldList.sections}) || {};
        this.version = (oldList && oldList.version) || undefined;
        this.dlc = (oldList && oldList.dlc !== undefined) ? oldList.dlc : true;
        this.visible = true;
        this.id = oldList && oldList.id;
        this.saved = (oldList && oldList.saved) || false;
        this.time = new Date().getTime();
    }

}

export default List;