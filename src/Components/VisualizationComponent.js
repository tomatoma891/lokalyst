import React from "react";

// Pie Chart
import { PieChart } from "react-minimal-pie-chart";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

// CSS module
import classes from "./Visualization.module.css";

const VisualizationComponent = ({ allLocationData }) => {
  const { presence, activity, reputation } = allLocationData;
  console.log("Jokic is the best 5", presence, activity, reputation);
  return (
    <div>
      <Container>
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
          </Col>
        </Row>
        <Row className={classes.elementsContainer}>
          <Col className={classes.elementCol}>
            <Image className={classes.img} roundedCircle />
            <h3>Presence</h3>
          </Col>
          <Col className={classes.elementCol}>
            <Image className={classes.img} roundedCircle />
            <h3>Reputation</h3>
          </Col>
          <Col className={classes.elementCol}>
            <Image className={classes.img} roundedCircle />
            <h3>Activity</h3>
          </Col>
        </Row>
        <Row>
          <Col className={classes.calendy}>
            <h2>
              Want to improve your score? Book your free Google consultation!
            </h2>
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
