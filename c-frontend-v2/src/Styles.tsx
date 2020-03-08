import {createMuiTheme, makeStyles} from "@material-ui/core/styles";
import { orange } from '@material-ui/core/colors';

export const theme = createMuiTheme({
    palette:{
        primary: {
            main: "#4ba82e"
        }
    }
});

export const useStyles = makeStyles(theme => ({
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarContainer: {
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    // this group of buttons will be aligned to the right side
    toolbarButtons: {
        marginLeft: 'auto',
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
    typography: {
        padding: theme.spacing(2),
    },
    title: {
        fontSize: 14,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        position:"absolute"
    },
    card: {
        position: "relative",
        padding: 20
    }
}));
