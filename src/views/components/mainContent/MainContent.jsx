import React from 'react';
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';

const useStyle = makeStyles({
    root: {
        minHeight: 'calc(100vh - 64px)',
        background: 'gray'
    },
    head: {
        padding: '16px 32px',
        borderBottom: '1px solid #CCC',
        borderRight: '1px solid #CCC',
        '&:first-child': {
            borderLeft: '1px solid #CCC'
        }
    },
    chatWrapper:{
        height: '100%'
    },
    roomsList: {
        borderRight: '1px solid #CCC',
        padding: '16px 32px',
    }
});

const MainContent = props => {
    const styles = useStyle();

    return (
            <Box className={styles.root} display="flex" flexDirection='column' justifyContent='space-between' >

                <Box >
                    <Grid container justify='space-between'>
                        <Grid
                            className={styles.head}
                            item
                            lg={3}
                        >
                            Выберите комату:
                        </Grid>
                        <Grid
                            className={styles.head}
                            item
                            lg={9}>
                            Текущая комната 'Яркая'
                        </Grid>
                    </Grid>
                </Box>

                <Box bgcolor="red" flexGrow={1}>
                    <Grid className={styles.chatWrapper} container>
                        <Grid
                            className={styles.roomsList}
                            item
                            lg={3}>
                            Список комнат
                        </Grid>
                        <Grid item lg={9}>
                            Чат
                        </Grid>
                    </Grid>
                </Box>

            </Box>
    );
};

export default MainContent;