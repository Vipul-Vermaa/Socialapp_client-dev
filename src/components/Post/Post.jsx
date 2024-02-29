import React,{useEffect,useState} from 'react'
import User from '../User/User'
import { Avatar,Button,Text,Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input} from '@chakra-ui/react'
  import {AiFillHeart, AiOutlineHeart,AiFillEdit, AiFillDelete,  } from "react-icons/ai";
  import { Link } from "react-router-dom";
  import "./Post.scss";
  import { useDispatch, useSelector } from "react-redux";
  import { deletePost, likePost, } from '../../redux/actions/post'
  import { getFollowingPosts, getMyPosts, loadUser } from "../../redux/actions/user";
 


const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
 
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,
}) => {
  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  
  const [captionValue, setCaptionValue] = useState(caption);
  const [captionToggle, setCaptionToggle] = useState(false);


  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLike = async () => {
    setLiked(!liked);
    dispatch(likePost(postId));

    // account=profile
    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };


  

  const deletePostHandler = async () => {
    dispatch(deletePost(postId));
    dispatch(getMyPosts());
    dispatch(loadUser());
  };

  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);

  return (
    <div className="post">
      <div className="postHeader">
        {isAccount ? (
          <Button onClick={() => setCaptionToggle(!captionToggle)}>
            <AiFillEdit />
          </Button>
        ) : null}
      </div>

      <img src={postImage} alt="Post" />

      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="User"
          boxSize="3vmax"
        />

        <Link to={`/user/${ownerId}`}>
          <Text fontWeight="bold">{ownerName}</Text>
        </Link>

        <Text fontWeight="light" color="rgba(0, 0, 0, 0.582)" alignSelf="center">
          {caption}
        </Text>
      </div>

      <Button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}
        onClick={() => setLikesUser(!likesUser)}
        isDisabled={likes.length === 0 ? true : false}
      >
        <Text>{likes.length} Likes</Text>
      </Button>

      <div className="postFooter">
        <Button onClick={handleLike}>
          {liked ? <AiFillHeart /> : <AiOutlineHeart />}
        </Button>

        

        {isDelete ? (
          <Button onClick={deletePostHandler}>
            <AiFillDelete/>
          </Button>
        ) : null}
      </div>

      <Modal isOpen={likesUser} onClose={() => setLikesUser(!likesUser)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Liked By</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {likes.map((like) => (
              <User
                key={like._id}
                userId={like._id}
                name={like.name}
                avatar={like.avatar.url}
              />
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Post
