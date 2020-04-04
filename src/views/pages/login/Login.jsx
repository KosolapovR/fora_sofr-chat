import React, {useState} from 'react';
import LoginForm from "./loginForm/LoginForm";
import {connect} from "react-redux";
import {createUser} from "../../../state/chat";
import {Redirect} from "react-router-dom";

const Login = ({createUser, user, prevUrl}) => {

    const [selectedIcon, setSelectedIcon] = useState('http://localhost:3000/icons/default.svg');

    const handleSubmit = ({nickname}) => {
        createUser({name: nickname, icon: selectedIcon});
    };

    //если пользователь зашел по ссылке,
    //после авторизации редиректим на эту ссылку
    const redirectUrl = prevUrl ? `/room/${prevUrl}` : "/";

    return (
        <>
            {user && <Redirect to={redirectUrl}/>}
            <LoginForm
                selectedIcon={selectedIcon}
                handleChange={icon => setSelectedIcon(icon)}
                onSubmit={handleSubmit}
            />
        </>
    );
};

const mapStateToProps = state => ({
    user: state.chat.user,
    prevUrl: state.chat.prevUrl
});

export default connect(mapStateToProps, {createUser})(Login);