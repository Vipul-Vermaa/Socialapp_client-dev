import axios from 'axios'
import {server} from '../store'

export const createPost=FormData=>async (dispatch)=>{
    try {
        const config={
            headers:{
                'Content-type':'multipart/form-data',
            },
            withCredtials:true,
        }
        dispatch({
            type:'createPostRequest'
        })
        const {data}=await axios.post(`${server}/createpost`,
        FormData,config)
        dispatch({type:'createPostSuccess',
    payload:data.message
    })
    } catch (error) {
        dispatch({type:'createPostFail',
    payload:error.response.data.message,
    })
    }
}


export const deletePost=id=>async dispatch=>{
    try {
        const config={
            withCredentials:true,
        };
        dispatch({type:'deletePostRequest'})
        const {data}=await axios.delete(`${server}/${id}`,config)

        dispatch({type:'deletePostSuccess',payload:data.message})
    } catch (error) {
        dispatch({
            type:'deletePostFail',
            payload:error.response.data.message,
        })
    }
}

export const likePost=id=>async (dispatch)=>{
    try {
        dispatch({
            type:'likePostRequest',
        })
        const {data}=await axios.get(`${server}/${id}`)
        dispatch({
            type:'likePostSuccess',
            payload:data.message,
        })
    } catch (error) {
        dispatch({
            type:'likePostFail',
            payload:error.response.data.message
        })
    }
}