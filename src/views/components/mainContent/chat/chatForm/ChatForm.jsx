import React from 'react';
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {Field, reduxForm} from "redux-form";

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    input: {
        flexGrow: 1
    },
}));

const renderedInput = ({input, ...props}) => {
    return(
        <TextField
            className={props.className}
            variant='outlined'
            multiline
            rows={2}
            {...input}
            placeholder='Введите сообщение...'
        />
    )
};

const ChatForm = ({handleSubmit, onChange}) => {

    const styles = useStyles();

    return (
        <form
            onSubmit={handleSubmit}
            className={styles.form}
        >
            <Field  className={styles.input} name='message' type='text' onChange={onChange} component={renderedInput}/>
            <Button type='submit' variant='contained'>Отправить</Button>
        </form>
    );
};

export default reduxForm({form: 'messageForm'})(ChatForm);