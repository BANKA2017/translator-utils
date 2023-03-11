import { GoogleBrowserTranslate } from "./source/google.js";
import { MicrosoftBrowserTranslator } from "./source/microsoft.js";
import { SogouBrowserTranslator } from "./source/sogou.js";
const Translator = async (text = '', platform, target, raw) => {
    let result = { content: '', message: '' };
    try {
        switch (platform) {
            case 'google':
                result.content = await GoogleBrowserTranslate(text, target, !!raw);
                break;
            case 'microsoft':
                result.content = await MicrosoftBrowserTranslator(text, target, !!raw);
                break;
            case 'sogou':
                result.content = await SogouBrowserTranslator(text, target, !!raw);
                break;
        }
    }
    catch (e) {
        result.message = String(e);
    }
    return result;
};
export default Translator;
