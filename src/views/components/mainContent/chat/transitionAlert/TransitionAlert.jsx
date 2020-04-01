import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        left: '50%',
        transform: 'translate(-50%)',
        opacity: '0.7',
        width: '30%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function TransitionAlert({name, show}) {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    useEffect(() => {
        setOpen(show);
        setTimeout(() => {
            setOpen(false)
        }, 2500);
    }, [show, name]);


    return (
        <div className={classes.root}>
            <Collapse in={open}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit"/>
                        </IconButton>
                    }
                >
                    {name} входит в комнату
                </Alert>
            </Collapse>
        </div>
    );
}