import * as $ from "jquery";

export default class Settings {
	/* 設定 */
	settings: object[];

	/* コンストラクタ */
	constructor(settings: object[]) {
		this.settings = settings;
	}

	/* 行を作成 */
	createSettings(): void {
		/* 行を追加 */
		const $settingsBody: JQuery = $("#settings-body");
		$settingsBody.append("<tr></tr>");
		const $settingsRow: JQuery = $settingsBody.find("tr").last();
		/* Beforeフォームを作成 */
		$settingsRow.append('<td class="column"></td>');
		const $beforeColumn: JQuery = $settingsRow.find("td").last();
		$beforeColumn.append('<input type="text" name="before" class="before">');
		/* Afterフォームを作成 */
		$settingsRow.append('<td class="column"></td>');
		const $afterColumn: JQuery = $settingsRow.find("td").last();
		$afterColumn.append('<input type="text" name="after" class="after">');
		/* Enabledチェックボックス作成 */
		$settingsRow.append('<td class="column"></td>');
		const $enabledColumn: JQuery = $settingsRow.find("td").last();
		$enabledColumn.append('<input type="checkbox" name="enabled" class="enabled">');
		/* Deleteボタン作成 */
		$settingsRow.append('<td class="column"></td>');
		const $deleteColumn: JQuery = $settingsRow.find("td").last();
		$deleteColumn.append('<button type="button" name="delete" class="delete">Delete</button>');
	}

	/* storageから設定を復元 */
	restorSettings(): void {
		const settings: object[] = this.settings;
		for (let i: number = 0; i < settings.length; i++) {
			/* 行を作成 */
			this.createSettings();
			/* 行に設定値を設定 */
			this.setSettings(settings[i]);
		}
	}

	/* 設定値を設定 */
	setSettings(settings: object): void {
		const $settingsBody: JQuery = $("#settings-body");
		const $settingsRow: JQuery = $settingsBody.find("tr").last();
		/* Beforeフォームを作成 */
		$settingsRow.find('input[name="before"]').val(settings["before"]);
		/* Afterフォームを作成 */
		$settingsRow.find('input[name="after"]').val(settings["after"]);
		/* Enabledチェックボックス作成 */
		$settingsRow.find('input[name="enabled"]').prop("checked", settings["enabled"]);
	}

	/* 行を削除 */
	deleteSettings(ele: Element): void {
		$(ele).closest("tr").remove();
	}

	/* 設定を保存 */
	saveSettings(): void {
		let setSettings: object[] = [];
		/* optionページから設定取得 */
		$("#settings-body").children("tr").each(function (i: number, ele: Element): void {
			const item: object = {
				"before": $(ele).find('input[name="before"]').val(),
				"after": $(ele).find('input[name="after"]').val(),
				"enabled": $(ele).find('input[name="enabled"]').prop("checked")
			};
			setSettings.push(item);
		});
		const setItems: object = { "settings": setSettings };
		/* storageへ設定保存 */
		chrome.storage.sync.set(setItems);
	}
}