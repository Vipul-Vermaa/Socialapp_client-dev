import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom' 
import {updateProfile} from '../../redux/actions/profile'
import {loadUser} from '../../redux/actions/user'

const UpdateProfile = () => {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')

  const navigate=useNavigate()
  const dispatch=useDispatch()


  const submitHandler=async (e)=>{
    e.preventDefault()
    dispatch(updateProfile(name,email))
    dispatch(loadUser())
    navigate('/profile')
}

  return (
    <Container py={'16'} minH={'95vh'} >
        <form onSubmit={submitHandler}>
            <Heading my={'12'} textAlign={['center','left']} children='Update Profile'/>
            <VStack spacing={'8'} >
            <Input
            value={name}
            placeholder='Enter Name'
            type='name'
            onChange={e=>setName(e.target.value)}
            />
            <Input
            value={email}
            placeholder='Enter Email'
            type='email'
            onChange={e=>setEmail(e.target.value)}
            />

            <Button colorScheme='cyan' width={'full'} type='submit'>
                Update 
            </Button>
            </VStack>

        </form>

    </Container>
  
  )
}

export default UpdateProfile
