import { Button, Container, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   const onSubmit = (e) => {
  //     e.preventDefault();
  //     //sign in
  //   };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="כתובת מייל"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="סיסמה"
          type="password"
          autoComplete="current-password"
        />
        <Button
          //   onClick={(e) => {
          //     onSubmit(e);
          //   }}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Sign In
        </Button>
      </form>
    </Container>
  );
};

export default SignIn;
