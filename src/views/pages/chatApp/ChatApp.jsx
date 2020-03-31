import React from 'react';
import Container from "@material-ui/core/Container";
import TopNavigation from "../../components/topNavigation";
import MainContent from "../../components/mainContent";


const ChatApp = (props) => {

    return (
        <>
            <TopNavigation/>
            <Container
                maxWidth='lg'>
                <MainContent/>
            </Container>
        </>
    );
};

export default ChatApp;