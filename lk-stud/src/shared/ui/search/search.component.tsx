import { useState } from 'react';
import { ButtonComponent } from '../button/button.component'
import { InputTextComponent } from '../input-text/input-text.component'
import './search.component.css'



export const SearchComponent = () => {
    const [searchField,setSearchField] = useState("");


    return (
        <div className="search-component">
            <InputTextComponent 
            label=""
            leftIconSrc='/assets/svg/interface/blue/Search_Magnifying_Glass.svg' 
            onChange={(e) => setSearchField(e.target.value)}
            value={searchField} 
            placeholder='Введите ФИО'
            />
            <ButtonComponent

            >
                НАЙТИ
            </ButtonComponent>
        </div>
    )
}