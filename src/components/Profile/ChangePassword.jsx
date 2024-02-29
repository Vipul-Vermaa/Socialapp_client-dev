import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-hot-toast'
import {changePassword} from '../../redux/actions/profile'

const ChangePassword = () => {

  const [oldPassword,setOldPassword]=useState('')
  const [newPassword,setNewPassword]=useState('')

  const dispatch=useDispatch()

  const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(changePassword(oldPassword,newPassword))
}

const{error,message}=useSelector(state=>state.profile)
useEffect(() => {
  if(error){
    toast.error(error)
    dispatch({type:'clearError'})
  }
  if(message){
    toast.success(message)
    dispatch({type:'clearMessage'})
  }
}, [dispatch,error,message])


  return (
    <Container py={'16'} h={'95vh'}>
         <form onSubmit={submitHandler}>
         <Heading my={'12'} textAlign={['center','left']} children='Change Password' />
        <VStack
        
        spacing={'8'} 
        >
            <Input
            required
            placeholder='Enter Old-Password'
            value={oldPassword}
            type='password'
            onChange={e=>setOldPassword(e.target.value)}
            />

            <Input
            required
            placeholder='Enter New-Password'
            value={newPassword}
            type='password'
            onChange={e=>setNewPassword(e.target.value)}
            />

            <Button w={'full'} colorScheme='cyan' type='submit' >
                Change Password
            </Button>
        </VStack>
        </form>
    </Container>
  )
}

export default ChangePassword


