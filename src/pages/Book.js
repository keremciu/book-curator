import React from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

import { useAuthContext } from "setup/AuthProvider";
import ErrorMessage from "components/ErrorMessage";
import Loading from "components/Loading";

import useFetch from "utils/useFetch";

const Book = ({ match }) => {
  const { authData } = useAuthContext();
  const bookID = match.params.id;
  const { response: book, error, loading } = useFetch(`books/${bookID}`);
  if (loading) return <Loading isLoading />;
  if (error) return <ErrorMessage error={error} />;
  // IDEA: we can put suspense to parent and handle loading there.
  if (!book) return null;
  return (
    <Paper>
      <Box p={3}>
        <Typography variant="h2" component="h2">
          <Box mb={4}>{book.title}</Box>
        </Typography>
        <Typography component="p">{book.content}</Typography>
        {authData.access_type === "free" && (
          <CTA>
            <Button variant="contained" size="large" color="primary">
              Subscribe to read
            </Button>
          </CTA>
        )}
      </Box>
    </Paper>
  );
};

const CTA = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -300px;
  min-height: 400px;
  background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
  position: relative;
  z-index: 1000;
`;

export default Book;
