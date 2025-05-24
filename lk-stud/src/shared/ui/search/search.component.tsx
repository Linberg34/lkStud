import { useState } from 'react';
import { ButtonComponent } from '../button/button.component'
import { InputTextComponent } from '../input-text/input-text.component'
import './search.component.css'

interface SearchComponentProps {
    placeholder?: string
    buttonText?: string
    onSearch?: (query: string) => void
}


export const SearchComponent: React.FC<SearchComponentProps> = ({
    placeholder = 'Введите ФИО',
    buttonText = 'Найти',
    onSearch = (query: string) => {
        console.log('Search query:', query);
    }

}) => {
    const [searchField, setSearchField] = useState("");


    return (
        <div className="search-component">
            <InputTextComponent
                label=""
                leftIconSrc='/assets/svg/interface/blue/Search_Magnifying_Glass.svg'
                onChange={(e) => setSearchField(e.target.value)}
                value={searchField}
                placeholder={placeholder}
            />
            <ButtonComponent
                onClick={() => onSearch(searchField)}
            >
                {buttonText}
            </ButtonComponent>
        </div>
    )
}