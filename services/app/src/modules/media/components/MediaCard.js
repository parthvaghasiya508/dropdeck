import React, { useCallback } from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core";
import ColorSwatchComponent from "../../presenter/components/Lightbox/components/ColorSwatchComponent";
import { apiHost } from "../../../App";

const styles = () => makeStyles({
  media: {
    height: 180,
  },
});

const MediaCard = ({ file }) => {
  const useStyles = useCallback(styles(), []);
  const classes = useStyles();

  let url = apiHost();
  if (file.site === "Unsplash") {
    url = `${file.url}&w=500`;
  } else {
    url = `${url}/services/media/${file.name}`;
  }

  return (
    <Grid item key={file._id} xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardMedia className={classes.media} image={url}/>
        <CardActionArea>
          <CardContent>
            <Typography component="h6" variant="h6" noWrap>
              {file.title || file.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {`${file.owner.givenName} ${file.owner.familyName}`}
            </Typography>
            <Typography variant="body1" noWrap>
              {file.description || "No description."}
            </Typography>
            <ColorSwatchComponent swatch={file.swatch}/>
            <Typography variant="subtitle1" color="textSecondary">
              { file.width } x { file.height }
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Credit: { `${file.credit || "Not specified"} (${file.site || "Local"})` }
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
export default MediaCard;
