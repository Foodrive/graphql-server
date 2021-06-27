import server from "..";

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`);
});
