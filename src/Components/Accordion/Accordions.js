import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Lists from "../Lists/Lists";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "85%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Accordions = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion style={{ marginLeft: "60px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Learn More</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Lists />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Accordions;
