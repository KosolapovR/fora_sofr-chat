import React from 'react';
import LoginForm from "./loginForm/LoginForm";
import {connect} from "react-redux";
import {createNickName} from "../../../state/chat";
import {Redirect} from "react-router-dom";

const Login = ({createNickName, user, prevUrl}) => {
    const handleSubmit = ({nickname}) => {
        createNickName(nickname);
    };

    const redirectUrl = prevUrl ? `/room/${prevUrl}` : "/";

    return (
        <>
            {user && <Redirect to={redirectUrl}/>}
            <LoginForm onSubmit={handleSubmit}/>
        </>
    );
};

const mapStateToProps = state => ({
    user: state.chat.user,
    prevUrl: state.chat.prevUrl
});

export default connect(mapStateToProps, {createNickName})(Login);