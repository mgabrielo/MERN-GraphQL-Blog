//@ts-nocheck
import { Avatar, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { profileStyles } from "../../../styles/profile-styles";
import BlogItem from "../../blogs/BlogItem";
import { useQuery } from "@apollo/client";
import { GET_USER_BLOGS } from "../../graphql/queries";
import { useEffect } from "react";
import Spinner from "../../spinner/Spinner";

const Profile = () => {
  const { userData: user } = useSelector((state: any) => state.auth);
  const { data, refetch, loading } = useQuery(GET_USER_BLOGS, {
    variables: {
      id: user?.id,
    },
  });

  useEffect(() => {
    if (data) {
      refetch();
    }
  }, [data, refetch]);

  return (
    <Box sx={profileStyles.container}>
      <Box sx={profileStyles.blogContainer}>
        <Typography variant="h2" sx={profileStyles.text}>
          Your Posts{" "}
        </Typography>
        <Box sx={profileStyles.cardContainer}>
          {loading && <Spinner />}
          {data?.user?.blogs.length > 0 &&
            data?.user?.blogs.map((item: any, index) => {
              if (item) {
                return (
                  <BlogItem
                    showActions={true}
                    key={index}
                    refetch={refetch}
                    blog={{
                      title: item.title,
                      content: item.content,
                      date: item.date,
                      id: item.id,
                    }}
                  />
                );
              }
              return null;
            })}
          {data?.user?.blogs.length === 0 && (
            <Box sx={{ display: "flex", flex: 1, justifySelf: "center" }}>
              <Typography sx={{ textAlign: "center", width: "100%" }}>
                No Blog Post Available
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Box sx={profileStyles.profileContainer}>
        <Box sx={profileStyles.userContainer}>
          <Avatar sx={profileStyles.avatar}></Avatar>
          <Typography variant={"h5"} fontFamily={"Work Sans"}>
            name : {data?.user?.name}
          </Typography>
          <Typography variant={"h5"} fontFamily={"Work Sans"}>
            email: {data?.user?.email}
          </Typography>
          <Typography variant={"h5"} fontFamily={"Work Sans"} sx={{ mb: 5 }}>
            number of blogs: {data?.user?.blogs?.length}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
