
export class MarkdownEditPlusData {

    private static readonly _EMOJI_DATA: Record<string, any> = require("@/common/resources/json/emoji-data.json");

    static get EMOJI_DATA(): Record<string, any> {
        return this._EMOJI_DATA;
    }

}