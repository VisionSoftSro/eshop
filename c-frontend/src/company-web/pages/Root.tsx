import * as React from "react";
import {connect} from "react-redux";
import {WebReducersState} from "../redux/WebRedux";
import Wrapper from "../../common/component/Wrapper";
import {Header} from "./theme/Header";
import {SectionType} from './theme/Sections';
import {OffersSection} from "./sections/OffersSection";
import {LocaleState} from "../../common/redux/reducers/locale/LocaleReducer";
import {changeLocale} from "../redux/reducers/LocaleActions";
import DataStorage from "../../common/DataStorage";
import {ProjectsSection} from "./sections/ProjectsSection";
import {ContactSection} from "./sections/ContactSection";
import moment from "moment";

const sections = () => {
    const sections: Array<SectionType> = [{
        name: Strings.Offers,
        component: OffersSection,
        props: {
            id: "offers"
        }
    }, {
        name: Strings.Projects,
        component: ProjectsSection,
        props: {
            id: "projects"
        }
    },{
        name: Strings.Contact,
        component: ContactSection,
        props: {
            id: "contact"
        }
    }];
    return sections;
};


class Root extends React.Component<LocaleState> {


    componentDidMount(): void {
        this.changeLocale(DataStorage.get("locale")||"cs");
    }

    changeLocale = (locale:string) => {
        this.props.dispatch(changeLocale(locale));
    };

    render() {
        const s = sections();
        return <Wrapper>
            <Header sections={s}/>
            {s.map(i=><i.component {...i.props} key={`section-${i.props.id}`}/>)}
            <footer className="bg-white">
                <div className="container text-center">
                    <div className="row">
                        <div className="col-lg-8 footer-left-area">
                            <p>© {moment().format('YYYY')} <b>Vision Soft s.r.o</b></p>
                        </div>
                        <div className="col-lg-4 social-icons footer-right-area">
                            <a href="#x" className="btn-social text-white"><i className="fab fa-facebook-f"></i></a>
                            <a href="#x" className="btn-social"><i className="fab fa-twitter"></i></a>
                            <a href="#x" className="btn-social"><i className="fab fa-google-plus-g"></i></a>
                        </div>
                    </div>
                </div>
            </footer>
        </Wrapper>;
    }
}
export default connect((state:WebReducersState) => state.locale)(Root);