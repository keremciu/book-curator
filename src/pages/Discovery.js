import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grow from "@material-ui/core/Grow";
import { Link as RouterLink } from "react-router-dom";

import Loading from "components/Loading";
import ErrorMessage from "components/ErrorMessage";
import useFetch from "utils/useFetch";
import { getCategoriesWithBooks } from "utils/aggregateData";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

function TabPanel({ children, activeTab, index, ...other }) {
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={activeTab !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box p={2}>{children}</Box>
    </Typography>
  );
}

const Discovery = () => {
  const theme = useTheme();
  const matchesPhone = useMediaQuery(theme.breakpoints.down("xs"));
  const [activeTab, setActiveTab] = useState(0);
  const { response, error, loading } = useFetch("categories");
  const { response: bookResponse } = useFetch("books");

  // this two calls are nice example to put some memoize stuff.

  if (loading) return <Loading isLoading />;
  if (error) return <ErrorMessage error={error} />;
  // IDEA: we can put suspense to parent and handle loading there.
  if (!response || !bookResponse) return null;

  const { categories } = response;
  const { books } = bookResponse;
  const categoriesWithBooks = getCategoriesWithBooks(categories, books);

  const changeTab = (e, tabIndex) => setActiveTab(tabIndex);

  return (
    <Grid container spacing={2}>
      <Grid item md={3} xs={12}>
        <Paper>
          <Tabs
            orientation={matchesPhone ? "horizontal" : "vertical"}
            variant="scrollable"
            value={activeTab}
            onChange={changeTab}
            aria-label="Categories"
          >
            {categories.map(category => (
              <Tab key={category.id} label={category.title} id={category.id} />
            ))}
          </Tabs>
        </Paper>
      </Grid>
      <Grid item md={9}>
        <Paper>
          {categoriesWithBooks.map((category, index) => (
            <TabPanel key={category.id} activeTab={activeTab} index={index}>
              <Grid container spacing={2}>
                {category.books.map((book, bookIndex) => (
                  <Grid key={book.id} item md={3} xs={6}>
                    <RouterLink to={`/book/${book.id}`}>
                      <Grow
                        in={index === activeTab}
                        timeout={(bookIndex + 1) * 440}
                      >
                        <Card>
                          <CardActionArea>
                            <CardMedia
                              image={book.image_url}
                              title={book.title}
                              style={{ height: 140 }}
                            />
                            <CardContent>
                              <Typography component="h6">
                                {book.title}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Grow>
                    </RouterLink>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Discovery;
