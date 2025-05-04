import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'

import loginEn from '../locales/eng/login'
import loginRu from '../locales/ru/login'
import menuEn from '../locales/eng/menu'
import menuRu from '../locales/ru/menu'
import profileRu from '../locales/ru/profile'
import profileEn from '../locales/eng/profile'
import usefulServicesRu from '../locales/ru/usefulServicesRu'
import usefulServicesEn from '../locales/eng/usefulServicesEn'
import navigationEn from '../locales/eng/navigationEn'
import navigationRu from '../locales/ru/navigationRu'

const translations = {
    en: {
        login: loginEn,
        menu: menuEn,
        profile:profileEn,
        usefulServices: usefulServicesEn,
        navigation:navigationEn,

    },
    ru: {
        login: loginRu,
        menu: menuRu,
        profile:profileRu,
        usefulServices: usefulServicesRu,
        navigation:navigationRu,
    },
}

export function usePageTranslations<Page extends keyof typeof translations['en']>(page: Page) {
    const lang = useSelector((s: RootState) => s.language.selected)
    return translations[lang][page] as Record<string, string>
}

