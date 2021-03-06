/**
 * createPages
 *  Handler to create pages content type
 *
 */

module.exports = async (graphql, locales) => {
  return await Promise.all(
    locales.map(async lan => {
      return await graphql(`
      {
        cms {
          nodeQuery(limit:100,
            filter: {
              conjunction: AND
              conditions: [
                { operator: EQUAL, field: "type", value: ["project"] },
                {field:"field_project_payment_plan",value:[""],operator: NOT_EQUAL}
                                
              ]
            }
          ) {
            entities {
              entityTranslation(language: ${lan}) {
                ...Project
              }
            }
          }
        }
      }
      fragment Project on GraphCMS_NodeProject {
        title
        entityId
        path {
          alias
        }
      }
    `).then(result => {
        if (result.errors) {
          Promise.reject(result.errors);
        }

        return result.data.cms.nodeQuery.entities;
      });
    })
  ).then(async result => {
    if (result.errors) {
      Promise.reject(result.errors);
    }
    return [].concat(...result);
  });
};
