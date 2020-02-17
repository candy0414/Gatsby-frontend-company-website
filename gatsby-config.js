module.exports = {
    siteMetadata: {
        title: "Gatsby Default Starter"
    },
    plugins: [
        "gatsby-plugin-react-helmet",
        "svgo",
        "gatsby-plugin-sass",
        "gatsby-plugin-postcss",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "data",
                path: `${__dirname}/src/data/`
            }
        },
        "gatsby-transformer-json",
        {
            resolve: "gatsby-source-graphql",
            options: {
                // This type will contain remote schema Query type typeName: 'GraphCMS',
                typeName: "GraphCMS",
                // This is the field under which it's accessible  fieldName: 'cms',
                fieldName: "cms",
                // URL to query from  url: 'http://54.161.85.121/en/graphql',
                url: "http://damac.pixelsme.com/graphql",
                refetchInterval: 360
            }
        },
        {
            resolve: "gatsby-plugin-google-tagmanager",
            options: {
                id: "", //GTM-TB7L6V

                // Include GTM in development.
                // Defaults to false meaning GTM will only be loaded in production.
                includeInDevelopment: false,
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/icon.png` // This path is relative to the root of the site.
            }
        },
        // {
        //     resolve: `gatsby-source-drupal-multilanguage`,
        //     options: {
        //         //baseUrl: `http://54.161.85.121/en`,
        //         baseUrl: `http://damac.pixelsme.com/en`,
        //         concurrentFileRequests: 60,
        //     },
        // },
        // {
        //     resolve: `gatsby-source-drupal-multilanguage`,
        //     options: {
        //         //baseUrl: `http://54.161.85.121/ar`,
        //         baseUrl: `http://damac.pixelsme.com/ar`,
        //         concurrentFileRequests: 60,
        //     },
        // },
        {
            resolve: `gatsby-plugin-intl`,
            options: {
                path: `${__dirname}/src/intl`,
                languages: [`en`, `ar`],
                defaultLanguage: `en`,
                redirect: true
                // redirectComponent: require.resolve(`./src/components/redirect.js`),
            }
        },
        {
            resolve: 'gatsby-plugin-polyfill-io',
            options: {
                features: ['Array.prototype.map', 'fetch', 'Promise'],
            },
        },
    ]
};
