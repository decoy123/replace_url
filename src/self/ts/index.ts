/* 拡張機能アイコンクリック時 */
chrome.browserAction.onClicked.addListener((): void => {
    /* アクティブタブの情報取得 */
    chrome.tabs.query({currentWindow: true, active: true}, (tabs): void => {
        /* 置換設定取得 */
        chrome.storage.sync.get((getItems: object): void => {
            const getSettings: object[] = getItems["settings"];
            /* 置換用URL作成 */
            let newUrl: string = tabs[0].url;
            for (let i: number = 0; i < getSettings.length; i++){
                const setting: object = getSettings[i];
                if (setting["enabled"] === true){
                    newUrl = newUrl.replace(new RegExp(setting["before"]), setting["after"]);
                }
            }
            /* 置換後のURLにアクセス */
            chrome.tabs.update(
                {url: newUrl}
            );
        });
    });
});