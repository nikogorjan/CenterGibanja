import React from 'react';
import "../sections/Section2Slides.css";
import SlidesCarousel from './SlidesCarousel';

const Section2Slides = ({ onItemClicked }) => {
    return (
        <div className='Scroll'>
            <div className='slides-main'>
                <div className='slides-postavitev'>
                    <div className='header1'>O NAS</div>
                    <div className='slides-paragraph1'>Začetki našega dela segajo v leto 2018, ko je nastalo športno društvo Moč gibanja. Skozi leta je naš idejni vodja centra pridobival izkušnje in potrebna znanje za vodenje centra. V letu 2021 smo zakupili prostor v velikosti 560m2, katerega smo preuredili v center gibanja Murska Sobota.</div>
                    <div className='slides-paragraph2'>V našem prostoru je omogočena samostojna vadba, vadba s trenerjem individualno ali v skupini.. Vsak udeleženec je deležen profesionalne skrbi, bodisi z vadbo, prehrano, koristnimi nasveti in prav tako z dobro družbo. Naše glavno vodilo je skrb za zdravje ljudi. Skupaj delamo kot ekipa, zavzeto se posvečamo našim strankam in si prizadevamo izpolniti njihove cilje ter zagotoviti njihovo zadovoljstvo.</div>
                    <div className='header2'>NAŠ KOLEKTIV</div>
                    
                </div>
                {/*<div className='slides-background-paragraph'>KDO SMO</div>*/}
                <SlidesCarousel className='ekipa-carousel' onItemClicked={onItemClicked}/>
            </div>
        </div>
    );
};

export default Section2Slides;