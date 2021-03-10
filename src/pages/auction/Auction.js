import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Typography, Container } from '@material-ui/core';
import AuctionCommon from './AuctionCommon';
import { ScaleLoader } from 'react-spinners';

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    paddingTop: theme.spacing(3),
  },
}));

function Auction(props) {
  const override = `
        display: flex;
        align-items: center;
        justify-content: center;    
        border-color: red;
    `;
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [domains, setDomains] = useState([]);
  const [domListPoints, setDomListPoints] = useState({ start: 0, end: 10 });

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
      });
  };

  useEffect(() => {
    getlist();
  }, []);
  return (
    <>
      <Container maxWidth="lg" className={classes.container}>
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
              {domains
                .slice(domListPoints.start, props.noOfDoms || domListPoints.end)
                .map((dom) => (
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
      </Container>
    </>
  );
}

export default Auction;
