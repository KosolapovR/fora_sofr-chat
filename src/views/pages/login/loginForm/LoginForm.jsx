import React from 'react';
import {Input} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {Field, reduxForm} from "redux-form";

const useStyles =makeStyles({
    form: {
        margin: '50px auto',
        width: 'fit-content'
    }
});

const renderedInput = ({input}) => {
    return <Input placeholder="Введите ваш никнейм" {...input}/>
};

function LoginForm({handleSubmit}) {

    const styles = useStyles();

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <Field name="nickname" type="text" component={renderedInput}/>
            <Button type='submit' variant="contained" color="primary">Сохранить</Button>
        </form>
    );
}

export default reduxForm({form: 'loginForm'})(LoginForm);