import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


import api from "../../api/axiosInstance/graderAPI";

import VisualizationContainer from "../VisualizationComponent";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});



const GoogleGrade = () => {

  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({});
  const [allLocationData, setAllLocationData] = useState({});
  const getData = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const googleID = localStorage.getItem("googleID");
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const data = await api.get(
      `/api/v1/account/accountId/105342314371442959648`,
      options
    );
    if (data.data.locationData !== undefined && data.data.locationData.length) {
      //   data.data.locationData.map((el) => {
      //     setLocations(el.locationName);
      //   });
      setLocations(data.data.locationData);
      console.log(data.data.locationData);
    }
  };

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const getAllLocationData = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const presenceData = await api.get(
      `/api/v1/grader/presence/accountId/${currentLocation.name}`,
      options
    );

    const reputationData = await api.get(
      `/api/v1/grader/reputation/accountId/${currentLocation.name}`,
      options
    );

    const activityData = await api.get(
      `/api/v1/grader/activity/accountId/${currentLocation.name}`,
      options
    );

    setAllLocationData({
      presence: presenceData.data,
      reputation: reputationData.data,
      activity: activityData.data,
    });
  };

  const dataHandler = (el) => {
    setCurrentLocation(el);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (currentLocation.locationName !== undefined) {
      getAllLocationData();
    }
  }, [currentLocation]);

  return (
    <div>
      <Card className={classes.root}>
      <CardContent>
      {locations.length &&
        locations.map((el) => (
          <p value={el} onClick={() => dataHandler(el)}>
            {el.locationName}
          </p>
        ))}
        
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    <Card className={classes.root}>
      <CardContent>
      {currentLocation.locationName !== undefined && (
        <div>
          {/* <p>{currentLocation.locationName}</p>
          <p>{currentLocation.address.locality}</p> */}
        </div>
      )}
      
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>

    <Card className={classes.root}>
      <CardContent>
      {allLocationData.presence !== undefined && (
        <VisualizationContainer allLocationData={allLocationData} />
      )}
      
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>

    </div>
  );
};

export default GoogleGrade;
