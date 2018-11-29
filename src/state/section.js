class Section {

    constructor(oldSection) {
        this.entries = (oldSection && oldSection.entries.slice()) || [];
        this.hidden = (oldSection && oldSection.hidden) || false;
    }

}

export default Section;