import { Box, Button, Container, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import {CgHome,CgAdd,CgProfile,CgLogOut} from 'react-icons/cg'
import {logout} from '../../redux/actions/user'
import {useDispatch} from 'react-redux'

const Navbar = () => {

  const dispatch=useDispatch()

  const logoutHandler=()=>{
    console.log('logged out')
    dispatch(logout())
  }

  return (
    <Container h={'10vh'} p={'4'}  >
        <HStack justifyContent={'center'} spacing={'16'} >
         <Box fontSize={'2xl'}>
         <Link to='/' fontSize='2rem'  style={{textDecoration:'none'}} ><CgHome/></Link>
         </Box>

         <Box fontSize={'2xl'}>
         <Link to='/createpost' fontSize='lg' style={{textDecoration:'none'}} ><CgAdd/></Link>
         </Box>

         <Box fontSize={'2xl'}>
         <Link to='/profile' fontSize='sm' style={{textDecoration:'none'}} ><CgProfile/></Link>
         </Box>

         <Box fontSize={'2xl'}>
         <Button variant={'ghost'} onClick={logoutHandler}><CgLogOut/></Button>
         </Box>

        </HStack>
    </Container>
  )
}

export default Navbar
