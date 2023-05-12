import React, { useContext, useEffect, useState } from "react";
import { ListDataContext } from "../";
import {Link,   useLinkClickHandler, } from "react-router-dom";
import {
  Grid,
  Avatar,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
  Box,
  Collapse,
  ListItemText,
  ListItemButton,
  List,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  Divider,
  Stack,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VerifiedIcon from "@mui/icons-material/Verified";

const ConfirmationDialog = (props) => {
  const listContextData = useContext(ListDataContext);
  const [open, setOpen] = useState(props.open);
  return (
    <Dialog
      open={open}
      onClose={props.close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Remove Profile"}</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Removed profile will be deleted permenantly and won’t be available
          anymore.
        </DialogContentText>
      </DialogContent>

      <Stack
        justifyContent="center"
        alignItems="center"
        p={2}
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 6 }}
      >
        <Button
          sx={{ width: "200px" }}
          variant="contained"
          onClick={props.close}
        >
          Cancel
        </Button>
        <Button
          sx={{ width: "200px" }}
          variant="contained"
          color="error"
          autoFocus
          onClick={() => {
            listContextData.deleteProfile({
              variables: { deleteProfileId: props.id },
            });
            props.close();
          }}
        >
          Agree
        </Button>
      </Stack>
    </Dialog>
  );
};
const ProfileCardContent = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  let to=`/editprofile/${props.id}`
  const listContextData = useContext(ListDataContext);

  let handleDispatch = ()=>{
    listContextData.dispatch({ type: "PROFILEEDIT", payload: {...props} });
  }
  let handleEditClick = useLinkClickHandler(to, {
  state: {...props}, 
    });
  return (
    <Grid key={props.id} item xs={12} sm={6} md={3}>
      <Card
        sx={{
          maxWidth: 345,
          minHeight: "21` 50px",
          backgroundColor: "#181A1C",
        }}
      >
        <CardHeader
          avatar={<Avatar aria-label="recipe">R</Avatar>}
          action={
            <>
              <IconButton
                onClick={() => {
                  listContextData.dispatch({ type: "PROFILEEDIT", payload: {...props} });
                  setIsOpen(!isOpen);
                }}
                aria-label="settings"
              >
                <MoreVertIcon />
              </IconButton>
              <Box
                sx={{
                  minWidth: 50,
                  position: "absolute",
                  mr: 0,
                  zIndex: 3,
                  marginLeft: "-3%",
                  backgroundColor: "#232425",
                }}
              >
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton
                      onClick={() => {
                        setIsOpenDialog(true);
                      }}
                    >
                      <ListItemText primary="Delete" />
                    </ListItemButton>
                    <ListItemButton>
                        <Link style={{color:"white", textDecoration:"none"}} to={`/editprofile/${props.id}`} >
                      <ListItemText primary="Edit" />
                      </Link>
                    </ListItemButton>
                  </List>
                  {isOpenDialog && (
                    <ConfirmationDialog
                      id={props.id}
                      open={isOpenDialog}
                      close={() => {
                        setIsOpenDialog(false);
                      }}
                    />
                  )}
                </Collapse>
              </Box>
            </>
          }
          title={
            <>
              {props.first_name}
              <IconButton aria-label="settings">
                <VerifiedIcon />
              </IconButton>
            </>
          }
          subheader={props.email}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

const ProfileContent = (props) => {
  const listContextData = useContext(ListDataContext);
  const [profileListing, setProfileListing] = useState([]);

  useEffect(() => {
    if (listContextData.isLoaded) {
      setProfileListing(listContextData.listData.getAllProfiles.profiles);
    }
  }, [listContextData]);
  return (
    <>
      <Grid sx={{ mt: 2 }} container spacing={2}>
        {profileListing.map((data) => (
          <>
            <ProfileCardContent key={data.id} {...data} {...props}/>
          </>
        ))}
      </Grid>
    </>
  );
};

export default ProfileContent;
