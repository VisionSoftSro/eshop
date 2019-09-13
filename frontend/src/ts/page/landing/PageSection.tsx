import React from 'react';
import PropTypes from 'prop-types';


interface PageSectionProps {
    placeholder:string;
}
interface PageSectionRenderer {
    renderContent:()=>React.Component
}
//@ts-ignore
export default abstract class PageSection extends React.Component<PageSectionProps> implements PageSectionRenderer {

    className = "";
    render() {
        //@ts-ignore
        return <section id={this.props.placeholder} className={this.getClassName()}>{this.renderContent()}</section>;
    }

    getClassName() {
        return "";
    }


}
