import { useQuery } from "@apollo/client";
import { GET_BLOGS } from "../graphql/queries";
import BlogsList from "./BlogsList";
import { useEffect } from "react";
import Spinner from "../spinner/Spinner";

const Blogs = () => {
  const { loading, data, error, refetch } = useQuery(GET_BLOGS);
  useEffect(() => {
    if (data) {
      refetch();
    }
  }, [data, refetch]);

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <p>Error In Fetching Blogs...</p>;
  }
  return (
    <div>{data?.blogs && !loading && <BlogsList blogs={data?.blogs} />}</div>
  );
};

export default Blogs;
