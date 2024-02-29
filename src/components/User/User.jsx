import { Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const User = ({userId,name,avatar}) => {
  return (
    <Link to={`/user/${userId}`} className='homeUser' >
    <img src={avatar} alt={name} />
    <Text>{name}</Text>
    </Link>
  )
}

export default User