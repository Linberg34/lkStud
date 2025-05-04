import React from 'react';
import './mini-avatar.component.css'


interface MiniAvatarProps {
    src: string
}

export const MiniAvatarComponent: React.FC<MiniAvatarProps> = ({
    src
}) => {
    return (
        <div className="mini-avatar-component" >
            <img src = {src}/>
        </div>
    );
}