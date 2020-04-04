import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import {IconButton, Collapse} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        zIndex: '1000',
        left: '50%',
        transform: 'translate(-50%)',
        opacity: '0.7',
        width: '30%',
        minWidth: '200px',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function TransitionAlert({name, show}) {

    const classes = useStyles();
    const [open, setOpen] = useState(false);

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
                    variant='filled'
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