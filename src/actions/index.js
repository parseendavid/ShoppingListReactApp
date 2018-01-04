import axiosConfig from "../extras/axios_config";
import {toast} from "react-toastify";

export const FETCH_SHOPPING_LISTS = "fetch_shopping_lists";
export const FETCH_SHOPPING_LIST_ITEMS = "fetch_shopping_list_items";
export const FETCH_JWT_TOKEN = "fetch_jwt_token";
///////////////////////////////////////////
//                                      //
//      AUTHENTICATION ACTIONS          //
//                                       //
//////////////////////////////////////////
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
                error => {
                    toast.warn(error.response.data.message);
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
            .catch(() => {
                toast.error("INVALID CREDENTIALS !!!!");
            });
    };
}

///////////////////////////////////////////
//                                      //
//      SHOPPING LISTS ACTIONS          //
//                                       //
//////////////////////////////////////////
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
        })
            .catch(
                error => {
                    switch (error.response.status) {
                        case 401:
                            localStorage.removeItem("TOKEN");
                            window.location.href = "/login";
                    }
                }
            );
    };
}

export function Add_Shopping_List(values) {
    return function (dispatch) {
        axiosConfig.request({
            method: "post",
            url: `/lists`,
            headers: {
                "x-access-token": localStorage.getItem("TOKEN")
            },
            data: values
        }).then((response) => {
            dispatch(Fetch_Shopping_Lists());
            toast.success(response.data.message);
            $("#add-list-modal").modal("close");
        }).catch(
            error => {
                toast.error(error.response.data.message);
                return error;
            }
        );
    };
}
export function Edit_Shopping_List(values) {
    return function (dispatch) {
        axiosConfig.request({
            method: "put",
            url: `/list/${values.id}`,
            headers: {
                "x-access-token": localStorage.getItem("TOKEN")
            },
            data: values
        }).then((response) => {
            dispatch(Fetch_Shopping_Lists());
            toast.success(response.data.message);
            $("#edit-list-modal").modal("close");
        }).catch(
            error => {
                toast.error(error.response.data.message);
                return error;
            }
        );
    };
}
export function Delete_Shopping_List(id) {
    return function (dispatch) {
        axiosConfig.request({
            method: "delete",
            url: `/list/${id}`,
            headers: {
                "x-access-token": localStorage.getItem("TOKEN")
            },
        }).then((response) => {
            dispatch(Fetch_Shopping_Lists());
            toast.warn(response.data.message);
        }).catch(
            error => {
                toast.error(error.response.data.message);
                return error;
            }
        );
    };
}
///////////////////////////////////////////
//                                      //
//      LIST ITEMS ACTIONS              //
//                                       //
//////////////////////////////////////////
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