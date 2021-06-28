module.exports = {
  siteMetadata: {
    title: "neuro tracker",
    siteUrl: "https://neuro-tracker.urmzd.com",
  },
  plugins: [
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
  ],
};
