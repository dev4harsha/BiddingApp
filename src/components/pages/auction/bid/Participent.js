import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import {  Button,  Divider, Grid,Typography ,Hidden, Avatar, ListItemAvatar, ListItemText, List, ListItem} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
       
        border: `2px solid ${theme.palette.divider}`,
        borderRadius:'25px',
        height:'70px',
        marginBottom: theme.spacing(1),
        backgroundColor:'#fff',
        boxShadow:'0px 0px 20px #8888883b'
    },
    container:{
        paddingTop: theme.spacing(3)
    },typoIcon:{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    

  }));

function Participent() {
    const classes = useStyles();
    
    
    return (
        
        
            
            <Grid className={classes.root}  container  justify="space-evenly" alignItems="center" >
                    <Grid item>
                    <Typography variant="h6"  align='center'>
                        10:24:22 08/02/21
                    </Typography>
                    </Grid> 
    
                    <Grid item>
                    <Typography variant="h6"  align='center'>
                        $82
                    </Typography>
                    </Grid> 

                    <Grid item>   
                    <List>
                    <ListItem >
                        <ListItemAvatar>
                        <Avatar
                            alt="Travis Howard"
                            src="https://i1.wp.com/digital-photography-school.com/wp-content/uploads/2017/05/white-background-headshot-717Bpx.jpg?resize=717%2C513&ssl=1"
                        />
                        </ListItemAvatar>
                        <ListItemText >Stephani</ListItemText>
                    </ListItem>   
                    </List>
                    </Grid>
                  
                    
                    
                    
                
                
            </Grid>
            
     
    )
}

export default Participent;
