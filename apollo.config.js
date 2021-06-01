module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "challenge-backend",
      url: "https://challengebackend.herokuapp.com/graphql",
    },
  },
};