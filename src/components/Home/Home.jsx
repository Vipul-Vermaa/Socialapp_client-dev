import { Box, Container, Flex, HStack, Spacer, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import Post from '../Post/Post.jsx'
import User from '../User/User.jsx'
import { Link } from 'react-router-dom'
import image from '../../assets/images/img1.png'
import {useDispatch, useSelector} from 'react-redux'
import {getAllUsers,getFollowingPosts} from '../../redux/actions/user'
import {toast} from 'react-hot-toast'





const Home = () => {

  const dispatch=useDispatch()
  const {posts,error,message}=useSelector((state)=>state.postOfFollowing)

  useEffect(()=>{
    dispatch(getFollowingPosts())
    dispatch(getAllUsers())
  },[dispatch])

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
    <Container minH='95vh' maxW={'container.lg'} py={'8'} >
  <Stack justifyContent={'flex-start'} spacing={['8','16']} padding={'8'} direction={['column','row']} >

    <VStack spacing={'4'} alignItems={['center','flex-start']}  maxH={'35vh'} minWidth={'15vw'} p={'4'} >
      <HStack>
        <Text children='User' fontWeight={'bold'}/>
        <Link to='/profile/:id'>
          <Text children={User.name} />
        
        </Link>
        
      </HStack>

      

      
    </VStack>

    <VStack spacing={'4'} align={'center'} >
      {posts && posts.length>0?(posts.map((post)=>(
        <Post 
      key={post._id}
      postId={post.Id}
      caption={post.caption}
      postImage={post.image.url}
      likes={post.likes}
      ownerImage={post.owner.avatar.url}
      ownerName={post.owner.name}
      ownerId={post.owner._id}
      /> 
      ))):(
        <Text fontSize={'12px'}>
          No Post Yet
        </Text>
      )}
      
            
    </VStack>

  </Stack>
  </Container>
  )
}

export default Home
