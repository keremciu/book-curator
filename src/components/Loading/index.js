import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

const Loading = ({ isLoading }) =>
  isLoading && (
    <Box p={3}>
      <Grid
        container
        spacing={1}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ height: 200 }}
      >
        <CircularProgress size={100} />
      </Grid>
    </Box>
  );

export default Loading;
