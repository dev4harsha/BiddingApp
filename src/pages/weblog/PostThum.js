import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core/';

import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { Redirect } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    root: {
        
    },
    media: {
        height: 180,

    },Card:{
        maxWidth: "100%",
        padding: theme.spacing(0.5),
    }
    

}));

function PostThum() {
    const classes = useStyles();
    const [viwePost, setViewPost] = useState(true);

    if(!viwePost){
        return <Redirect to="/BlogPost"/>
    }
    return (
        <>
            
                <Card className={classes.Card} onClick={()=> setViewPost(false)}>
                    <CardActionArea>
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
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary"  >
                            <ShareIcon />
                        </Button>
                        <Button size="small" color="primary">
                            <ThumbDownAltIcon />
                        </Button>
                        <Button size="small" color="primary">
                            <ThumbUpIcon />
                        </Button>
                    </CardActions>
                </Card>
            
        </>

    )
}

export default PostThum
