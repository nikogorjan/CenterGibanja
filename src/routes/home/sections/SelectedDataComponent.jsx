import React from 'react';
import "../sections/SelectedDataComponent.css"
import { Buffer } from 'buffer';

const SelectedDataComponent = ({ selectedData }) => {

    const getSlideBackground = (slika) => {
        if (!slika) return '';
        const base64Image = `data:image/jpeg;base64,${Buffer.from(slika).toString('base64')}`;
        return base64Image;
    };

    return (
        <div className="section2-trener-container">
            <div className='selected-background-paragraph'>TRENER</div>
            <div className='selected-image-holder' style={{ backgroundImage: `url(${getSlideBackground(selectedData.slika)})` }}></div>
            <div className='selected-postavitev'>
                <p className='selected-name'>{selectedData.ime}</p>
                <p className='selected-poklic'>{selectedData.poklic}</p>
                <p className='selected-opis'>{selectedData.opis}</p>
            </div>
        </div>
    );
};

export default SelectedDataComponent;