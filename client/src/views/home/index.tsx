import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { getPostApi, getHotPostApi } from '../../api/api'
import Navbar from './Navbar'
import Post from './Post'
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from '../../state'


const Home = () => {

  const dispatch = useDispatch()
  const token = useSelector((state: any) => state.token);
  const posts = useSelector((state: any) => state.posts);

  const fetchData = async () => {
    const res = await getPostApi(token)
    console.log(res.data)
    const posts = await res.data
    dispatch(setPosts({ posts }))
  }

  useEffect(() => {
    fetchData()
  }, [])


  const handleFetchHot = async () => {
    const res = await getHotPostApi(token)
    console.log(res.data)
    const posts = await res.data
    dispatch(setPosts({ posts }))
  }

  return (
    <>
      <Navbar handleFetchAll={fetchData} handleFetchHot={handleFetchHot} />
      <Box sx={{ display: 'flex', flexDirection: 'column', }}>
        {posts.map((item: any) => {
          return (
            <Post login={item.login} title={item.title} picturePath={item.picturePath} postId={item._id} likes={item.likes} key={item._id} />
          )
        })}
      </Box>
    </>
  )
}

export default Home