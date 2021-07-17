import server from "..";

server.listen({ port: 8080 }).then(({ url }) => {
  console.log(`Server is running on ${url}`);
});
