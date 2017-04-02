export default class Settings {
    settings: object[];
    constructor(settings: object[]);
    createSettings(): void;
    restorSettings(): void;
    setSettings(settings: object): void;
    deleteSettings(ele: Element): void;
    saveSettings(): void;
}
