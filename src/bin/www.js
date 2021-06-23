import dotenv from "dotenv";
import path from "path";
import server from "..";

if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: path.resolve(__dirname, "../.env.development") });
} else {
  dotenv.config();
}

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`);
});
