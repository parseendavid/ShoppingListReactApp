import axiosConfig from "../extras/axios_config";
import {toast} from "react-toastify";

export const FETCH_SHOPPING_LISTS = "fetch_shopping_lists";
export const FETCH_SHOPPING_LIST_ITEMS = "fetch_shopping_list_items";
export const FETCH_JWT_TOKEN = "fetch_jwt_token";

export function SignUp_User(values) {
    return (dispatch) => {
        axiosConfig.request({
            method: "post",
            url: `/auth/register/`,
            data: values
        })
        .then((response) => {
            toast.info(response.data.message);
        })
        .catch(
            error =>{
                console.log(error);
            }
        );
    };
}

export function Login_User(values) {
    return (dispatch) => {
        axiosConfig.request({
            method: "post",
            url: `/auth/login/`,
            data: values
        })
        .then((response) => {
            toast.success(response.data.message);
            dispatch({
                type: FETCH_JWT_TOKEN,
                payload: response
            });
        })
        .catch(()=>{
            toast.error("INVALID CREDENTIALS !!!!");
            });
        };
}

export function Fetch_Shopping_Lists() {
    return (dispatch) => {
        axiosConfig.request({
            method: "get",
            url: `/lists`,
            headers: {
                "x-access-token": localStorage.getItem("TOKEN")
            }
        }).then((response) => {
            dispatch({
                type: FETCH_SHOPPING_LISTS,
                payload: response
            });
        });
    };
}


export function Fetch_Shopping_List_Items(store) {
    return (dispatch) => {
        axiosConfig.request({
            method: "get",
            url: `/lists/1/items`,
            headers: {
                "x-access-token": store.getState().token
            }
        }).then((response) => {
            dispatch({
                type: FETCH_SHOPPING_LIST_ITEMS,
                payload: response
            });
        });
    };

}