import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Slider from 'infinite-react-carousel';
import { Avatar, Grid, Paper, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root: {
       
        
    },
    large: {
      width: '180px',
      height: '180px',
    }
    ,divStyle:{
      padding: theme.spacing(1),
      
    },
    mainContent:{
      padding: theme.spacing(5),
     
      borderRadius:'20px',
      boxShadow:'0px 0px 10px #8888883b'
      
    }
    

  }));

function Feedbacks() {
    //https://reactjsexample.com/infinite-carousel-for-react/
    const classes = useStyles();
    const settings =  {
        accessibility: false,
        arrows: false,
        arrowsBlock: false,
        autoplay: true,
        autoplaySpeed: 4000,
        centerPadding: 10,
        initialSlide: 0,
        overScan: 1,
        pauseOnHover: true,
        slidesPerRow: 3,
        swipe: false
      };
    
      const ratingChanged = (newRating) => {
        console.log(newRating);
      };

    return (
        <>
         
         <div>

        <Slider { ...settings }>
        <div className={classes.divStyle}>
            <Paper elevation={1} className={classes.mainContent}>
             <Grid container minWidth="xs"  justify="center" direction="column" alignItems="center" spacing={1} >
                 <Grid item  >   
                   <Avatar alt="Remy Sharp" src="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg" className={classes.large}/>
                 </Grid>
                 
                 <Grid item>
                   <Typography variant="h6" align='center'>
                   Ayman Glass
                   
                   </Typography>
                   </Grid>
   
                   <Grid item > 
                   {/* https://www.npmjs.com/package/react-rating-stars-component */}
                   <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                   </Grid>
   
                     <Grid item >
                     <Typography variant="body1" align='justify'>
                     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, 
                     quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum 
                     fugiat deleniti?"
                     </Typography>
                   </Grid>
        
                </Grid>
             </Paper>
             </div>
          
             <div className={classes.divStyle}>
            <Paper elevation={1} className={classes.mainContent}>
             <Grid container minWidth="xs"  justify="center" direction="column" alignItems="center" spacing={1} >
                 <Grid item  >   
                   <Avatar alt="Remy Sharp" src="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg" className={classes.large}/>
                 </Grid>
                 
                 <Grid item>
                   <Typography variant="h6" align='center'>
                   Ayman Glass
                   
                   </Typography>
                   </Grid>
   
                   <Grid item > 
                   {/* https://www.npmjs.com/package/react-rating-stars-component */}
                   <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                   </Grid>
   
                     <Grid item >
                     <Typography variant="body1" align='justify'>
                     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, 
                     quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum 
                     fugiat deleniti?"
                     </Typography>
                   </Grid>
        
                </Grid>
             </Paper>
             </div><div className={classes.divStyle}>
            <Paper elevation={1} className={classes.mainContent}>
             <Grid container minWidth="xs"  justify="center" direction="column" alignItems="center" spacing={1} >
                 <Grid item  >   
                   <Avatar alt="Remy Sharp" src="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg" className={classes.large}/>
                 </Grid>
                 
                 <Grid item>
                   <Typography variant="h6" align='center'>
                   Ayman Glass
                   
                   </Typography>
                   </Grid>
   
                   <Grid item > 
                   {/* https://www.npmjs.com/package/react-rating-stars-component */}
                   <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                   </Grid>
   
                     <Grid item >
                     <Typography variant="body1" align='justify'>
                     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, 
                     quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum 
                     fugiat deleniti?"
                     </Typography>
                   </Grid>
        
                </Grid>
             </Paper>
             </div><div className={classes.divStyle}>
            <Paper elevation={1} className={classes.mainContent}>
             <Grid container minWidth="xs"  justify="center" direction="column" alignItems="center" spacing={1} >
                 <Grid item  >   
                   <Avatar alt="Remy Sharp" src="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg" className={classes.large}/>
                 </Grid>
                 
                 <Grid item>
                   <Typography variant="h6" align='center'>
                   Ayman Glass
                   
                   </Typography>
                   </Grid>
   
                   <Grid item > 
                   {/* https://www.npmjs.com/package/react-rating-stars-component */}
                   <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                   </Grid>
   
                     <Grid item >
                     <Typography variant="body1" align='justify'>
                     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, 
                     quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum 
                     fugiat deleniti?"
                     </Typography>
                   </Grid>
        
                </Grid>
             </Paper>
             </div><div className={classes.divStyle}>
            <Paper elevation={1} className={classes.mainContent}>
             <Grid container minWidth="xs"  justify="center" direction="column" alignItems="center" spacing={1} >
                 <Grid item  >   
                   <Avatar alt="Remy Sharp" src="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg" className={classes.large}/>
                 </Grid>
                 
                 <Grid item>
                   <Typography variant="h6" align='center'>
                   Ayman Glass
                   
                   </Typography>
                   </Grid>
   
                   <Grid item > 
                   {/* https://www.npmjs.com/package/react-rating-stars-component */}
                   <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                   </Grid>
   
                     <Grid item >
                     <Typography variant="body1" align='justify'>
                     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, 
                     quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum 
                     fugiat deleniti?"
                     </Typography>
                   </Grid>
        
                </Grid>
             </Paper>
             </div><div className={classes.divStyle}>
            <Paper elevation={1} className={classes.mainContent}>
             <Grid container minWidth="xs"  justify="center" direction="column" alignItems="center" spacing={1} >
                 <Grid item  >   
                   <Avatar alt="Remy Sharp" src="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg" className={classes.large}/>
                 </Grid>
                 
                 <Grid item>
                   <Typography variant="h6" align='center'>
                   Ayman Glass
                   
                   </Typography>
                   </Grid>
   
                   <Grid item > 
                   {/* https://www.npmjs.com/package/react-rating-stars-component */}
                   <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                   </Grid>
   
                     <Grid item >
                     <Typography variant="body1" align='justify'>
                     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, 
                     quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum 
                     fugiat deleniti?"
                     </Typography>
                   </Grid>
        
                </Grid>
             </Paper>
             </div><div className={classes.divStyle}>
            <Paper elevation={1} className={classes.mainContent}>
             <Grid container minWidth="xs"  justify="center" direction="column" alignItems="center" spacing={1} >
                 <Grid item  >   
                   <Avatar alt="Remy Sharp" src="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg" className={classes.large}/>
                 </Grid>
                 
                 <Grid item>
                   <Typography variant="h6" align='center'>
                   Ayman Glass
                   
                   </Typography>
                   </Grid>
   
                   <Grid item > 
                   {/* https://www.npmjs.com/package/react-rating-stars-component */}
                   <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                   </Grid>
   
                     <Grid item >
                     <Typography variant="body1" align='justify'>
                     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, 
                     quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum 
                     fugiat deleniti?"
                     </Typography>
                   </Grid>
        
                </Grid>
             </Paper>
             </div><div className={classes.divStyle}>
            <Paper elevation={1} className={classes.mainContent}>
             <Grid container minWidth="xs"  justify="center" direction="column" alignItems="center" spacing={1} >
                 <Grid item  >   
                   <Avatar alt="Remy Sharp" src="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg" className={classes.large}/>
                 </Grid>
                 
                 <Grid item>
                   <Typography variant="h6" align='center'>
                   Ayman Glass
                   
                   </Typography>
                   </Grid>
   
                   <Grid item > 
                   {/* https://www.npmjs.com/package/react-rating-stars-component */}
                   <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                   </Grid>
   
                     <Grid item >
                     <Typography variant="body1" align='justify'>
                     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, 
                     quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum 
                     fugiat deleniti?"
                     </Typography>
                   </Grid>
        
                </Grid>
             </Paper>
             </div><div className={classes.divStyle}>
            <Paper elevation={1} className={classes.mainContent}>
             <Grid container minWidth="xs"  justify="center" direction="column" alignItems="center" spacing={1} >
                 <Grid item  >   
                   <Avatar alt="Remy Sharp" src="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg" className={classes.large}/>
                 </Grid>
                 
                 <Grid item>
                   <Typography variant="h6" align='center'>
                   Ayman Glass
                   
                   </Typography>
                   </Grid>
   
                   <Grid item > 
                   {/* https://www.npmjs.com/package/react-rating-stars-component */}
                   <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                   </Grid>
   
                     <Grid item >
                     <Typography variant="body1" align='justify'>
                     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, 
                     quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum 
                     fugiat deleniti?"
                     </Typography>
                   </Grid>
        
                </Grid>
             </Paper>
             </div><div className={classes.divStyle}>
            <Paper elevation={1} className={classes.mainContent}>
             <Grid container minWidth="xs"  justify="center" direction="column" alignItems="center" spacing={1} >
                 <Grid item  >   
                   <Avatar alt="Remy Sharp" src="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg" className={classes.large}/>
                 </Grid>
                 
                 <Grid item>
                   <Typography variant="h6" align='center'>
                   Ayman Glass
                   
                   </Typography>
                   </Grid>
   
                   <Grid item > 
                   {/* https://www.npmjs.com/package/react-rating-stars-component */}
                   <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                   </Grid>
   
                     <Grid item >
                     <Typography variant="body1" align='justify'>
                     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, 
                     quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum 
                     fugiat deleniti?"
                     </Typography>
                   </Grid>
        
                </Grid>
             </Paper>
             </div><div className={classes.divStyle}>
            <Paper elevation={1} className={classes.mainContent}>
             <Grid container minWidth="xs"  justify="center" direction="column" alignItems="center" spacing={1} >
                 <Grid item  >   
                   <Avatar alt="Remy Sharp" src="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg" className={classes.large}/>
                 </Grid>
                 
                 <Grid item>
                   <Typography variant="h6" align='center'>
                   Ayman Glass
                   
                   </Typography>
                   </Grid>
   
                   <Grid item > 
                   {/* https://www.npmjs.com/package/react-rating-stars-component */}
                   <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                   </Grid>
   
                     <Grid item >
                     <Typography variant="body1" align='justify'>
                     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, 
                     quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum 
                     fugiat deleniti?"
                     </Typography>
                   </Grid>
        
                </Grid>
             </Paper>
             </div>
        </Slider>
      </div>
        </>
    )
}

export default Feedbacks;
