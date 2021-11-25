const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {});
module.exports = {
    swcMinify: true,
    images: {
        domains: ["lh3.googleusercontent.com"],
        minimumCacheTTL: 604800,
    },
};
