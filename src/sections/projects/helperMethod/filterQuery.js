export default (arr, query) => {
  console.log(arr, "sinside filter export ", query);
  return arr.filter(function(el) {
    if (el.entityTranslation.fieldProjectType.length == 0) return false;
    if (!el.entityTranslation.fieldProjectCountryCityArea) return false;
    if (!el.entityTranslation.fieldProjectPriceAed) return false;
    if (!el.entityTranslation.fieldProjectPriceAedMax) return false;
    if (!el.entityTranslation.fieldProjectBedroom) return false;
    if (!el.entityTranslation.fieldProjectBedroomMax) return false;
    if (!el.entityTranslation.fieldProjectBuyRent) return false;

    // if(el.entityTranslation.fieldProjectStatus==null)
    // return false;
    // check query.[key] if it is null accept any project has deffrent type, for example
    //if i don't select buy/rent that's mean need project rent and buy with default  min max bed room and price

    // return query.projectType
    //   ? el.entityTranslation.fieldProjectType.some(
    //       // fieldProjectTyp is array of abject for taht we use some like(include)
    //       data => data.entity.entityTranslation.name === query.projectType
    //     )
    //   : true &&
    return (
      (query.projectType
        ? el.entityTranslation.fieldProjectType.some(
            data => data.entity.entityTranslation.name === query.projectType
          )
        : true) &&
      (query.country
        ? el.entityTranslation.fieldProjectCountryCityArea.entity
            .entityTranslation.name == query.country
        : true) &&
      el.entityTranslation.fieldProjectPriceAed >= query.priceSlider[0] &&
      el.entityTranslation.fieldProjectPriceAedMax <= query.priceSlider[1] &&
      el.entityTranslation.fieldProjectBedroom >= query.bedroomSlider[0] &&
      el.entityTranslation.fieldProjectBedroomMax <= query.bedroomSlider[1] &&
      (query.projectBuyRent
        ? el.entityTranslation.fieldProjectBuyRent.entity.entityTranslation
            .name == query.projectBuyRent
        : true)
      // && query.projectState?el.entityTranslation.fieldProjectStatus==query.projectState:true
    );
  });
};
