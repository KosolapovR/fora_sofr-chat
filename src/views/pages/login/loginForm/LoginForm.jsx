import React from 'react';
import {TextField, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Field, reduxForm} from "redux-form";
import IconsList from "../iconsList";
import {maxLength15} from "../../../../utils/formValidator";

const useStyles = makeStyles({
    form: {
        margin: '50px auto',
        width: 'fit-content'
    },
    button: {
        marginLeft: '10px'
    }
});

const renderedInput = ({input, meta: {touched, error}}) => {
    return (<>
        {touched && error ?
            <TextField
                required
                error
                helperText={error}
                {...input}
            />
            :
            <TextField
                required
                placeholder="Введите ваш никнейм"
                {...input}
            />}
    </>);

};

function LoginForm({handleSubmit, handleChange, selectedIcon}) {

    const styles = useStyles();

    return (
        <>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Field name="nickname" type="text" validate={[maxLength15]} component={renderedInput}/>
                <Button className={styles.button} type='submit' variant="contained" color="primary">Сохранить</Button>
            </form>
            <IconsList handleChange={handleChange} selectedIcon={selectedIcon}/>
        </>
    );
}

export default reduxForm({form: 'loginForm'})(LoginForm);