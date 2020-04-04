import React from 'react';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        color: '#acacac',
        fontStyle: 'italic',
        margin: '8px auto',
        maxWidth: '660px'

    }
});

function TypingSpinner({name}) {

    const styles = useStyles();

    return (
        <div className={styles.root}>{name} набирает текст...</div>
    );
}

export default TypingSpinner;