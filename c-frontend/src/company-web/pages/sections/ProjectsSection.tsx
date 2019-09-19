import * as React from "react";
import {SectionComponentProps} from "../theme/Sections";
import {AssetCache} from "../../AssetCache";

export class ProjectsSection extends React.Component<SectionComponentProps> {

    render() {
        return <section id={this.props.id} className="bg-white">
            <div className="container">
                <h2 className="text-center">Naše projekty</h2>
                <div className="spacer spacer-line border-primary">&nbsp;</div>
                <div className="spacer">&nbsp;</div>
                <div className="row vcenter">
                    <div className="col-lg-6">
                        <h3>Seznam se Online</h3>
                        Seznamování přes internet je velký fenomén dnešní doby. Seznam se Online je bezkonkurenční česká online seznamka cílená na snadné seznámení.
                        Mezi hlavní přednosti a výhody seznamky proti konkurenci patří nulové poplatky, transparentnost všech funkcí
                        a rychlé založení profilu bez zdlouhavého vyplňování.
                    </div>
                    <div className="col-lg-6 lightbox">
                        <div className="video-testimonial">
                            <img src={AssetCache.Image.SSO} alt="" className="video-testimonial-image"/>
                        </div>
                    </div>
                </div>
                <div className="row vcenter">
                    <div className="col-lg-6 lightbox">
                        <div className="video-testimonial">
                            <img src={AssetCache.Image.SSO} alt="" className="video-testimonial-image"/>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <h3>Seznam se Online</h3>
                        Seznamování přes internet je velký fenomén dnešní doby. Seznam se Online je bezkonkurenční česká online seznamka cílená na snadné seznámení.
                        Mezi hlavní přednosti a výhody seznamky proti konkurenci patří nulové poplatky, transparentnost všech funkcí
                        a rychlé založení profilu bez zdlouhavého vyplňování.
                    </div>
                </div>
            </div>
        </section>
    }

}