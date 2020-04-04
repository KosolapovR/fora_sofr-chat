import React, {useState} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import Picker from 'emoji-picker-react';
import {Input, Button, Grid, Paper, Popover} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SendIcon from '@material-ui/icons/Send';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';


const useStyles = makeStyles((theme) => ({
    form: {
        position: 'relative',
        margin: '0 10px 10px',
        padding: '10px 0',
        display: 'flex',
        justifyContent: 'space-betweaen',
        alignItems: 'center',
        width: '100%',
        minWidth: '320px',
        maxWidth: '600px',
        borderRadius: '20px',
    },
    button: {
        margin: '0 10px',
        width: '40px',
        height: '40px',
        borderRadius: '40px',
    },
    sendIcon: {
        width: '30px',
        transform: 'rotate(-45deg)'
    },
    smile: {
        margin: '0 15px 0 15px',
        cursor: 'pointer',
        '&:hover': {
            color: 'orange'
        }
    },
    emojiWrapper: {
        position: 'absolute',
        top: '-10px'
    }

}));

const renderedInput = ({input}) => {
    return (
        <Input
            autoFocus
            disableUnderline={true}
            fullWidth
            {...input}
            placeholder='Введите сообщение...'
        />
    )
};

const ChatForm = ({handleSubmit, messageForm, onChange, change}) => {

    const [anchorEl, setAnchorEl] = useState(null);

    const onEmojiClick = (event, emojiObject) => {
        if (messageForm && messageForm.values) {
            change('message', messageForm.values.message + emojiObject.emoji);
        } else {
            change('message', emojiObject.emoji);
        }
        handleClose();
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const styles = useStyles();
    const open = Boolean(anchorEl);


    return (
        <form
            onSubmit={handleSubmit}
        >
            <Grid container justify='center'>
                <Paper className={styles.form}>
                    <InsertEmoticonIcon
                        className={styles.smile}
                        onClick={handleClick}
                    />
                    <Popover
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        id='simple-popover'
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                    >
                        <Picker onEmojiClick={onEmojiClick}/>
                    </Popover>
                    <Field
                        className={styles.input}
                        name='message'
                        type='text'
                        onChange={onChange}
                        component={renderedInput}
                    />
                    <Button
                        className={styles.button}
                        type="submit"
                        variant='contained'
                        color='secondary'
                    >
                        <SendIcon className={styles.sendIcon}/>
                    </Button>
                </Paper>
            </Grid>
        </form>
    );
};

const mapStateToProps = state => ({
    messageForm: state.form.messageForm
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({change: 'change'}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'messageForm'})(ChatForm));