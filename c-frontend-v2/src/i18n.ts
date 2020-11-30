import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {locales} from './locales';
import moment, {Moment} from 'moment';
import numeral from  'numeral';

const resources = { //TODO dodelat nacitani z modulu
    cs: Object.assign({}, { app: locales.cs}),
    en: Object.assign({}, { app: locales.en}),
    //TODO de
};


export default function init(): void {

    i18n
        // .use(LanguageDetector)
        .use(initReactI18next) // passes i18n down to react-i18next
        .init({
            resources,
            lng:"cs",
            fallbackLng: "cs",
            debug: true,

            // have a common namespace used around the full app
            //ns: ["app", "common"],
            defaultNS: "app",

            interpolation: {
                useRawValueToEscape: true,
                escape: (str) => (str),
                escapeValue: false, // react already safes from xss
                format: function (value: any, format?: string, lng?: string): string {
                    if (format === 'uppercase') return value.toUpperCase();
                    if (value instanceof Date) {
                        return moment(value).format(format);
                    }
                    if (value instanceof moment) {
                        return (value as Moment).format(format);
                    }

                    if (typeof value === 'number') return numeral(value).format(format);
                    return value;
                }
            }
        }).then((t) => {
        moment.locale(i18n.language);
        numeral.locale(i18n.language);
    });
}
