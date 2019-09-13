import {Route} from "react-router";
import Wrapper from "./Wrapper";
import * as React from "react";


class StyleLoader extends React.Component {

    state = {loaded:false};
    cssLink:any;
    componentDidMount() {
        const loadStyleSheet = ( path:any, fn:any, scope:any ) => {
            var head = document.getElementsByTagName( 'head' )[0], // reference to document.head for appending/ removing link nodes
                link = document.createElement( 'link' );           // create the link node
            link.setAttribute( 'href', path );
            link.setAttribute( 'rel', 'stylesheet' );
            link.setAttribute( 'type', 'text/css' );
            this.cssLink = link;
            var sheet:any, cssRules:any;
// get the correct properties to check for depending on the browser
            if ( 'sheet' in link ) {
                sheet = 'sheet'; cssRules = 'cssRules';
            }
            else {
                sheet = 'styleSheet'; cssRules = 'rules';
            }

            var interval_id = setInterval( function() {                     // start checking whether the style sheet has successfully loaded
                    try {
                        // @ts-ignore
                        if ( link[sheet] && link[sheet][cssRules].length ) { // SUCCESS! our style sheet has loaded
                            clearInterval( interval_id );                      // clear the counters
                            clearTimeout( timeout_id );
                            fn.call( scope || window, true, link );           // fire the callback with success == true
                        }
                    } catch( e ) {} finally {}
                }, 10 ),                                                   // how often to check if the stylesheet is loaded
                timeout_id = setTimeout( function() {       // start counting down till fail
                    clearInterval( interval_id );             // clear the counters
                    clearTimeout( timeout_id );
                    head.removeChild( link );                // since the style sheet didn't load, remove the link node from the DOM
                    fn.call( scope || window, false, link ); // fire the callback with success == false
                }, 15000 );                                 // how long to wait before failing

            head.appendChild( link );  // insert the link node into the DOM and start loading the style sheet

            return link; // return the link node;
        };
        // @ts-ignore
        loadStyleSheet( this.props.css, ( success, link ) => {
            if ( success ) {
                this.setState({loaded:true});
            }
            else {
                // code to execute if the style sheet failed to successfully
            }
        } );
    }

    componentWillUnmount() {
        this.cssLink.remove();
    }

    render() {
        // @ts-ignore
        return this.state.loaded&&this.props.component(this.props.routeProps)||<div className={"style-loader-bg"}/>;
    }
}

// @ts-ignore
export const PathRoute = p => {



    const {component, css, ...props} = p;


    return <Route {...props} render={(props) => {
        let c = <Wrapper>
            {component(props)}
        </Wrapper>;
        if(typeof css !== 'undefined') {
            // c = <link rel="stylesheet" type="text/css" href={STYLES_URL + css} />;
            // @ts-ignore
            c = <StyleLoader css={STYLES_URL + css} routeProps={props} component={component} key={css} />
        }
        return c;
    }} />;

};