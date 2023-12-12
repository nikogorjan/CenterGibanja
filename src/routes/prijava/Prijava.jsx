import React, { useState, useEffect } from "react";
import "./Prijava.css";
import Navbar from "../home/navbar/navbar.jsx";
import { Buffer } from "buffer";
import emailjs from '@emailjs/browser';

const Prijava = () => {
    const [fullName, setFullName] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [blocks, setBlocks] = useState([]);
    const [selected, setSelected] = useState(""); // Added state for selected button


    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
        console.log(fullName)
    };

    const handlePhoneNumChange = (e) => {
        setPhoneNum(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    

    useEffect(() => {
        fetchData2(setBlocks);
        console.log("BLOCKS: " + blocks);
    }, []);

    const handleButtonSelect = (naslov) => {
        setSelected(naslov);
        console.log(naslov);
    };

    useEffect(() => {
        if (blocks.length > 0) {
            setSelected(blocks[0].naslov); // Select the first button by default
        }
    }, [blocks]);

    const handleSubmit = (e) => {
        console.log("before prevent");

        e.preventDefault();
        console.log("sending email");
        // Here, you can perform any additional actions with the `fullName` value, such as sending it to the backend server.
        const templateParams = {
            from_name: fullName,
            user_phone: phoneNum,
            user_email: email,
            From_vadba: selected,
            message: message
          };

          console.log(templateParams);

          emailjs.send('service_vipgy5r', 'template_eiztj6s', templateParams, 'WWtbT4eiU6bn3Y5go')
          .then((response) => {
            console.log('Email sent successfully:', response.text);
            window.alert('Email sent successfully:');

            // Reset the form after successful submission if needed
            setFullName("");
            setPhoneNum("");
            setEmail("");
            setSelected("");
            setMessage("");
          })
          .catch((error) => {
            console.error('Error sending email:', error);
          });

        // Reset the form after submission if needed
        setFullName("");
    };



    return (
        <div className="prijava-main">
            
            <Navbar />
            <div className="prijava-postavitev">
                <div className="prijava-naslov">PRIJAVA NA VADBO</div>
                <div className="prijava-sporocilo">Izpolni obrazec in v najkrajšem možnem času te bomo kontaktirali za prvi trening oziroma posvet.</div>
                <div className="prijava-form">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="fullName">Ime in Priimek</label>
                        <input
                            className="prijava-input"
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={fullName}
                            onChange={handleFullNameChange}

                        />
                        <div className="label-margin">
                            <label htmlFor="fullName">Telefonska številka</label>
                            <input
                                className="prijava-input"
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={phoneNum}
                                onChange={handlePhoneNumChange}

                            />
                        </div>
                        <div className="label-margin">
                            <label htmlFor="fullName">Email</label>
                            <input
                                className="prijava-input"
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={email}
                                onChange={handleEmailChange}

                            />
                        </div>
                        <div className="label-margin">
                            <div className="prijava-sporocilo">Izberi vadbo na katero se prijavljaš</div>
                        </div>
                        <div className="label-margin">
                            <div className="prijava-buttons-container">
                                {blocks.map((block) => (
                                    <button
                                    type="button"
                                        key={block.iddata}
                                        onClick={() => handleButtonSelect(block.naslov)}
                                        className="priajva-button"
                                        style={{
                                            backgroundColor: selected === block.naslov ? "rgb(20, 131, 235)" : "",


                                        }}
                                    >
                                        {block.naslov}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="label-margin">
                            <label htmlFor="message">Sporočilo</label>
                            <textarea
                                className="prijava-area"
                                id="message"
                                name="message"
                                value={message}
                                onChange={handleMessageChange}
                            ></textarea>
                        </div>
                        <div className="label-margin">
                        <button className="submit-button" type="submit">Pošlji</button>
                        </div>
                        {/**/}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Prijava;


export async function fetchData2(setBlocks) {
    try {
        const response = await fetch("https://centergibanja.si/api/getdata");
        const data = await response.json();
        console.log("response: ", response);
        console.log("data: ", data);

        const sortedData = data.sort((a, b) => a.zaporedje - b.zaporedje);

        const formattedData = sortedData.map((item) => {
            // Convert buffer to data URL
            const imageBuffer = Buffer.from(item.slika);
            const imageDataURL = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;

            return {
                id: item.iddata,
                iddata: item.iddata,
                cena_takoj_vrednost: item.cena_takoj_vrednost,
                cena_takoj: item.cena_takoj,
                izbira: item.izbira,
                izbira_vrednost: item.izbira_vrednost,
                naslov: item.naslov,
                podnaslov: item.podnaslov,
                zaporedje: item.zaporedje,
                content: (
                    <div>
                        <h2>{item.naslov}</h2>
                        <p>{item.podnaslov}</p>
                    </div>
                ),
                image: imageDataURL,
                otherData: item.cena_takoj + "/" + item.cena_takoj_vrednost + "/" + item.iddata + "/" + item.izbira + "/" + item.naslov + "/" + item.podnaslov + "/" + item.zaporedje + "/" + item.izbira_vrednost,
                width: 3,
                type: "text",
                parent_id: 1,
            };
        });
        console.log("Formated data: " + formattedData);
        setBlocks(formattedData);
    } catch (error) {
        console.error(error);
    }
}