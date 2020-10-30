import {Query, QueryResult} from "material-table";
import {OrderDto} from "../dto/OrderDto";
import {httpEndpoint} from "../../common/utils/HttpUtils";
import {exist, jsonToFormUrlEncoded, ScrollableList} from "../../common/utils/Util";
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
            const toParam = (_map:GenericMap, prefix:string=""):string => {
                return `${Object.keys(_map).filter(key => (exist(_map[key]))).map(key => {
                    const value = _map[key];
                    if(Array.isArray(value)) {
                        return value.map(m=>toParam({[key]:m})).join("&");
                    } else if(typeof value === "object") {
                        return toParam(value as GenericMap, `${key}.`);
                    }
                    return `${encodeURI(prefix)}${encodeURI(key)}=${encodeURI(`${value}`)}`;
                }).filter(value=>value !== "").join("&")}`;
            };
            //column filter
            params.push(toParam(query.filters.reduce((map, obj) => {
                // @ts-ignore
                map[obj.column.field] = obj.value;
                return map;
            }, {})));
            // params.push(`${query.filters.map(filter=>`${filter.column.field}=${filter.value}`).join("&")}`);
        }
        //order by
        if(query.orderBy) {
            params.push(`${encodeURI(`order[0].name`)}=${query.orderBy.field}&${encodeURI(`order[0].dir`)}=${query.orderDirection}`);
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