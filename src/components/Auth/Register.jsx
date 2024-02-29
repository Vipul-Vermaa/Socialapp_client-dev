import React, { useState } from 'react'
import {Avatar, Box, Button, Container, FormLabel, Heading, Input, VStack} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {register} from '../../redux/actions/user'

export const fileUploadCss={
  cursor:'pointer',
  marginLeft:'-5%',
  width:'110%',
  height:'100%',
  border:'none',
}
const fileUploadStyle={
  '&::file-selector-button':fileUploadCss,
}

const Register = () => {

  const[name,setName]=useState('')
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('') 
  const[image,setImage]=useState('')
  const[imagePrev,setImagePrev]=useState('')

  const dispatch=useDispatch()

  const changeImageHandler=(e)=>{
    const file=e.target.files[0]
    const reader=new FileReader()
    reader.readAsDataURL(file)
    reader.onload=()=>{
      setImagePrev(reader.result)
      setImage(file)
    }
  }

  const submitHandler=(e)=>{
    e.preventDefault()
    const myForm=new FormData()
    myForm.append('name',name)
    myForm.append('email',email)
    myForm.append('password',password)
    myForm.append('file',image)
    dispatch(register(myForm))
  }

  return (
    <Container minH={'100vh'}>
      <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
      <Heading children='Register Here'/>
      <form onSubmit={submitHandler} >

        <Box my={'4'} display={'flex'} justifyContent={'center'} >
          <Avatar src={imagePrev} size={'2xl'} />
        </Box>

      <Box my={'3'}>
        <FormLabel htmlFor='name' children='Name' />
          <Input
          required
          id='name'
          value={name}
          placeholder='Enter Name'
          type='text'
          onChange={e=>{setName(e.target.value)}} 
          autoComplete='On'         
          />
      </Box>

      <Box my={'3'}>
        <FormLabel htmlFor='email' children='Email' />
          <Input
          required
          id='email'
          value={email}
          placeholder='Enter Email'
          type='email'
          onChange={e=>{setEmail(e.target.value)}}  
          autoComplete='On'        
          />
      </Box>

      <Box my={'3'}>
        <FormLabel htmlFor='password' children='Password' />
          <Input
          required
          id='password'
          value={password}
          placeholder='Enter Password'
          type='password'
          onChange={e=>{setPassword(e.target.value)}} 
          autoComplete='On'         
          />
      </Box>

      <Box my={'3'}>
        <FormLabel htmlFor='chooseAvatar' children='Choose Avatar' />
          <Input
          accept='image/*'
          id='chooseAvatar'
          type='file'
          css={fileUploadStyle}
          onChange={changeImageHandler}          
          />
      </Box>
      <Button my={'3'} color={'black'} type='submit'>Sign Up</Button>
      <Box my={'3'}>Already SignUp?<Link to='/login'><Button colorScheme='cyan' variant={'link'}>Login</Button></Link></Box>

      </form>
      </VStack>

    </Container>
  )
}

export default Register
