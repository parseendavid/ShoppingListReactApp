import axiosConfig from "../extras/axios_config"

export const FETCH_SHOPPING_LISTS = "fetch_shopping_lists"
export const FETCH_SHOPPING_LIST_ITEMS = "fetch_shopping_list_items"
export const FETCH_JWT_TOKEN = "fetch_jwt_token"

export function SignUp_User(values,push){
    return (dispatch) =>{
        axiosConfig.request({
                method: "post",
                url: `/auth/register/`,
                data:values
            })
        .then((response)=>{
            push('/login')
            const data = {email:values.email,password:values.password}
            Login_User(data,push)
        })
    }
}

export function Login_User(values, push){
    return (dispatch) =>{
        axiosConfig.request({
                method: "post",
                url: `/auth/login/`,
                data:values
            })
        .then((response) => {
            dispatch({
                type: FETCH_JWT_TOKEN,
                payload: response
                })
            })
        .then(()=>{push('/dashboard')})
    }
}

export function Fetch_Shopping_Lists(store){
    return (dispatch) =>{
        axiosConfig.request({
                method: "get",
                url: `/lists`,
                headers:{
                    "x-access-token":store.getState().token
                }
            }).then((response) => {
                dispatch({
                    type: FETCH_SHOPPING_LISTS,
                    payload: response
                })
        })
    }
}


export function Fetch_Shopping_List_Items(store){
    return (dispatch) =>{
        axiosConfig.request({
                method: "get",
                url: `/lists/1/items`,
                headers:{
                    "x-access-token":store.getState().token
                }
            }).then((response) => {
                dispatch({
                    type: FETCH_SHOPPING_LIST_ITEMS,
                    payload: response
                })
        })
    }

}