import pb from "lib/pocketbase";
import { useForm } from "react-hook-form";
import useLogout from "hooks/useLogout";
import useLogin from "hooks/useLogin";
import PhotoUploadForm from "PhotoUploadForm";
import PhotoGallery from "PhotoGallery";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";


import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import LibraryAdd from '@mui/icons-material/LibraryAdd';
import AppBar from '@mui/material/AppBar';




import Drawer from '@mui/material/Drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

//utizliing template found on: https://github.com/mui/material-ui/blob/v5.14.20/docs/data/material/getting-started/templates/sign-in/SignIn.js
const Stack = createNativeStackNavigator();

export default function Auth() {
  const logout = useLogout();

  const { login, loading } = useLogin();

  const { register, handleSubmit, reset } = useForm();

  const loggedIn = pb.authStore.isValid;

  async function onLogin(data) {
    // data comes from react-hook-form
    login({ username: data.username, password: data.password });
    reset();
  }


  if (loggedIn)
    return (
      <>

        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={PhotoGallery} />
            <Stack.Screen name="Upload" component={PhotoUploadForm} />
          </Stack.Navigator>
        </NavigationContainer>
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="add"
            sx={{ mr: 2 }}
          >
            <LibraryAdd />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Home
          </Typography>
          <Button color="inherit" type="submit" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
{/*         <Avatar sx={{ width: 24, height: 24 }}>
          {" "}
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h2">
          welcome, {pb.authStore.model.username}!
        </Typography>
        <Button type="submit" onClick={logout}>
          Log Out
        </Button>

        <PhotoUploadForm />

        <PhotoGallery /> */}
      </>
    );

  return (
    <>
      {loading && <p>Loading...</p>}
      {/* <h1>Logged In: {loggedIn && pb.authStore.model.username} </h1> */}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        component="form"
        onSubmit={handleSubmit(onLogin)}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
          type="text"
          autoFocus
          margin="normal"
          fullWidth
          label="Username"
          required
          {...register("username")}
        />
        <TextField
          type="password"
          margin="normal"
          fullWidth
          label="Password"
          required
          {...register("password")}
        />
        <Button fullWidth variant="contained" type="submit" disable={loading}>
          {loading ? "Loading" : "Log In"}
        </Button>
      </Box>
    </>
  );
}
