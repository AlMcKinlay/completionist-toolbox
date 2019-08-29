const KEY = 'toolbox_theme';

class Theme {
    constructor() {
        let stored = {};
        if (typeof localStorage !== "undefined") {
            stored = JSON.parse(localStorage.getItem(KEY) || "{}");
        }

        this.dark = stored.dark || false;
        this.background = () => this.dark ? '#282828' : '#ffffff';
        this.hoverBackground = () => this.dark ? '#383838' : '#cccccc';
        this.navbarBackground = () => this.dark ? '#282828' : '#0099C6';
        this.textColor = () => this.dark ? '#ffffff' : '#000000';
    }

    toggleDarkMode() {
        this.dark = !this.dark;
        if (typeof localStorage !== "undefined") {
            localStorage.setItem(KEY, this.toString());
        }
        return {dark: this.dark};
    }

    toString() {
        return JSON.stringify({
            dark: this.dark
        });
    }

    update(update) {
        if (!update){ 
            return
        }
        this.dark = update.dark;
    }

    watchLocalStorage(callback) {
        const that = this;
        if (typeof window === "undefined" || !window) {
            return;
        }
        window.addEventListener("storage", handleStorageEvent);
    
        function handleStorageEvent(e){
            if(e.key && e.key === KEY){
    
                if (e.oldValue === e.newValue) {
                    return;
                }
    
                const state = JSON.parse(e.newValue);
                Object.keys(state).forEach((key) => state[key] = JSON.parse(state[key]));
                
                that.update(state);
                callback(that);
            }
        }
    }
    
}

export default new Theme();