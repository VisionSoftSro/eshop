import React, {useEffect, useState} from 'react';
import {Provider} from 'use-http';
import {AppBar, Container, Toolbar, ThemeProvider, CssBaseline, Link} from "@material-ui/core";
import {theme, useStyles} from "./Styles";
import {AppContext, useAppContext} from "./context/main/AppContext";
import {useTranslation} from "react-i18next";
import {Router, Redirect, Route, Switch, useHistory, useParams} from "react-router";
import {createBrowserHistory} from 'history';
import {Routes} from "./Routes";
const history = createBrowserHistory();
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


function App() {
    const {i18n} = useTranslation();
    console.log("lang", i18n.language);
    return (
        <Router history={history}>
            <Routes/>
            {/*<ThemeProvider theme={theme}>*/}
                {/*<CssBaseline />*/}
                {/*<Provider url='/api'>*/}
                    {/*<AppContext>*/}
                        {/*<Header />*/}
                        {/*<Routes/>*/}
                    {/*</AppContext>*/}
                {/*</Provider>*/}
            {/*</ThemeProvider>*/}
        </Router>
    );
}

export default App;
