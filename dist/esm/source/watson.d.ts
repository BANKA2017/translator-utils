import type { TranslatorModuleFunction } from '../types.js';
declare const WatsonDetect: (text?: string | string[]) => Promise<string | "_">;
declare const WatsonTranslator: TranslatorModuleFunction<'watson'>;
export { WatsonDetect, WatsonTranslator };
