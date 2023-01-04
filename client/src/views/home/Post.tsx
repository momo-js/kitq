import React from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from "react-redux";
import { likeApi } from '../../api/api';
import { setPost } from '../../state';

type likes = {
    [key: string]: boolean
}

type PostProps = {
    title: string,
    login: string,
    picturePath: string,
    likes: likes,
    postId: string
}

const Post = ({ title, login, picturePath, likes, postId }: PostProps) => {

    const dispatch = useDispatch()
    const token = useSelector((state: any) => state.token)
    const { _id } = useSelector((state: any) => state.user)

    const isLiked = Boolean(likes[_id])
    const likeCount = Object.keys(likes).length

    const handleLike = async () => {
        try {
            const res = await likeApi(postId, _id, token)
            const updatedPost = await res.data
            dispatch(setPost({ post: updatedPost }))
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <>
            <Box sx={{ border: '1px solid pink', borderRadius: '5px', width: '40rem', minHeight: '20rem', margin: '0 auto', marginBottom: '2rem', boxShadow: '0 0 15px 3px black' }}>
                <Box sx={{ padding: '10px' }}>
                    <Typography sx={{fontSize: '1.2rem'}}>
                        {title ?? 'no title data :('}
                    </Typography>
                    <Typography sx={{ textAlign: 'end', color: 'pink' }}>
                        {login ?? 'no user data :('}
                    </Typography>
                </Box>
                <Box sx={{ textAlign: 'center', margin: '1rem auto' }}>
                    <Box
                        component="img"
                        sx={{
                            maxWidth: '37rem',
                            overflow: 'hidden',
                            border: '1px dotted pink',
                            borderRadius: '5px'
                        }}
                        src={picturePath ?? 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvignette.wikia.nocookie.net%2Fscream-queens%2Fimages%2F1%2F15%2FError-sadface-f0f0f0.png%2Frevision%2Flatest%3Fcb%3D20160627204354&f=1&nofb=1&ipt=98dd2f92db118cb02fa369c65191da125b3d231677f3b42b7c11a4a8c494a273&ipo=images'}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingBottom: '1rem' }}>
                    <IconButton color='primary' onClick={handleLike}>
                        {isLiked ? (
                            <FavoriteIcon />
                        ) : (
                            <FavoriteBorderIcon />
                        )}
                    </IconButton>
                    <Box>
                        <Typography variant='overline' sx={{ textAlign: 'center', fontSize: '1rem' }}>{likeCount}</Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Post