import {
  Box,
  Button,
  InputLabel,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { authStyles } from "../../styles/auth-styles";
import { ImBlogger } from "react-icons/im";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { USER_LOGIN, USER_SIGNUP } from "../graphql/mutations";
import { useDispatch } from "react-redux";
import { authLogin, setUserData } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

type InputType = {
  name: string;
  email: string;
  password: string;
};
const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<InputType>();
  const [login] = useMutation(USER_LOGIN);
  const [signup] = useMutation(USER_SIGNUP);
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  const [isSignUp, setIsSignUp] = useState(false);

  const onResRecieved = (data: any) => {
    dispatch(authLogin());
    if (data?.signup) {
      dispatch(setUserData(data.signup));
    } else if (data?.login) {
      dispatch(setUserData(data.login));
    }
    return navigate("/blogs");
  };

  const onSubmit = async ({ name, email, password }: InputType) => {
    if (isSignUp) {
      // signup Request
      try {
        if (email !== null && password !== null && name !== null) {
          await signup({ variables: { name, email, password } })
            .then((res) => {
              if (res !== undefined && res?.data) {
                onResRecieved(res.data);
              }
            })
            .catch((err) => {
              toast.error(err?.message);
            });
          reset();
        } else {
          toast.error("name, email , password must be provided");
        }
      } catch (error: any) {
        console.log(error?.messaage);
      }
    } else {
      // login Request
      try {
        if (email !== null && password !== null) {
          await login({ variables: { email, password } })
            .then((res) => {
              if (res !== undefined && res?.data) {
                onResRecieved(res.data);
              }
            })
            .catch((err) => {
              toast.error(err?.message);
            });
          reset();
        } else {
          toast.error("email and password must be provided");
        }
      } catch (error: any) {
        console.log(error?.message);
      }
    }
  };
  return (
    <Box sx={authStyles.container}>
      <Box sx={authStyles.logoTitle}>
        <ImBlogger
          style={{ borderRadius: "50%", padding: "10px", background: "#ccc" }}
          size={"30px"}
        />
        <Typography sx={authStyles.logoText}>Dev GraphQl Blog</Typography>
      </Box>
      <Box
        sx={{ ...authStyles.formContainer, width: isBelowMd ? "50%" : "30vw" }}
      >
        <Typography sx={authStyles.logoText}>
          {isSignUp ? "Sign Up" : "Login"}
        </Typography>
        {/* @ts-ignore */}
        <form style={authStyles.form} onSubmit={handleSubmit(onSubmit)}>
          {isSignUp && (
            <>
              <InputLabel aria-label="name"></InputLabel>
              <TextField
                helperText={
                  Boolean(errors.name) ? "Name Field is Required" : ""
                }
                error={Boolean(errors.name)}
                aria-label="name"
                label="Name"
                {...register("name", { required: "true" })}
              />
            </>
          )}
          <InputLabel aria-label="email"></InputLabel>
          <TextField
            helperText={Boolean(errors.email) ? "Incorrect Email Format" : ""}
            error={Boolean(errors.email)}
            aria-label="email"
            label="Email"
            type="email"
            {...register("email", {
              required: "true",
              validate: (val: string) =>
                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val),
            })}
          />
          <InputLabel aria-label="password"></InputLabel>
          <TextField
            helperText={
              Boolean(errors.password)
                ? "Password length must be more than 5 characters"
                : ""
            }
            error={Boolean(errors.password)}
            aria-label="password"
            label="Password"
            type="password"
            {...register("password", { required: true, minLength: 6 })}
          />
          <Button variant="outlined" type="submit" sx={authStyles.submitBtn}>
            {!isSignUp ? "Login" : "Sign Up"}
          </Button>
        </form>
        <Box sx={{ my: 2, cursor: "pointer" }}>
          <Typography onClick={() => setIsSignUp((prev) => !prev)}>
            {" "}
            {!isSignUp
              ? "Don't have an Account ? Sign Up"
              : "Already have an account? Log In"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;
