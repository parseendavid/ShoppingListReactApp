/* eslint no-fallthrough: 0 */  // --> OFF

import axiosConfig from "../extras/axios_config";
import {toast} from "react-toastify";
import $ from "jquery";


export const FETCH_SHOPPING_LISTS = "fetch_shopping_lists";
export const FETCH_SHOPPING_LIST_ITEMS = "fetch_shopping_list_items";
export const FETCH_JWT_TOKEN = "fetch_jwt_token";
export const REQUEST = "REQUEST";
export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";

export function request() {
    return dispatch => {
        dispatch({
            type: REQUEST
        });
    };
}

export function success() {
    return dispatch => {
        dispatch({
            type: SUCCESS
        });
    };
}

export function failure() {
    return dispatch => {
        dispatch({
            type: FAILURE
        });
    };
}

///////////////////////////////////////////
//                                      //
//      AUTHENTICATION ACTIONS          //
//                                       //
//////////////////////////////////////////
export function SignUp_User(values) {
    return (dispatch) => {
        return axiosConfig.request({
            method: "post",
            url: `/auth/register/`,
            data: values
        })
            .then((response) => {
                toast.success(response.data.message);
                dispatch(success());
                dispatch(Login_User(values));
            })
            .catch(
                error => {
                    dispatch(failure());
                    toast.error(error.response.data.message);
                }
            );
    };
}

export function Login_User(values) {
    return (dispatch) => {
        return axiosConfig.request({
            method: "post",
            url: `/auth/login/`,
            data: values
        })
            .then((response) => {
                dispatch(success());
                toast.success(response.data.message);
                dispatch({
                    type: FETCH_JWT_TOKEN,
                    payload: response
                });
                window.location.href = "/dashboard";
            })
            .catch(() => {
                dispatch(failure());
                toast.error("Wrong credentials...");
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
        return axiosConfig.request({
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
            dispatch(success());
        }).catch(
                error => {
                    dispatch(failure());
                    switch (error.response.status) {
                        case 401:
                            localStorage.removeItem("TOKEN");
                            window.location.href = "/login";

                        default:
                            toast.error(error.response.data.message);
                    }
                }
            );
    };
}

export function Add_Shopping_List(values) {
    return function (dispatch) {
        return axiosConfig.request({
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
                dispatch(Fetch_Shopping_Lists());
                dispatch(failure());
                toast.error(error.response.data.message);
                return error;
            }
        );
    };
}

export function Edit_Shopping_List(values) {
    return function (dispatch) {
        return axiosConfig.request({
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
                dispatch(Fetch_Shopping_Lists());
                dispatch(failure());
                toast.error(error.response.data.message);
                return error;
            }
        );
    };
}

export function Delete_Shopping_List(id) {
    return function (dispatch) {
        return axiosConfig.request({
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
                dispatch(Fetch_Shopping_Lists());
                dispatch(failure());
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
export function Fetch_Shopping_List_Items(id) {
    return (dispatch) => {
        return axiosConfig.request({
            method: "get",
            url: `/list/${id}/items`,
            headers: {
                "x-access-token": localStorage.getItem("TOKEN")
            }
        }).then((response) => {
            dispatch({
                type: FETCH_SHOPPING_LIST_ITEMS,
                payload: response
            });
            dispatch(success());
        }).catch(
            error => {
                dispatch(failure());
                switch (error.response.status) {
                    case 401:
                        localStorage.removeItem("TOKEN");
                        window.location.href = "/login";
                    case 404:
                        window.location.href = "/dashboard";
                    default:
                        toast.error(error.response.data.message);
                }
            }
        );
    };

}

export function Add_Shopping_List_Item(values) {
    return function (dispatch) {
        return axiosConfig.request({
            method: "post",
            url: `/list/${values.list_id}`,
            headers: {
                "x-access-token": localStorage.getItem("TOKEN")
            },
            data: values
        }).then((response) => {
            dispatch(Fetch_Shopping_List_Items(values.list_id));
            toast.success(response.data.message);
            $("#add-item-modal").modal("close");
        }).catch(
            error => {
                dispatch(Fetch_Shopping_List_Items(values.list_id));
                dispatch(failure());
                toast.error(error.response.data.message);
                return error;
            }
        );
    };
}

export function Delete_Shopping_List_Item(values) {
    return function (dispatch) {
        return axiosConfig.request({
            method: "delete",
            url: `/list/${values.list_id}/${values.item_id}`,
            headers: {
                "x-access-token": localStorage.getItem("TOKEN")
            },
        }).then((response) => {
            dispatch(Fetch_Shopping_List_Items(values.list_id));
            toast.warn(response.data.message);
        }).catch(
            error => {
                dispatch(Fetch_Shopping_List_Items(values.list_id));
                dispatch(failure());
                toast.error(error.response.data.message);
                return error;
            }
        );
    };
}

export function Edit_Shopping_List_Item(values) {
    return function (dispatch) {
        return axiosConfig.request({
            method: "put",
            url: `/list/${values.list_id}/${values.item_id}`,
            headers: {
                "x-access-token": localStorage.getItem("TOKEN")
            },
            data: values
        }).then((response) => {
            dispatch(Fetch_Shopping_List_Items(values.list_id));
            toast.success(response.data.message);
            $("#edit-item-modal").modal("close");
        }).catch(
            error => {
                dispatch(Fetch_Shopping_List_Items(values.list_id));
                dispatch(failure());
                toast.error(error.response.data.message);
                return error;
            }
        );
    };
}