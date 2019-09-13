import React from 'react';
import PageSection from '../PageSection';
import {LocalizedPage} from "../../../components/LocalizedPage";

class Localization {
    cs() {

        return <div className="container-fluid"><h3>Projekt <span className={"binaria-font highlight"}>Binaria</span> je stále ve vývoji a to včetně této stránky.</h3></div>;
        // return <div className="container-fluid">
        //     <h3>Hra bude <span className="highlight">spuštěna</span></h3>
        //     <p className="title">za</p>
        //     <div className="row counters">
        //         <div className="col-md-3 counter background-35-b">
        //             <div className="count player row heading background-10-light">50</div>
        //             <div className="caption">Dnů</div>
        //         </div>
        //         <div className="col-md-3 counter background-35-h">
        //             <div className="count player row heading background-10-light">20</div>
        //             <div className="caption">Hodin</div>
        //         </div>
        //         <div className="col-md-3 counter background-35-b">
        //             <div className="count player row heading background-10-light">30</div>
        //             <div className="caption">Minut</div>
        //         </div>
        //         <div className="col-md-3 counter background-35-h">
        //             <div className="count player row heading background-10-light">50</div>
        //             <div className="caption">Sekund</div>
        //         </div>
        //     </div>
        // </div>;
    }
}

export default class ReleaseInfo extends PageSection {



    renderContent() {
        
        return <div className="view" id="numbers">
            <div className="content half-size colors-h">
                <LocalizedPage provider={Localization} />
            </div>
        </div>;
    }

}