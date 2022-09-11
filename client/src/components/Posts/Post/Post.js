import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import './styles.css';
import moment from 'moment';
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({post, setCurrentId}) => {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deletePost(post._id));
    }
    return (
       <Card className="card">
        <CardMedia className="media" image={post.selectedFile} title={post.title} />
        <div className="overlay">
            <Typography variant="h6">{post.creator}</Typography>
            <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        <div className="overlay2">
            <Button style={{color: 'white'}} size="small" 
                onClick={() => setCurrentId(post._id)}>
                <MoreHorizIcon fontSize="default" />
            </Button>
        </div>
        <div className="details">
            <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className="title" variant="h5" gutterBottom>{post.title}</Typography>
        <CardContent>
            <Typography variant="h5" gutterBottom>{post.message}</Typography>
        </CardContent>
        <CardActions className="cardActions">
            <Button size="small" color="primary" onClick={()=>dispatch(likePost(post._id))}>
                <ThumbUpAltIcon fontSize="small"/>
                Like
                {post.likeCount}
            </Button>
            <Button size="small" color="primary" onClick={handleDelete}>
                <DeleteIcon fontSize="small"/>
                Delete
            </Button>
        </CardActions>
       </Card>
    );
}

export default Post;