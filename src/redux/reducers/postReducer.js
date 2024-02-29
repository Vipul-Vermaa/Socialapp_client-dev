import {createAction,createReducer} from '@reduxjs/toolkit'

export const createPostRequest=createAction('createPostRequest') 
export const createPostSuccess=createAction('createPostSuccess') 
export const createPostFail=createAction('createPostFail') 

export const deletePostRequest=createAction('deletePostRequest')
export const deletePostSuccess=createAction('deletePostSuccess')
export const deletePostFail=createAction('deletePostFail')

export const likePostRequest=createAction('likePostRequest')
export const likePostSuccess=createAction('likePostSuccess')
export const likePostFail=createAction('likePostFail')

export const clearError=createAction('clearError')
export const clearMessage=createAction('clearMessage')

const initialState={
    loading:false,
    message:'',
    error:null,
}

export const postReducer=createReducer(initialState,(builder)=>{
    builder
    .addCase(createPostRequest,state=>{
        state.loading=true;
    })
    .addCase(createPostSuccess,(state,action)=>{
        state.loading=false;
        state.message=action.payload
    })
    .addCase(createPostFail,(state,action)=>{
        state.loading=false;
        state.error=action.payload
    })


    .addCase(likePostRequest,state=>{
        state.loading=true;
    })
    .addCase(likePostSuccess,(state,action)=>{
        state.loading=false;
        state.message=action.payload
    })
    .addCase(likePostFail,(state,action)=>{
        state.loading=false;
        state.error=action.payload
    })


    .addCase(deletePostRequest,state=>{
        state.loading=true;
    })
    .addCase(deletePostSuccess,(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    })
    .addCase(deletePostFail,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    })

    .addMatcher(
        (action)=>action.type===clearError.type,state=>{
            state.error=null;
        })
    .addMatcher(
        (action)=>action.type===clearMessage.type,state=>{
            state.message=null;
        }
    )    
})