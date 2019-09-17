import * as React from "react";
import {ReactElement} from "react";
// @ts-ignore
import DataTable from 'react-data-table-component';
import {Preprava} from "../../ts_legacy/Models";
import {AjaxTable} from "./AjaxTable";


interface ViewControllerProps {
    url:string
}

export class ViewController extends React.Component<ViewControllerProps> {

    render() {
        return <div>

        </div>;
    }

}

class HiddenProps {
    url:string
}

interface ViewControllerListProps {
    dataTableProps?: {[key:string]:any}
}
export class ViewControllerList extends React.Component<ViewControllerListProps> {

    // @ts-ignore
    hiddenProps:HiddenProps = this.props.hiddenProps;

    render() {
        return <AjaxTable url={this.hiddenProps.url}/>;
    }
}

export class ViewControllerForm extends React.Component {
    render() {
        return <div>

        </div>;
    }
}