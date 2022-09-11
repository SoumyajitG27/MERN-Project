import { Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {Button} from 'react-bootstrap';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import './styles.css';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostdata] =useState({
        creator: '', title:'', message: '', tags:'', selectedFile:''
    });
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id == currentId) : null);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(post)
            setPostdata(post);
    }, [post])

    const handleSubmit =(e) => {
        e.preventDefault();
        currentId ? dispatch(updatePost(currentId, postData))
        : dispatch(createPost(postData));
        clear();
    }
    const clear = () => {
        setCurrentId(null);
        setPostdata({creator: '', title:'', message: '', tags:'', selectedFile:''})
    }
  
    return (
        <Paper className="paper">
            <form 
                autoComplete="off" 
                noValidate
                className="form root"
                onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Edit ' : 'Create a '} post</Typography>
                <TextField
                    name="creator"
                    variant="outlined"
                    label="Creator"
                    fullWidth
                    value={postData.creator}
                    onChange={(e)=> setPostdata({... postData, creator: e.target.value})}
                    />
                <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e)=> setPostdata({... postData, title: e.target.value})}
                    />
                <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={postData.message}
                    onChange={(e)=> setPostdata({...postData, message: e.target.value})}
                    />
                <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(e)=> setPostdata({... postData, tags: e.target.value})}
                    />
                    <div className="fileInput">
                           <FileBase
                              type="file"
                              multiple={false}
                              onDone={({base64}) => setPostdata({...postData, selectedFile: base64})} 
                            />        
                    </div>
                    <div className="d-grid gap-2">
                    <Button variant="primary" size="lg" type="submit" fullWidth>Submit</Button>
                    <Button variant="secondary" size="sm" onClick={clear}>Clear</Button>
                    </div>
            </form>
        </Paper>
    );
}

export default Form;