import * as $ from "jquery";
import Settings from "./settings";

/* storageから設定取得 */
chrome.storage.sync.get((getItems: object): void => {
    const getSettings: object[] = getItems["settings"];
    const settings = new Settings(getSettings);

    if (settings.settings === undefined){
        /* storageに保存している設定がないため処理なし */
    } else {
        /* 設定を復元 */
        settings.restorSettings();
    }

    /* Deleteボタンクリック時 */
    $(document).on("click", ".delete", function(): void {
        /* 行を削除 */
        settings.deleteSettings(this);
    });

    /* Addボタンクリック時 */
    $("#add").on("click", function(): void {
        /* 行を作成 */
        settings.createSettings();
    });

    /* Saveボタンクリック時 */
    $("#save").on("click", function(): void {
        /* 設定を保存 */
        settings.saveSettings();
    });
});