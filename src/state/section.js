class Section {

    constructor(oldSection) {
        this.entries = (oldSection && oldSection.entries.slice()) || [];
    }

}

export default Section;