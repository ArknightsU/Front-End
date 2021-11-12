const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {});
module.exports = {
    swcMinify: true,
    images: {
        minimumCacheTTL: 604800,
    },
};
