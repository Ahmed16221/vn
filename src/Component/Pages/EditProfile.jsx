import React, { useState, useContext } from "react";
import { ListDataContext } from "../Context/listingConext";
import {
  Grid,
  Typography,
  Container,
  Paper,
  Box,
  Divider,
  TextField,
  Button,
  Switch,
} from "@mui/material";

const getId = (idString) => {
  let splitAr = idString.slice(-1)[0];
  return splitAr;
};
const EditProfile = (props) => {
  const listContextData = useContext(ListDataContext);
  const [imageLink, setImageLink] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDesciption] = useState("");
  const [email, setEmail] = useState("");
  const [isTalentVerified, setIsTalentVerified] = useState(true);
  const [isNewProfile, setIsNewProfile] = useState(true);
  const [id, setId] = useState();
  useState(() => {
    if (getId(props.history.location.pathname.split("/")) !== "0") {
      setImageLink(listContextData.tempProfile.imageUrl);
      setFirstName(listContextData.tempProfile.first_name);
      setLastName(listContextData.tempProfile.last_name);
      setDesciption(listContextData.tempProfile.description);
      setEmail(listContextData.tempProfile.email);
      setIsTalentVerified(listContextData.tempProfile.is_verified);
      setId(listContextData.tempProfile.id);
      setIsNewProfile(false);
    }
  }, [listContextData.tempProfile]);

  return (
    <>
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" sx={{ padding: "10px" }}>
            Create Profile
          </Typography>
          <Divider />
          <Box mt={2}>
            <Typography>Image Link</Typography>
            <TextField
              required
              id="link"
              name="link"
              label=""
              value={imageLink}
              fullWidth
              variant="outlined"
              onChange={(e) => {
                setImageLink(e.target.value);
              }}
            />

            <Grid container sx={{ marginTop: "20px" }} spacing={1}>
              <Grid item xs={12} sm={12} md={6}>
                <Typography>First Name</Typography>
                <TextField
                  required
                  id="firstname"
                  name="firstname"
                  label=""
                  value={firstName}
                  fullWidth
                  variant="outlined"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Typography>Last Name</Typography>
                <TextField
                  required
                  id="lastnam"
                  name=""
                  label=""
                  value={lastName}
                  fullWidth
                  variant="outlined"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Grid container sx={{ marginTop: "20px" }} spacing={1}>
              <Grid item xs={12} sm={12} md={12}>
                <Typography>Email</Typography>
                <TextField
                  required
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container sx={{ marginTop: "20px" }} spacing={1}>
              <Grid item xs={12} sm={12} md={12}>
                <Typography>Description</Typography>
                <TextField
                  required
                  id="description"
                  name="description"
                  multiline
                  value={description}
                  rows={5}
                  label="Write a description for the talent"
                  fullWidth
                  onChange={(e) => {
                    setDesciption(e.target.value);
                  }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Paper
              variant="outlined"
              sx={{ marginTop: "20px", backgroundColor: "#2B2B2B" }}
            >
              <Grid container sx={{ margin: "2px" }} spacing={1}>
                <Grid item xs={12} sm={12} md={11}>
                  <Typography ml={2} mt={0} variant="h5">
                    Telent is verified
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={12} md={1}>
                  <Switch
                    checked={isTalentVerified}
                    onChange={() => {
                      setIsTalentVerified(!isTalentVerified);
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Box>

          <Box mt={10} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Divider />
            <Button
            color="maincolor"
            sx={{color:"white"}}
              onClick={() => {
                let tempProfile = {
                  updateProfileId: !isNewProfile && id,
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  isVerified: isTalentVerified,
                  imageUrl: imageLink,
                  description: description,
                };

                if (
                  firstName === "" ||
                  lastName === "" ||
                  email === "" ||
                  imageLink === "" ||
                  description === ""
                ) {
                  alert("All fields are required please check again!! ");
                } else {
                  isNewProfile
                    ? listContextData.addProfile({
                        variables: tempProfile,
                      })
                    : listContextData.updateProfile({
                        variables: tempProfile,
                      });
                }
                // window.location.href = "/";
              }}
              variant="contained"
            >
              {isNewProfile ? "Create Profile" : "Update Profile"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default EditProfile;
