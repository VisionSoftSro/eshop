
// @ts-ignore
import DataTable from 'react-data-table-component';
import * as React from "react";
import {JsonProperty, ObjectMapper} from "../utils/ObjectMapper";
import {http, httpEndpoint} from "../utils/HttpUtils";
import {Loading} from "./Loading";
import {Form, FormField} from "./form/Form";
import Wrapper from "./Wrapper";
import Collapse from "react-bootstrap/Collapse";
import {CSSProperties, MouseEventHandler, ReactElement} from "react";
import qs from 'qs';
import {JsonList} from "../utils/Util";
export const tableTheme = Object.freeze({
    title: {
        fontSize: '22px',
        fontColor: 'rgba(0,0,0,.87)',
        backgroundColor: 'transparent',
        height: '56px',
    },
    header: {
        fontSize: '16px',
        fontColor: 'rgb(255,255,255)',
        backgroundColor: 'rgba(30,30,30,0.9)',
        height: '60px',
    },
    contextMenu: {
        backgroundColor: '#e3f2fd',
        fontSize: '18px',
        fontColor: 'rgba(0,0,0,.87)',
        transitionTime: '225ms',
    },
    rows: {
        // default || spaced
        spacing: 'default',
        fontSize: '16px',
        fontColor: 'rgba(0,0,0,.87)',
        backgroundColor: (i:any)=>i.children[1].props&&i.children[1].props.row.backgroundColor || "white",
        borderWidth: '1px',
        borderColor: 'rgba(0,0,0,.12)',
        stripedColor: 'rgba(0,0,0,.03)',
        hoverFontColor: 'rgba(0,0,0,.87)',
        hoverBackgroundColor: 'rgba(0,0,0,.01)',
        height: '48px',
    },
    cells: {
        cellPadding: '48px',
    },
    expander: {
        fontColor: 'rgba(0,0,0,.87)',
        backgroundColor: 'transparent',
        collapsedButton: 'data:image/svg+xml,%3Csvg%20fill%3D%22%23757575%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M8.59%2016.34l4.58-4.59-4.58-4.59L10%205.75l6%206-6%206z%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0-.25h24v24H0z%22%20fill%3D%22none%22/%3E%0A%3C/svg%3E',
        expandedButton: 'data:image/svg+xml,%3Csvg%20fill%3D%22%23757575%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M7.41%207.84L12%2012.42l4.59-4.58L18%209.25l-6%206-6-6z%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0-.75h24v24H0z%22%20fill%3D%22none%22/%3E%0A%3C/svg%3E',
    },
    pagination: {
        fontSize: '13px',
        fontColor: 'rgba(0,0,0,.54)',
        backgroundColor: 'transparent',
        buttonFontColor: 'rgba(0,0,0,.54)',
        buttonHoverBackground: 'rgba(0,0,0,.12)',
    },
});



export class AjaxTableFilter extends React.Component {
    render() {
        return this.props.children;
    }
}

type FilterData = {[key:string]:any};
export class AjaxTableButton {
    onClick:()=>void;
    text:string|ReactElement;
    className?:string;
    style?:CSSProperties;
    render?:(def:AjaxTableButton)=>ReactElement
}
interface AjaxTableProps<A> {
    dataTableProps?: {[key:string]:any}
    url:string;
    buttons?:Array<AjaxTableButton>;
    constructor:{new(): A};
}
class AjaxTableState<A> {
    list:ScrollableList<A> = new ScrollableList<A>();
    loading:boolean = true;
}

class ScrollableList<A> extends JsonList<A>{
    @JsonProperty()
    page:number;
    @JsonProperty()
    objectsPerPage:number;
    @JsonProperty()
    total:number;
    @JsonProperty()
    pages:number;
}

const DEFAULT_PAGE = 1;
const DEFAULT_ROWS = 10;

class Filter {
    page:number = DEFAULT_PAGE;
    rows:number = 10;
    data:FilterData = {};

    resetPage() {
        this.page = DEFAULT_PAGE;
    }

    toParams() {
        const pagination = `page=${this.page}&pageSize=${this.rows}`;
        const params = qs.stringify(this.data, {allowDots: true, arrayFormat: 'indices'});
        return `${pagination}&${params}`;
    }

}

interface FilterCollapsibleState {
    expanded:boolean;
    buttons?:Array<AjaxTableButton>;
}
class FilterCollapsible extends React.Component<FilterCollapsibleState, FilterCollapsibleState> {

    static defaultProps = {expanded:false};

    state = {expanded:this.props.expanded};

    renderToggleButton() {
        return <div className="rs-select2--light">
            <button className={this.state.expanded ? "au-btn-filter btn-secondary" : "au-btn-filter"}
                    onClick={(e) => {
                        e.preventDefault();
                        this.setState({ expanded: !this.state.expanded })
                    }}
                    style={{ textTransform: "none" }}
                    aria-controls="filter-collapse"
                    aria-expanded={this.state.expanded}><i className="zmdi zmdi-filter-list" />{this.state.expanded ? "Vypnout pamatování filtru" : "Filtr"}
            </button>
        </div>;
    }

    render() {
        return <Wrapper>
            <div className="table-data__tool" style={{ marginBottom: 15 }}>
                <div className="table-data__tool-left">
                    {this.renderToggleButton()}
                </div>
                <div className="">
                    {this.props.buttons&&this.props.buttons.map((button, i)=>{
                        if(button.render) {
                            return button.render(button);
                        }
                        return <button key={i} className={button.className}
                                       onClick={button.onClick}>
                            {button.text}
                        </button>;
                    })}
                </div>
            </div>
            <Collapse in={this.state.expanded}>
                <div id="filter-collapse" className="card table--no-card m-b-30 not-overflow" /*hidden={!this.state.expandedFilter}*/
                     style={{ marginBottom: 15 }}>
                    <div className="card-header col-md-12 form-row">
                        {this.props.children}
                    </div>
                </div>
            </Collapse>
        </Wrapper>;
    }
}

interface TableProps<A> extends AjaxTableProps<A> {
    filter:Filter;
}
class Table<A> extends React.Component<TableProps<A>, AjaxTableState<A>> {
    state = new AjaxTableState<A>();
    filter:Filter = this.props.filter;
    async getData(resetPage:boolean=false) {
        if(resetPage) {
            this.filter.resetPage();
        }
        const result = await httpEndpoint<ScrollableList<A>>(ScrollableList, `${this.props.url}?nextIsPage=true&${this.filter.toParams()}`);
        if(result) {
            result.data.list = new ObjectMapper<A>().readValueAsArray(this.props.constructor, result.data.list);
            this.setState({list:result.data, loading:false})
        }
    }


    async componentDidMount() {
        await this.getData();
    }

    async onChangePage(page:number, totalRows:number) {
        this.filter.page = page;
        await this.getData();
    }
    async onRowsPerPageChangePage(currentRowsPerPage:number, currentPage:number) {
        this.filter.page = currentPage;
        this.filter.rows = currentRowsPerPage;
        await this.getData();
    }

    async cleanFilter(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        Object.keys(this.filter.data).forEach(i=>delete this.filter.data[i]);
        await this.getData();
    }



    render() {
        if(this.state.loading) {
            return <Loading show style={{color:"black"}} />
        }
        return <DataTable {...{customTheme: tableTheme, ...this.props.dataTableProps}} data={this.state.list.list}
                          onChangePage={this.onChangePage.bind(this)}
                          onChangeRowsPerPage={this.onRowsPerPageChangePage.bind(this)}
                          pagination
                          paginationServer
                          paginationPerPage={this.filter.rows}
                          paginationTotalRows={this.state.list.total}

        />;
    }
}

export class AjaxTable<A> extends React.Component<AjaxTableProps<A>, AjaxTableState<A>> {

    table:Table<A>;
    filter = new Filter();
    form:Form<FilterData>;
    renderChildren() {
        return React.Children.map(this.props.children,child=>{
            if (React.isValidElement(child) && child.type == AjaxTableFilter) {
                return <Form<FilterData> data={this.filter.data} onChange={()=>this.table.getData(true)} simpleLabel ref={o=>this.form=o}>
                    <FilterCollapsible buttons={this.props.buttons}>
                        {child}
                        <div style={{ position: "absolute", right: 10 }}>
                            <button className="au-btn au-btn-icon btn-secondary au-btn--small text_small"
                                    style={{ height: 35, lineHeight: "35px" }}
                                    onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>this.table.cleanFilter(e).then(()=>this.form.forceUpdate())}><i className="zmdi zmdi-close" />
                                {Strings["CleanFilter"]}
                            </button>
                        </div>
                    </FilterCollapsible>
                </Form>;
            }
            return child;
        });
    }

    async reload() {
        await this.table.getData();
    }

    render() {
        return <Wrapper>
            {this.renderChildren()}
            <Table {...this.props} ref={o=>this.table=o} filter={this.filter} />
        </Wrapper>
    }

}