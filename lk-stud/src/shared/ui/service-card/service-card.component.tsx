interface ServiceCardProps {
    text: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
    text
}) => {

    return (
        <div className="service-card-component">
            <div className="service-card-component__content">
                <div className="service-card-component__header">
                    <div className="service-card-component__header__title">
                        {text}
                    </div>
                    <div className="service-card-component__header__button">

                    </div>
                </div>
            </div>
        </div>
    );
};