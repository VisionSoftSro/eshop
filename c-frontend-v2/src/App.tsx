import React, {useEffect, useState} from 'react';
import {Provider} from 'use-http';
import {PaymentMethod} from "./api/ApiTypes";
import {productImageUrl} from "./TemplateUtil";
import {AppBar, Container, Toolbar, ThemeProvider, CssBaseline, Link} from "@material-ui/core";
import {theme, useStyles} from "./Styles";
import {AppContext, useAppContext} from "./context/main/AppContext";
import {useTranslation} from "react-i18next";
import {BrowserRouter as Router, Redirect, Route, Switch, useHistory, useParams} from "react-router-dom";
import {Routes} from "./Routes";
import {GoodsPage} from "./page/GoodsPage";
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
    const {t, i18n} = useTranslation();

    console.log("muhehe");
    return (
        <ThemeProvider theme={theme}>
            {t("app.name")}
            <CssBaseline />
            <Provider url='/api'>
                <AppContext>
                    <Header />
                    <Router basename={`${i18n.language}`}>
                        <Routes/>
                    </Router>
                </AppContext>
            </Provider>
        </ThemeProvider>
    );
}

export default App;
