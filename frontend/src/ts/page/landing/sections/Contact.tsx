import React from 'react';
import PageSection from '../PageSection';
import cs from "classnames";
import {LocalizedPage} from "../../../components/LocalizedPage";


class Localization {
    cs() {
        return <div className="container">
            <h2>Kontakt a Podpora</h2>
            {/*<p className="header-details"><span className="highlight">Any text</span></p>*/}
            <p><strong>Email:</strong> info@binaria.cz</p>
        </div>;
    }
}

export default class Contact extends PageSection {

    renderContent() {
        return <div className="view">
            <div className={cs("content background-solid", this.props.bg||"colors-e")}>
                <LocalizedPage provider={Localization}/>
            </div>
        </div>;
    }

}