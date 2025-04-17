// src/store/slices/languageSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Language = 'ru' | 'en'

interface LanguageState {
    selected: Language
}

const saved = ((): Language | null => {
    try {
        const v = localStorage.getItem('language')
        return v === 'ru' || v === 'en' ? v : null
    } catch {
        return null
    }
})()

const initialState: LanguageState = {
    selected: saved ?? 'ru',
}

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage(state, action: PayloadAction<Language>) {
            state.selected = action.payload
            try {
                localStorage.setItem('language', action.payload)
            } catch {console.error('Failed to save language to localStorage')}
        },
        toggleLanguage(state) {
            state.selected = state.selected === 'ru' ? 'en' : 'ru'
            try {
                localStorage.setItem('language', state.selected)
            } catch { console.error('Failed to save language to localStorage')}
        },
    },
})

export const { setLanguage, toggleLanguage } = languageSlice.actions
export default languageSlice.reducer
