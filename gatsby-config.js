module.exports = {
  siteMetadata: {
    title: "Can they sponsor me?",
  },
  plugins: [
    "gatsby-plugin-sass", 
    "gatsby-plugin-gatsby-cloud",
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
  ],
};
