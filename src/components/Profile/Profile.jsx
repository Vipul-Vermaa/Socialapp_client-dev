import { Avatar, Button, Container, HStack, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { fileUploadCss } from '../Auth/Register'
import {updateProfilePicture} from '../../redux/actions/profile'
import {loadUser} from '../../redux/actions/user'
import {toast} from'react-hot-toast'

const Profile = () => {


    const dispatch=useDispatch()
    const {message,error}=useSelector(state=>state.profile)

    const changeImageSubmitHandler=async (e,image)=>{
    e.preventDefault()
    const myForm=new FormData()
    myForm.append('file',image)
    dispatch(updateProfilePicture(myForm))
    dispatch(loadUser())

    useEffect(() => {
      if(error){
        toast.error(error)
        dispatch({type:'clearError'})
      }
      if(message){
        toast.success(message)
        dispatch({type:'clearMessafe'})
      }
    }, [dispatch,error,message])
    


    
}
const {onClose,onOpen,isOpen} =useDisclosure()
  return (
    <Container minH={'95vh'} maxW={'container.lg'} py={'8'}  >
        <Heading children='PROFILE' m={'8'}/>
            <Stack justifyContent={'flex-start'} 
            direction={['column','row']}
            alignItems={'center'}
            spacing={['8','16']}
            padding={'8'}
            
            >
                <VStack>
                    <Avatar boxSize={'48'}
                    
                     />
                    <Button colorScheme='cyan' variant={'ghost'}  onClick={onOpen}>
                        Change-Photo
                    </Button>
                </VStack>

                <VStack spacing={'4'} alignItems={['center','flex-start']}>
                    <HStack>
                        <Text children='Name' fontWeight={'bold'} />
                        
                    </HStack>

                    <HStack>
                        <Text children='Email' fontWeight={'bold'} />
                        
                    </HStack>


                    <Stack direction={['column','row']} alignItems={'center'} >
                        <Link to='/updateprofile'><Button>Update-Profile</Button></Link>
                        <Link to='/changepassword'><Button>Change-Password</Button></Link>
                    </Stack>
                </VStack>

            </Stack>
            <ChangePhotoBox
            changeImageSubmitHandler={changeImageSubmitHandler}
            isOpen={isOpen}
            onClose={onClose}
            />
    </Container>
  )
}

export default Profile

function ChangePhotoBox({isOpen,onClose,changeImageSubmitHandler}){

  const[image,setImage]=useState('')
  const[imagePrev,setImagePrev]=useState('')

  const changeImage=(e)=>{
    const file=e.target.files[0]
    const reader= new FileReader()

    reader.readAsDataURL(file)
    reader.onloadend=()=>{
        setImagePrev(reader.result)
        setImage(file)
    }
}

const closeHandler=()=>{
  onClose()
  setImage('')
  setImagePrev('')
}

return(
  <Modal isOpen={isOpen} onClose={closeHandler} >
      <ModalOverlay backdropFilter={'blur(10px)'} />
      <ModalContent>
          <ModalHeader>Change-Photo</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
              <Container>
                  <form onSubmit={e=>changeImageSubmitHandler(e,image)} >
                      <VStack spacing={'8'}>
                      {imagePrev && <Avatar src={imagePrev} boxSize={'48'}/>}
                      <Input
                      type='file'
                      css={{'&::file-selector-button':fileUploadCss}}
                      onChange={changeImage}
                      />
                      <Button w={'full'} colorScheme='cyan' type='submit' >Change</Button>
                      </VStack>
                  </form>
              </Container>
          </ModalBody>
          <ModalFooter>
              <Button mr={'3'} onClick={closeHandler}>
                  Cancel
              </Button>
          </ModalFooter>
      </ModalContent>
  </Modal>
)
}
