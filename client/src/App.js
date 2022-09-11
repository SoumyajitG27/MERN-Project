import React, { useEffect, useState } from "react";
import {Container, AppBar, Typography, Grow, Grid} from '@mui/material';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from "react-redux";
import {getPosts} from './actions/posts';
import travelbook from './images/travelbookimg.jpg';
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getPosts());
    }, [dispatch]);
    return (
        <Container maxWidth="lg">
            <AppBar className="appBar" position="static" color="inherit" sx={{ flexDirection: 'row' }}>
                <Typography className="heading" variant="h2" align="center">Travel Book</Typography>
                <img className="image" src={travelbook} alt="travel pictures" height="60" />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    </Grid> 
                </Container>
            </Grow>
        </Container>
    );
}

export default App;