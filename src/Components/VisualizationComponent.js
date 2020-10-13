import React, { useEffect } from "react";

// Pie Chart
import { PieChart } from "react-minimal-pie-chart";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

// Bootstrap Icons
import { CalendarPlus } from "react-bootstrap-icons";

// Materiel UI

// React Router
import { useHistory } from "react-router-dom";

// CSS module
import classes from "./Visualization.module.css";

// Components
// Accordion
import Accordions from "./Accordion/Accordions";

const VisualizationComponent = ({ allLocationData }) => {
  const { presence, activity, reputation } = allLocationData;
  // console.log("Jokic is the best 5", presence, activity, reputation);

  // React Router
  let history = useHistory();

  // Three element percentage scores
  let presenceScore = null;
  let reputationScore = null;
  let activityScore = null;
  let overallScore = null;

  // Handles Score for all the elements including the Overall Score
  const scoresHandler = (presenceData, reputationData, activityData) => {
    // Presence
    const presenceObj = presenceData.presence;
    let valueArr = [
      presenceObj.hours,
      presenceObj.specialHours.specialHourPeriods,
      presenceObj.address,
      presenceObj.phoneNumber,
      presenceObj.appointmentURLs,
      presenceObj.menuURL,
      presenceObj.description,
      presenceObj.websiteURL,
    ];
    let counter = 0;

    for (let i = 0; i < valueArr.length; i++) {
      if (valueArr[i]) {
        counter++;
      }
    }

    const presencePercentScore = Math.floor((counter / 8) * 100);
    presenceScore = (
      <div>
        <h2>{presencePercentScore}%</h2>
      </div>
    );

    // Reputation
    const reputationObj = reputationData.reputation;

    const numOfReviews = reputationObj.numberOfReviews;
    const overallRating = reputationObj.averageRating;
    const responseRating = reputationObj.responsesRating;
    const mostRecentReview = reputationObj.daysSinceLastReview;

    let numOfReviewsScore;
    let overallRatingScore;
    let mostRecentReviewScore;

    // Number of Reviews
    if (numOfReviews < 15 && numOfReviews >= 1) {
      numOfReviewsScore = 30;
    } else if (numOfReviews >= 15 && numOfReviews <= 30) {
      numOfReviewsScore = 50;
    } else if (numOfReviews > 30) {
      numOfReviewsScore = 65;
    } else {
      numOfReviewsScore = 0;
    }

    // Overall Rating
    if (overallRating < 4 && overallRating >= 1) {
      overallRatingScore = 25;
    } else if (overallRating <= 4.5 && overallRatingScore >= 4.0) {
      overallRatingScore = 60;
    } else if (overallRating > 4.5) {
      overallRatingScore = 80;
    } else {
      overallRatingScore = 0;
    }

    // Most Recent Review
    if (mostRecentReview >= 30) {
      mostRecentReviewScore = 10;
    } else if (mostRecentReview <= 29 && mostRecentReview >= 8) {
      mostRecentReviewScore = 40;
    } else if (mostRecentReview <= 7) {
      mostRecentReviewScore = 100;
    }

    const reputationPercentScore = Math.floor(
      ((numOfReviewsScore +
        responseRating +
        overallRatingScore +
        mostRecentReviewScore) /
        400) *
        100
    );

    reputationScore = (
      <div>
        <h2>{reputationPercentScore}%</h2>
      </div>
    );

    // Activity
    const activityObj = activityData.activity;
    const numOfPosts = activityObj.numberOfPosts;
    const mostRecentPostDate = activityObj.daysSinceMostRecentPost;

    let numOfPostsScore;
    let mostRecentScore;

    // Number Of Posts
    if (numOfPosts < 10 && numOfPosts >= 1) {
      numOfPostsScore = 10;
    } else if (numOfPosts >= 10 && numOfPosts <= 30) {
      numOfPostsScore = 50;
    } else if (numOfPosts > 30) {
      numOfPostsScore = 85;
    } else {
      numOfPostsScore = 0;
    }

    // Most Recent Post
    if (mostRecentPostDate >= 30) {
      mostRecentScore = 5;
    } else if (mostRecentPostDate >= 8 && mostRecentPostDate <= 29) {
      mostRecentScore = 30;
    } else if (mostRecentPostDate <= 7 && mostRecentPostDate >= 1) {
      mostRecentScore = 90;
    } else {
      mostRecentScore = 0;
    }

    const activityPercentScore = Math.floor(
      ((numOfPostsScore + mostRecentScore) / 200) * 100
    );
    activityScore = (
      <div>
        <h2>{activityPercentScore}%</h2>
      </div>
    );

    // Overall
    const overallPercentScore = Math.floor(
      ((presencePercentScore + reputationPercentScore + activityPercentScore) /
        300) *
        100
    );
    overallScore = (
      <div>
        <h1>{overallPercentScore}%</h1>
      </div>
    );
  };

  // Calendar Handler
  const calendarHandler = () => {
    history.push("/calendar");
  };

  return (
    <div>
      <Container
        onClick={scoresHandler({ presence }, { reputation }, { activity })}
      >
        <Row className={classes.overallGradeContainer}>
          <Col className={classes.overallGrade}>
            <h1>Your Google Grade</h1>
            <PieChart
              className={classes.pieChart}
              style={{ width: "400px" }}
              data={[
                { title: "One", value: 0.1, color: "#E38627" },
                { title: "Two", value: 0.15, color: "#C13C37" },
                { title: "Three", value: 0.25, color: "#6A2135" },
              ]}
              label={(e) => 10 + "/100"}
              labelStyle={{ fontSize: "10px" }}
              animate
              animationDuration={750}
              lineWidth={50}
              labelPosition={0}
            />
            {overallScore}
          </Col>
        </Row>
        <Row className={classes.elementsContainer}>
          <Col className={classes.elementCol}>
            <Image className={classes.img} roundedCircle />
            {presenceScore}
            <h3>Presence</h3>
            <Accordions />
          </Col>
          <Col className={classes.elementCol}>
            <Image className={classes.img} roundedCircle />
            {reputationScore}
            <h3>Reputation</h3>
            <Accordions />
          </Col>
          <Col
            className={classes.elementCol}
            // onClick={activityHandler({ activity })}
          >
            <Image className={classes.img} roundedCircle />
            {activityScore}
            <h3>Activity</h3>
            <Accordions />
          </Col>
        </Row>
        <Row>
          <Col className={classes.calendy}>
            <h2>
              Want to improve your score? Book your free Google consultation!
            </h2>
            <CalendarPlus
              className={classes.calender}
              color="black"
              size={200}
              onClick={() => calendarHandler()}
            />
          </Col>
        </Row>
      </Container>
      <div>
        <div></div>
      </div>
      <div className="elementsContainer">
        <div className="presence"></div>
        <div className="reputation"></div>
        <div className="activity"></div>
      </div>
      <div>
        Presence:
        <p>Hours: {presence.hours[0].openDay}</p>
        <p>
          Special Hours:
          {presence.specialHours.specialHourPeriods[0].startDate.year}
        </p>
        <p>Address: {presence.address.locality}</p>
        <p>Phone Number: {presence.phoneNumber}</p>
        <p>Appointment URL: {presence.appointmentURLs}</p>
        <p>Menu URL: {presence.menuURL}</p>
        <p>Description: {presence.description}</p>
        <p>Website URL: {presence.websiteURL}</p>
      </div>

      <div>
        Reputation:
        <p>Number of Reviews: {reputation.numberOfReviews}</p>
        <p>Overall Star Rating: {reputation.overallStarRating}</p>
        <p>Responses: {reputation.responses}</p>
        <p>Most Recent Review: {reputation.daysSinceLastReview}</p>
        <p>Average Rating: {reputation.averageRating}</p>
        <p>Overall Reputation %: {reputation.overallReputationPercent}</p>
        <p>Overall Reputation Rating: {reputation.overallReputationRating}</p>
        <p>Recent Review Rating: {reputation.recentReviewRating}</p>
        <p>Responses Rating: {reputation.responsesRating}</p>
        <p>Review Rating: {reputation.reviewRating}</p>
        <p>Days Since Last Review: {reputation.daysSinceLastReview}</p>
      </div>

      <div>
        Activity:
        <p>Quantity of Google Posts: {activity.numberOfPosts}</p>
        <p>Most Recent Google Post Date: {activity.daysSinceMostRecentPost}</p>
        <p>Most Recent Post Rating: {activity.mostRecentPostRating}</p>
        <p>Number of Post Rating: {activity.numberOfPostsRating}</p>
        <p>Overall Activity %: {activity.overallActivityPercent}</p>
        <p>Overall Activity Rating: {activity.overallActivityRating}</p>
      </div>
    </div>
  );
};

export default VisualizationComponent;
