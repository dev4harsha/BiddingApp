import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


import { CardContent, CardMedia, Container, Grid, Typography, CardActionArea, Paper } from '@material-ui/core';

import PostThum from './PostThum';



const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth:"100%",
    },
    container: {
        paddingTop: theme.spacing(3)
    },
    media: {
        height: 240,
    },


}));

function BlogPost() {
    const classes = useStyles();
    return (
        <>
            <Container maxWidth="lg" className={classes.container}>
                <Typography variant="h4" gutterBottom align='center'>
                    Read article
            </Typography>
                <Grid container spacing={3} >
                    <Grid item xs={12} sm={12} md={12} lg={8}>
                        <Paper>
                            <CardMedia
                                className={classes.media}
                                image="https://images.pexels.com/photos/2883244/pexels-photo-2883244.jpeg"
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="body2" >
                                    Jan, 20 2020
                                    </Typography>
                                <Typography gutterBottom variant="h5" component="h2">
                                    React articals
                                    </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                    across all continents except Antarctica
                                    </Typography>
                            </CardContent>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={4}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={3} lg={12}>
                                <PostThum />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3} lg={12}>
                                <PostThum />
                            </Grid>
                        </Grid>
                    </Grid>


                </Grid>
            </Container>

        </>
    )
}
export default BlogPost