import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Grid, Paper } from '@material-ui/core';

import PostThum from '../weblog/PostThum';
import { ScaleLoader } from 'react-spinners';
import axios from 'axios';
import { toast } from 'react-toastify';
import AuctionCommon from '../auction/AuctionCommon';

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    paddingTop: theme.spacing(3),
  },
}));

function Home() {
  const override = `
        display: flex;
        align-items: center;
        justify-content: center;    
        border-color: red;
    `;
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [domains, setDomains] = useState([]);
  const getlist = () => {
    setLoading(true);

    axios
      .get('/domains')
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setDomains(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(err.message);
      });
  };

  useEffect(() => {
    getlist();
  }, []);

  return (
    <>
      <Container maxwidth="lg" className={classes.container}>
        <Grid item>
          <Typography variant="h4" gutterBottom align="center">
            The latest auctions
          </Typography>
          <>
            {domains.length === 0 ? (
              <ScaleLoader
                css={override}
                size={150}
                color={'#eb4034'}
                loading={loading}
              />
            ) : (
              <>
                {domains.map((dom) => (
                  <AuctionCommon
                    key={dom.domainId}
                    domainname={dom.domainname}
                    bidamount={dom.bidamount}
                    bids={dom.bids}
                    endDateTime={dom.endDateTime}
                  />
                ))}
              </>
            )}
          </>
        </Grid>

        <Grid item className={classes.container}>
          <Typography variant="h4" gutterBottom align="center">
            Latest Blog post
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <PostThum />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <PostThum />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <PostThum />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Home;
