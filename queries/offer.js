module.exports = async (graphql, locales) => {
  return await Promise.all(
    locales.map(async lan => {
      return await graphql(`
      query B {
        cms {
          nodeQuery(limit:100,
            filter: {
              conjunction: OR
              conditions: [{ operator: EQUAL, field: "type", value: ["offer"] }]
            }
          ) {
            entities {
              entityTranslation(language: ${lan}) {
                ...Offer
              }
            }
          }
        }
      }
  
      fragment Offer on GraphCMS_NodeOffer {
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
