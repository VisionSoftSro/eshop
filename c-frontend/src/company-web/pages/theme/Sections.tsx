import * as React from "react";
import {AssetCache} from "../../AssetCache";


class TestContent extends React.Component<SectionComponentProps> {
    render() {
        return <section id={this.props.id} className="bg-primary-hover dark p-0">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="promo-box text-left inner-space">
                            <div className="spacer">&nbsp;</div>
                            <div className="promo-icon-bg icon-md ml-0 border-white">
                                <img src={AssetCache.Image.Test.One} alt="" className="promo-box-icon"/>
                            </div>
                            <h5 className="box-title">RESPONSIVE</h5>
                            <p className="box-description mb-0 text-white">Fully responsive Bootstrap 4 Theme.
                                SimplyCity Bootstrap Theme looks and works perfectly on all devices.</p>
                            <div className="spacer">&nbsp;</div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="promo-box text-center inner-space bg-primary">
                            <div className="spacer">&nbsp;</div>
                            <div className="promo-icon-bg icon-md border-white">
                                <img src={AssetCache.Image.Test.Two} alt="" className="promo-box-icon"/>
                            </div>
                            <h5 className="box-title">MODERN DESIGN</h5>
                            <p className="box-description mb-0 text-white">Clean &amp; Modern Design. SimplyCity in v2
                                was redesigned to fit the latest design standards &amp; trends.</p>
                            <div className="spacer">&nbsp;</div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="promo-box text-right inner-space">
                            <div className="spacer">&nbsp;</div>
                            <div className="promo-icon-bg icon-md mr-0 border-white">
                                <img src={AssetCache.Image.Test.Three} alt="" className="promo-box-icon"/>
                            </div>
                            <h5 className="box-title">MULTIPURPOSE</h5>
                            <p className="box-description mb-0 text-white">SimplyCity suits for multiple purposes of
                                websites where you need a one-pager site, 6+ premade demos.</p>
                            <div className="spacer">&nbsp;</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>;
    }
}

export interface SectionComponentProps {
    id: string
}

export type SectionComponent = React.ComponentType<SectionComponentProps>;

export interface SectionType {
    name: string,
    component: SectionComponent,
    props: SectionComponentProps
}