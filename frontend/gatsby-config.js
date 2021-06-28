module.exports = {
  siteMetadata: {
    title: "Neuro Tracker",
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
