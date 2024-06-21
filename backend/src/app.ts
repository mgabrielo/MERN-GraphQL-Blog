import express from "express";
import { config } from "dotenv";
import { connectDB } from "./utils/connection";
import { graphqlHTTP } from "express-graphql";
import schema from "./handlers/handlers";
import cors from "cors";
config();

const app = express();
app.use(cors());
app.use("/graphql", graphqlHTTP({ schema: schema, graphiql: true }));
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server Running on " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
