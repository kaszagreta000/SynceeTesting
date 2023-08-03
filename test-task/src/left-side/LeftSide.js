import React from "react";
import './LeftSide.css';
import Logo from './syncee-logo-300px.png';
import { useEffect } from 'react';
import { useState } from "react";

function LeftSide() {
    
    //---SIGN IN WITH GOOGLE---

    function handleCallbackResponse(response){
        console.log("Encoded JWT ID token: " + response.credential);
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "600706216879-m71sp56fgt8cvh58djhcqrcoehqjapji.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {
                theme: 'outline',
                width: 350
            }
        )
    }, []);



    //---CHECKBOX---

    var myCheck = false;

    const handleChange = event => {
        myCheck = event.target.checked;
    }


    //---EMAIL---

    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const handleEmail = event => {
        if (!isValidEmail(event.target.value)) {
          setError('Email is invalid.');
        } else {
          setError(null);
        }
    
        setEmail(event.target.value);
    };



    //---PASSWORD---

    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    function handlePassword(event) {
        let new_pass = event.target.value;
        setPassword(new_pass);

        // regular expressions to validate password
        var lowerCase = /[a-z]/g;
        var upperCase = /[A-Z]/g;
        var numbers = /[0-9]/g;
        var specials = /[!#$%&? "]/g;
        if (!new_pass.match(lowerCase)) {
            setErrorMessage("Password should contains lowercase letters!");
        } else if (!new_pass.match(upperCase)) {
            setErrorMessage("Password should contain uppercase letters!");
        } else if (!new_pass.match(numbers)) {
            setErrorMessage("Password should contains numbers also!");
        } else if (!new_pass.match(specials)) {
            setErrorMessage("Password should contain special characters!");
        } else if (new_pass.length < 5) {
            setErrorMessage("Password length should be more than 5.");
        }  else {
            setErrorMessage(""); 
        }
    }



    //---BUTTON---

    const onClickLogin = ()  => {

        setMessageEmail('Your e-mail: ' + email);

        setMessagePassword('Your password: ' + password);
        
        if (myCheck === true) {
            setMessageCheck('Remember me: YES');
        } else {
            setMessageCheck('Remember me: NO');
        }

        /*setTimeout(function() {
            window.location.reload(false);
        }, 5000);*/
    }


    //---DATA OUT---

    const [messageEmail, setMessageEmail] = useState('');
    const [messagePassword, setMessagePassword] = useState('');
    const [messageCheck, setMessageCheck] = useState('');

    
    return (
        <div className="Margin">
            <img src={Logo} alt="" width="30%" height="30%"/>

            <h1>Login</h1>
            <p>See your growth and get consulting support!</p>
            <div id="signInDiv"></div>
            <table className="table1">
                <tbody>
                <tr>
                    <td><hr></hr></td>
                    <td className="orEmail">or Sign in with Email</td>
                    <td><hr></hr></td>
                </tr>
                </tbody>
            </table>

            <div><h4>Email*</h4></div>
            <div>
                <input className="inputs" id="email" name="email" placeholder="     mail@website.com" value={email} onChange={handleEmail}/>
                <div className="errorMessage" style = {{ color: "red" }}> {error} </div>
            </div>

            <div><h4>Password*</h4></div>
            <div className="inputs">
                <div>
                    <input className="inputs" type = "password" name="pwd" id = "pwd" minLength="5" placeholder="     Min. 5 character" value = {password} onChange = {handlePassword}/>
                    <div className="errorMessage" style = {{ color: "red" }}> {errorMessage} </div>
                </div>
            </div>

            <table>
                <tbody>
                <tr>
                    <td><input className="checkbox" type="checkbox" id="vehicle1" name="checkbox" onChange={handleChange}></input></td>
                    <td><h5>Remember me</h5></td>
                    <td><h5><a className="href1" href="https://app.syncee.co/forgot-password">Forget password?</a></h5></td>
                </tr>
                </tbody>
            </table>

            <button type="button" onClick={onClickLogin}>Login</button>
            <h5>Not registered yet? <a href="https://app.syncee.co/login?requestUrl=%2F%3F_ga%3D2.218212505.1625391467.1691073770-2050278572.1691073770">Create an Account</a></h5>

            <h6>{messageEmail}</h6>
            <h6>{messagePassword}</h6>
            <h6>{messageCheck}</h6>

            <div className="styling1">2022 Syncee, All rights reserved.</div>
        </div>
    );
}

export default LeftSide;
