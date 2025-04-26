import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'

import loginEn from '../locales/eng/login'
import loginRu from '../locales/ru/login'
import menuEn from '../locales/eng/menu'
import menuRu from '../locales/ru/menu'

const translations = {
    en: {
        login: loginEn,
        menu: menuEn,
    },
    ru: {
        login: loginRu,
        menu: menuRu,
    },
}

export function usePageTranslations<Page extends keyof typeof translations['en']>(page: Page) {
    const lang = useSelector((s: RootState) => s.language.selected)
    return translations[lang][page] as Record<string, string>
}

