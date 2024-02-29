import axios from 'axios'
import {server} from '../store'

export const login=(email,password)=>async(dispatch)=>{
    try {
        dispatch({type:'loginRequest'})
        const {data}=await axios.post(`${server}/login`,
        {email,password},{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true,
        })
        dispatch({type:'loginSuccess',
    payload:data,
    })
    } catch (error) {
        dispatch({type:'loginFail',payload:error.response.data.message})
    }
}

export const register=FormData=>async (dispatch)=>{
    try {
        dispatch({type:'registerRequest'})
        const{data}=await axios.post(`${server}/register`,FormData,{
            headers:{
                'Content-Type':'multipart/form-data',
            },
            withCredentials:true,
        })
        dispatch({
            type:'registerSuccess',payload:data
        })
    } catch (error) {
        dispatch({type:'registerFail',
    payload:error.response.data.message
    })
    }
}

export const loadUser=()=>async dispatch=>{
    try {
        dispatch({type:'loadUserRequest'})
    const {data}=await axios.get(
        `${server}/me`,{
            withCredentials:true,
        }
    )
    dispatch({type:'loadUserSuccess',
        payload:data.user
})
    } catch (error) {
        dispatch({type:'loadUserFail',
    payload:error.response.data.message})

}}


export const logout=()=>async dispatch=>{
    try {
        dispatch({type:'logoutRequest'});
        const {data}=await axios.get(`${server}/logout`,{
            withCredentials:true,
        })
        dispatch({type:'logoutSuccess',payload:data.message})
    } catch (error) {
        dispatch({type:'logoutFail',
    payload:error.response.data.message})
    }
}

export const getFollowingPosts = () => async (dispatch) => {
    try {
      dispatch({
        type: "getFollowingPostsRequest",
      });
  
      const { data } = await axios.get(`${server}/posts`);
      dispatch({
        type: "getFollowingPostsSuccess",
        payload: data.posts,
      });
    } catch (error) {
      dispatch({
        type: "getFollowingPostsFail",
        payload: error.response.data.message,
      });
    }
  };

  export const getMyPosts=()=>async (dispatch)=>{
    try {
        dispatch({
            type:'getMyPostsRequest'
        })
        const{data}=await axios.get(`${server}/myposts`)
        dispatch({type:'getMyPostsSuccess',payload:data})
    } catch (error) {
        dispatch({type:'getMyPostsFail',
    payload:error.response.data.message})
    }
  }

  export const getAllUsers =
  (name = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: "getAllUsersRequest",
      });

      const { data } = await axios.get(`${server}/users?name=${name}`);
      dispatch({
        type: "getAllUsersSuccess",
        payload: data.users,
      });
    } catch (error) {
      dispatch({
        type: "getAllUsersFail",
        payload: error.response.data.message,
      });
    }
  };