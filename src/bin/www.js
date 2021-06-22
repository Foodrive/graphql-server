import dotenv from "dotenv";
import server from "..";

dotenv.config();

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`);
});
