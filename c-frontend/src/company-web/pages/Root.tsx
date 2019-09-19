import * as React from "react";
import {connect} from "react-redux";
import store, {WebReducersState} from "../redux/WebRedux";
import Wrapper from "../../common/component/Wrapper";
import {Header} from "./theme/Header";
import {SectionType} from './theme/Sections';
import {OrdersSection} from "./sections/OrdersSection";
import {LocaleState} from "../../common/redux/reducers/locale/LocaleReducer";
import {changeLocale} from "../redux/reducers/LocaleActions";
import DataStorage from "../../common/DataStorage";
import {Link} from "../../common/component/Link";

const sections = () => {
    const sections: Array<SectionType> = [{
        name: Strings.Offers,
        component: OrdersSection,
        props: {
            id: "orders"
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
            {s.map(i=><i.component {...i.props} key={`section-${i}`}/>)}
            <footer className="bg-white">
                <div className="container text-center">
                    <div className="row">
                        <div className="col-lg-8 footer-left-area">
                            <p>© 2018 <b>SimplyCity</b> by <a href="https://kingstudio.ro" target="_blank"><b>KingStudio</b></a>. All Rights Reserved.</p>
                        </div>
                        <div className="col-lg-4 social-icons footer-right-area">
                            <a href="#x" className="btn-social text-white"><i className="fab fa-facebook-f"></i></a>
                            <a href="#x" className="btn-social"><i className="fab fa-twitter"></i></a>
                            <a href="#x" className="btn-social"><i className="fab fa-google-plus-g"></i></a>
                        </div>
                    </div>
                    <Link href={()=>this.changeLocale("en")}>EN</Link>
                    <Link href={()=>this.changeLocale("cs")}>CS</Link>
                </div>
            </footer>
        </Wrapper>;
    }
}
export default connect((state:WebReducersState) => state.locale)(Root);