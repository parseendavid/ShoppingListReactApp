import axios from "axios"

export const FETCH_SHOPPING_LISTS = "fetch_shopping_lists"
export const FETCH_SHOPPING_LIST_ITEMS = "fetch_shopping_list_items"
const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwdWJsaWNfaWQiOiIyNDI2YzE2Yy01MDMwLTRjMGQtOTk5ZC1mMDM0YmJhZGE2MjgiLCJleHAiOjE1MTE3ODcyMjB9.M6uPUlQAauhyda-cDM4Ok67ion-Zxb3KX8G2NBfUV10"


export function Fetch_Shopping_Lists(){
    const request = axios(
        {
            method: 'get',
            url: 'http://127.0.0.1:5000/lists',
            headers:{
                "x-access-token":token
            }
            
        }
          
    )
    return({
        type: FETCH_SHOPPING_LISTS,
        payload: request
    }
    )
}
export function Fetch_Shopping_List_Items(){
    const request = axios(
        {
            method: 'get',
            url: 'http://127.0.0.1:5000/list/1/items',
            headers:{
                "x-access-token":token
            }
            
        }
          
    )
    return({
        type: FETCH_SHOPPING_LIST_ITEMS,
        payload: request
    }
    )
}