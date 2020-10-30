import {Query, QueryResult} from "material-table";
import {OrderDto} from "../dto/OrderDto";
import {httpEndpoint} from "../../common/utils/HttpUtils";
import {jsonToFormUrlEncoded, ScrollableList} from "../../common/utils/Util";
import {Mapper} from "../../common/utils/objectmapper/Mapper";
import {GoodsDto} from "../dto/GoodsDto";

export const useOrdersQuery = (passcode:string) => useDataQuery("storage/list", passcode, OrderDto)
export const useGoodsQuery = (passcode:string) => {
    const [listQuery] = useDataQuery("storage/goods", passcode, GoodsDto);
    const saveData = async(goods:GoodsDto) => {
        return await httpEndpoint<GoodsDto>(GoodsDto, "/storage/goods/save", {method:"POST", body:jsonToFormUrlEncoded(goods), headers:{"passcode":passcode}})
    };
    return {
        saveData,
        listQuery
    }
}

const useDataQuery = <RowData extends object> (uri:string, passcode:string, clazz:{new(): RowData}) => {
    const doQuery =  async(query:Query<RowData>):Promise<QueryResult<RowData>> => {
        let params = new Array<string>();

        //column filter
        if(query.filters.length > 0) {
            params.push(`${query.filters.map(filter=>`${filter.column.field}=${filter.value}`).join("&")}`);
        }
        //order by
        if(query.orderBy) {
            params.push(`sortBy=${query.orderBy.field}&sortDir=${query.orderDirection}`);
        }
        //search
        if(query.search) {
            params.push(`term=${query.search}`);
        }
        //pagination
        if(query.page !== null && query.pageSize !== null) {
            params.push(`page=${query.page + 1}&pageSize=${query.pageSize}`);
        }
        let url = `${uri}?${params.join("&")}`;
        const result = await httpEndpoint<ScrollableList<RowData>>(ScrollableList, url, {method:"GET", headers:{"passcode":passcode}});
        return {
            data:new Mapper({constructor:clazz}).readValueAsArray(result.data.list),
            page:result.data.page-1 || 0,
            totalCount:result.data.total || 0
        }
    };
    return [doQuery];
};