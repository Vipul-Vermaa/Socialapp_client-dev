import { Button, Container, Heading, Image, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {fileUploadCss} from '../Auth/Register'
import { useDispatch, useSelector } from 'react-redux'
import {createPost} from '../../redux/actions/post'
import {toast} from 'react-hot-toast'

const CreatePost = () => {

  const [caption,setCaption]=useState('')
  const [image,setImage]=useState('')
  const [imagePrev,setImagePrev]=useState('')

  const changeImageHandler=(e)=>{
    const file=e.target.files[0]
        const reader=new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend=()=>{
            setImagePrev(reader.result)
            setImage(file)
  }

  const submitHandler=(e)=>{
    e.preventDefault()
}

  return (
    <Container py={'4'} 
    >
     <form onSubmit={submitHandler}>
        <Heading textTransform={'uppercase'} children='Create Post' my={'8'}
         textAlign={['center','left']}/>
         <VStack m={'auto'} spacing={'8'} >
            <Input
            value={caption}
            onChange={e=>setCaption(e.target.value)}
            placeholder='Description'
            type='text'
            focusBorderColor='purple.300'
            />
            <Input accept='image/*'
            required
            type='file'
            focusBorderColor='purple.300'
            css={{'&::file-selector-button':{
                ...fileUploadCss,
                color:'purple',
            }}}
            onChange={changeImageHandler}
            />
            {imagePrev && (
                <Image src={imagePrev} boxSize={'64'} objectFit={'contain'} />
            )}
            <Button w={'full'} colorScheme='purple' type='submit' >Create</Button>
         </VStack>
     </form>
    </Container>
  )
}}

export default CreatePost


