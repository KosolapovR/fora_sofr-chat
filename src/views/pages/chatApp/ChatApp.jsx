import React from 'react';
import Container from "@material-ui/core/Container";
import TopNavigation from "../../components/topNavigation";
import MainContent from "../../components/mainContent";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import openSocket from "socket.io-client";
import {savePrevUrl} from "../../../state/chat";
import {useParams} from "react-router-dom";

const socket = openSocket('http://localhost:6600');

const ChatApp = ({user, isJoined, savePrevUrl, prevUrl}) => {

    let id = useParams();

    if (!user) {
        savePrevUrl(id);
        return <Redirect to='/login'/>;
    } else {
        return (
            <>
                <TopNavigation/>
                <Container
                    maxWidth='lg'>
                    <MainContent isJoined={isJoined} socket={socket}/>
                </Container>
            </>
        );
    }
};

const mapStateToProps = state => ({
    user: state.chat.user,
    prevUrl: state.chat.prevUrl
});

export default connect(mapStateToProps, {savePrevUrl})(ChatApp);