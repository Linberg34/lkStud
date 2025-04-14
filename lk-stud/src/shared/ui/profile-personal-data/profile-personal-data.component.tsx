import "./profile-personal-data.component.css"

interface ProfilePersonalDataProps {
    imageSrc: string,
    gender: string,
    birthDate: string,
    citizenship: string,
    snils: string,
    email: string,
    phoneNumbers: string[],
    extraEmail?: string,
    address: string,
}


export const ProfilePersonalDataComponent: React.FC<ProfilePersonalDataProps> = ({
    imageSrc,
    gender,
    birthDate,
    citizenship,
    snils,
    email,
    phoneNumbers,
    extraEmail,
    address,
}) => {
    return (
        <div className="profile-personal-data-component">
            <div className="profile-personal-data-component__image">
                <img src={imageSrc} alt="" />
            </div>
            <div className="profile-personal-data-component__data-wrapper">
                <h3>Личные данные</h3>
                <div className="profile-personal-data-component__data">
                    <span className="p2 profile-personal-data-component__label">Пол </span>
                    <span className="p1 profile-personal-data-component__value">{gender}</span>
                </div>
                <div className="profile-personal-data-component__data">
                    <span className="p2 profile-personal-data-component__label">Дата рождения </span>
                    <span className="p1 profile-personal-data-component__value">{birthDate}</span>
                </div>
                <div className="profile-personal-data-component__data">
                    <span className="p2 profile-personal-data-component__label">Гражданство: </span>
                    <span className="p1 profile-personal-data-component__value">{citizenship}</span>
                </div>
                <div className="profile-personal-data-component__data">
                    <span className="p2 profile-personal-data-component__label">СНИЛС: </span>
                    <span className="p1 profile-personal-data-component__value">{snils}</span>
                </div>
                <div className="profile-personal-data-component__data">
                    <span className="p2 profile-personal-data-component__label">Email: </span>
                    <span className="p1 profile-personal-data-component__value">{email}</span>
                </div>
            </div>
            <div className="profile-personal-data-component__contacts-wrapper">
                <h3>Контакты</h3>
                <div className="profile-personal-data-component__data">
                    <span className="p2 profile-personal-data-component__label">Телефон </span>
                    <span className="p1 profile-personal-data-component__value">{phoneNumbers[0]}</span>
                </div>
                <div className="profile-personal-data-component__data">
                    <span className="p2 profile-personal-data-component__label">Телефон 2 </span>
                    <span className="p1 profile-personal-data-component__value">{phoneNumbers[1]}</span>
                </div>
                <div className="profile-personal-data-component__data">
                    <span className="p2 profile-personal-data-component__label">Дополнительный E-mail: </span>
                    <span className="p1 profile-personal-data-component__value">{extraEmail}</span>
                </div>
                <div className="profile-personal-data-component__data">
                    <span className="p2 profile-personal-data-component__label">Адрес </span>
                    <span className="p1 profile-personal-data-component__value">{address}</span>
                </div>
            </div>
        </div>
    )
};