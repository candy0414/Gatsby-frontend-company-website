"use strict";

exports.onCreateWebpackConfig = ({stage, actions}) => {
    var svgFiles = /\.icon$/;
    var svgLoader = `svg-sprite-loader`;

    switch (stage) {
        case `develop`:
        case `develop-html`:
        case `build-html`:
        case `build-javascript`: {
            actions.setWebpackConfig({
                module: {
                    rules: [
                        {
                            test: svgFiles,
                            use: [`svg-sprite-loader`]
                        }
                    ]
                }
            });
        }
        default: {
            return;
        }
    }
};

// exports.onCreatePage = ({ page, actions }) => {
//   const { createPage, deletePage } = actions;
//   deletePage(page);
//   const language ="EN"
//   if(page.context.intl.language =="ar")
//   const language ="AR"
// const language = page.context.intl.language;
//   createPage({
//     ...page,
//     context: {
//       ...page.context,
//       lan: `EN`
//     }
//   });
// };
exports.onCreatePage = ({page, actions}) => {
    const {createPage, deletePage} = actions;
    const oldPage = Object.assign({}, page);

    // if ("undefined" === typeof page.context["intl"]) {
    //   // The property DOESN'T exists
    //   console.log(
    //     "esxf========================================The property DOESN'T exists================================================"
    //   );
    // } else {
    //   let lang = page.context.intl.language;

    //   page.context.lang = lang.toUpperCase();
    // }

    if ("undefined" !== typeof page.context["intl"]) {
        let lang = page.context.intl.language;

        page.context.lang = lang.toUpperCase();
    }

    if (page.context.lang !== oldPage.context.lang) {
        // Replace new page with old page
        deletePage(oldPage);
        createPage(page);
    }
};

/**
 * you need to add the file query inside the folder graphqlQuery
 * then got to index.js and export the folder
 *  add the file in the  const { projectEn, projectAr } = require("../../graphqlQuery");
 * add to the variable templet the file.js and the path
 * add variable pageNameQuery = await .....
 * add the variable inside the promise all
 *
 */
const path = require(`path`);
const {project, offer, projectPayment} = require("../../queries");

exports.createPages = async ({graphql, actions}) => {
    const {createPage} = actions;
    const locales = ["EN", "AR"];
    const templates = [
        {file: "project.js", path: "project"},
        {file: "offer.js", path: "offer"}, // remove oofer and change to new just testing
        {file: "payment.js", path: "payment"}
    ];

    let projectQuery = await project(graphql, locales);
    let offerQuery = await offer(graphql, locales);
    let projectPaymentQuery = await projectPayment(graphql, locales);

    return Promise.all([projectQuery, offerQuery, projectPaymentQuery]).then(
        async result => {
            if (result.errors) {
                Promise.reject(result.errors);
            }

            //console.log("the result is ------------------- ", result);

            result.forEach((item, index) => {
                let pageComponent = path.resolve(
                    `./src/templates/${templates[index].file}`
                );

                /*console.log(
                    `\n\n############################\n## ${templates[index].file}:`
                );*/

                item.forEach((sub, i) => {
                    if (sub.entityTranslation != null) {
                        /*console.log(
                            `/${templates[index].path}${sub.entityTranslation.path.alias}`
                        );*/
                        createPage({
                            path: `/${templates[index].path}${sub.entityTranslation.path.alias}`,
                            component: pageComponent,
                            context: {
                                id: sub.entityTranslation.entityId
                            }
                        });
                    }
                });
            });
        }
    );
};
