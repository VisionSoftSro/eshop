import React from 'react';
import {Provider} from 'use-http';
import {PaymentMethod} from "./api/ApiTypes";
import {productImageUrl} from "./TemplateUtil";
import {AppBar, Container, Toolbar, ThemeProvider, CssBaseline} from "@material-ui/core";
import {theme, useStyles} from "./Styles";
import {AppContext, useAppContext} from "./context/main/AppContext";

const size = "md";
function Header() {
    // const {push} = useHistory();
    const classes = useStyles();
    return (
        <AppBar position="sticky" elevation={0} className={classes.appBar}>
            <Container maxWidth={size} className={classes.toolbarContainer}>
                <Toolbar className={classes.toolbar}>
                    {/*<img src={require("./assets/images/logo.png")} alt={"logo"}/>*/}
                    <div className={classes.toolbarButtons}>

                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
}


function Body() {
    const {paymentMethods, shippingMethods} = useAppContext();

    return (
        <div className="App">
            {paymentMethods.map(item => <div key={item.id}>{item.code}</div>)}
            {shippingMethods.map(item => <div key={item.id}>{item.code}</div>)}
        </div>
    );
}

function App() {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider url='/api'>
                <AppContext>
                    <Header />
                    <Body/>
                </AppContext>
            </Provider>
        </ThemeProvider>
    );
}

export default App;
