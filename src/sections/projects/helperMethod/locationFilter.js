/*
 * this function take three argument(firstObj,secondObj,thirdObj)
 *   to decide which country city and area and return to object  
 */
const createLocationObj = (firstObj, secondObj, thirdObj) => {
    let objLocation = {country: "", city: "", area: ""}
    if (!secondObj && !thirdObj) {
        objLocation.country = firstObj;
    }
    if (!!secondObj && !thirdObj) {
        objLocation.country = secondObj;
        objLocation.city = firstObj;
    }
    if (!!secondObj && !!thirdObj) {
        objLocation.country = thirdObj;
        objLocation.city = secondObj;
        objLocation.area = firstObj;
    }
    return objLocation;
}
/*
 * iSLocationExist to check if the country/city/area exist in the array conatin all the country/city/area 
 * locationNameKey & locationIdKey: (CountryName,CityName,AreaName) these keys inside object of  these arrays {countryData,cityData,areaData}
 * to check the value of location (generate from createLocationObj function) is in the array,
 * 
 */
const iSLocationExist = (locationNameKey, locationNameValue, locationIdKey, locationIdValue, locationData) => {
    //console.log(locationData)
    const index = locationData.findIndex(value =>
            //the null value only if i check the country because we don't have two country same name
            //other ways we need to check id and name (city or area)
        (value[locationNameKey] === locationNameValue) && (locationIdValue === null ? true : (value[locationIdKey] === locationIdValue))
    );

    if (index > -1)
        return {exist: true, id: locationData[index].id}
    else return {exist: false, id: locationData.length}


}
/**
 * this function create the relation between country and city and area using id
 * example country data => { CountryName: 'United States', Id: '1' }
 * city data => { StateName: 'New York', CountryId: '1', Id: '101' },
 * area data =>   { CityName: 'Albany', CityId: '101', Id: 201 },
 * country ID start from 100
 * City ID start from 200
 * Area ID start from 300
 */
const createLocationIds = (locations, countryData, cityData, areaData) => {

    let result = {response: "location exist", data: {}}

    let countryIsExist = iSLocationExist('CountryName', locations.country, null, null, countryData);

    // if the country doesnot exist we need to create {country} & {city} & {area}
    //console.log(countryIsExist)
    if (!countryIsExist.exist) {
        //console.log(countryData.length)
        result.data.countryObj = {CountryName: locations.country, id: (countryData.length + 100)}
        if (locations.city)
            result.data.cityObj = {
                CityName: locations.city,
                CountryId: (countryData.length + 100),
                id: (cityData.length + 200)
            }
        if (locations.area)
            result.data.areaObj = {
                AreaName: locations.area,
                CityId: (cityData.length + 200),
                id: (areaData.length + 300)
            }
        result.response = "location  doesnot exist"
        return result
    }
    let cityIsExist = iSLocationExist('CityName', locations.city, "CountryId", countryIsExist.id, cityData)
    // if the city does not exist we need to create new city and area objc, they are related 
    //and are related to country id(countryIsExist.id) beacuse it found and the city and area does't found
    if (!cityIsExist.exist) {
        // console.log(cityIsExist)
        if (locations.city)
            result.data.cityObj = {CityName: locations.city, CountryId: countryIsExist.id, id: (cityData.length + 200)}
        if (locations.area)
            result.data.areaObj = {
                AreaName: locations.area,
                CityId: (cityData.length + 200),
                id: (areaData.length + 300)
            }
        result.response = "city and area doesnot exist"
        return result
    }
    let areaIsExist = iSLocationExist('AreaName', locations.area, "CityId", cityIsExist.id, areaData);
    if (!areaIsExist.exist) {
        if (locations.area)
            result.data.areaObj = {AreaName: locations.area, CityId: cityIsExist.id, id: (areaData.length + 300)}
        result.response = "area doesnot exist"
        return result
    }
    return result

}
// -------------------------------------------    -----------------
const dataexample = [
    {
        "entityTranslation": {
            "reverseFieldProjectCountryCityAreaNode": {
                "entities": [
                    {
                        "entityTranslation": {
                            "queryFieldProjectCountryCityArea": {
                                "entities": [
                                    {
                                        "entityTranslation": {
                                            "name": "United Arab Emirates",
                                            "parent": [
                                                {
                                                    "entity": null
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
        }
    },
    {
        "entityTranslation": {
            "reverseFieldProjectCountryCityAreaNode": {
                "entities": [
                    {
                        "entityTranslation": {
                            "queryFieldProjectCountryCityArea": {
                                "entities": [
                                    {
                                        "entityTranslation": {
                                            "name": "Sheikh Zayed Road",
                                            "parent": [
                                                {
                                                    "entity": {
                                                        "entityTranslation": {
                                                            "entityLabel": "Dubai"
                                                        },
                                                        "parent": [
                                                            {
                                                                "entity": {
                                                                    "entityTranslation": {
                                                                        "entityLabel": "United Arab Emirates"
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
        }
    },
    {
        "entityTranslation": {
            "reverseFieldProjectCountryCityAreaNode": {
                "entities": [
                    {
                        "entityTranslation": {
                            "queryFieldProjectCountryCityArea": {
                                "entities": [
                                    {
                                        "entityTranslation": {
                                            "name": "Dubai Marina",
                                            "parent": [
                                                {
                                                    "entity": {
                                                        "entityTranslation": {
                                                            "entityLabel": "Dubai"
                                                        },
                                                        "parent": [
                                                            {
                                                                "entity": {
                                                                    "entityTranslation": {
                                                                        "entityLabel": "United Arab Emirates"
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
        }
    },
    {
        "entityTranslation": {
            "reverseFieldProjectCountryCityAreaNode": {
                "entities": [
                    {
                        "entityTranslation": {
                            "queryFieldProjectCountryCityArea": {
                                "entities": [
                                    {
                                        "entityTranslation": {
                                            "name": "Al Reem Island",
                                            "parent": [
                                                {
                                                    "entity": {
                                                        "entityTranslation": {
                                                            "entityLabel": "Abu Dhabi"
                                                        },
                                                        "parent": [
                                                            {
                                                                "entity": {
                                                                    "entityTranslation": {
                                                                        "entityLabel": "United Arab Emirates"
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
        }
    },
    {
        "entityTranslation": {
            "reverseFieldProjectCountryCityAreaNode": {
                "entities": [
                    {
                        "entityTranslation": {
                            "queryFieldProjectCountryCityArea": {
                                "entities": [
                                    {
                                        "entityTranslation": {
                                            "name": "Al Reem Island1",
                                            "parent": [
                                                {
                                                    "entity": {
                                                        "entityTranslation": {
                                                            "entityLabel": "Abu Dhabi"
                                                        },
                                                        "parent": [
                                                            {
                                                                "entity": {
                                                                    "entityTranslation": {
                                                                        "entityLabel": "United Arab Emirates"
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
        }
    },
    {
        "entityTranslation": {
            "reverseFieldProjectCountryCityAreaNode": {
                "entities": [
                    {
                        "entityTranslation": {
                            "queryFieldProjectCountryCityArea": {
                                "entities": [
                                    {
                                        "entityTranslation": {
                                            "name": "Dubai",
                                            "parent": [
                                                {
                                                    "entity": {
                                                        "entityTranslation": {
                                                            "entityLabel": "United Arab Emirates"
                                                        },
                                                        "parent": [
                                                            {
                                                                "entity": null
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
        }
    },
    {
        "entityTranslation": {
            "reverseFieldProjectCountryCityAreaNode": {
                "entities": [
                    {
                        "entityTranslation": {
                            "queryFieldProjectCountryCityArea": {
                                "entities": [
                                    {
                                        "entityTranslation": {
                                            "name": "Abu Dhabi",
                                            "parent": [
                                                {
                                                    "entity": {
                                                        "entityTranslation": {
                                                            "entityLabel": "United Arab Emirates"
                                                        },
                                                        "parent": [
                                                            {
                                                                "entity": null
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
        }
    },
    {
        "entityTranslation": {
            "reverseFieldProjectCountryCityAreaNode": {
                "entities": [
                    {
                        "entityTranslation": {
                            "queryFieldProjectCountryCityArea": {
                                "entities": [
                                    {
                                        "entityTranslation": {
                                            "name": "United Arab Emirates",
                                            "parent": [
                                                {
                                                    "entity": null
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
        }
    },
    {
        "entityTranslation": {
            "reverseFieldProjectCountryCityAreaNode": {
                "entities": [
                    {
                        "entityTranslation": {
                            "queryFieldProjectCountryCityArea": {
                                "entities": [
                                    {
                                        "entityTranslation": {
                                            "name": "Beirut",
                                            "parent": [
                                                {
                                                    "entity": {
                                                        "entityTranslation": {
                                                            "entityLabel": "Lebanon"
                                                        },
                                                        "parent": [
                                                            {
                                                                "entity": null
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
        }
    },
    {
        "entityTranslation": {
            "reverseFieldProjectCountryCityAreaNode": {
                "entities": []
            }
        }
    },
    {
        "entityTranslation": {
            "reverseFieldProjectCountryCityAreaNode": {
                "entities": [
                    {
                        "entityTranslation": {
                            "queryFieldProjectCountryCityArea": {
                                "entities": [
                                    {
                                        "entityTranslation": {
                                            "name": "Lebanon",
                                            "parent": [
                                                {
                                                    "entity": null
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
        }
    }, {
        "entityTranslation": {
            "reverseFieldProjectCountryCityAreaNode": {
                "entities": [
                    {
                        "entityTranslation": {
                            "queryFieldProjectCountryCityArea": {
                                "entities": [
                                    {
                                        "entityTranslation": {
                                            "name": "Arjan",
                                            "parent": [
                                                {
                                                    "entity": {
                                                        "entityTranslation": {
                                                            "entityLabel": "Beirut"
                                                        },
                                                        "parent": [
                                                            {
                                                                "entity": {
                                                                    "entityTranslation": {
                                                                        "entityLabel": "Lebanon"
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
        }
    },
    {
        "entityTranslation": {
            "reverseFieldProjectCountryCityAreaNode": {
                "entities": [
                    {
                        "entityTranslation": {
                            "queryFieldProjectCountryCityArea": {
                                "entities": [
                                    {
                                        "entityTranslation": {
                                            "name": "Solidere",
                                            "parent": [
                                                {
                                                    "entity": {
                                                        "entityTranslation": {
                                                            "entityLabel": "Beirut"
                                                        },
                                                        "parent": [
                                                            {
                                                                "entity": {
                                                                    "entityTranslation": {
                                                                        "entityLabel": "Lebanon"
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
        }
    }
]


//country
/**
 * these the empty array taht we need to push the data inside them
 */
export default (data) => {
    let countryData = [
        // { CountryName: 'Australia', id: 102 },
        // { CountryName: 'United States', id: 101 },
        //  { CountryName: 'lebanon', id: 103 }
    ];

    // define the state DropDownList data
    let cityData = [
        // { CityName: 'New York', CountryId: 101, id: 201 },
        // { CityName: 'Virginia', CountryId: 101, id: 202 },
        // { CityName: 'Tasmania', CountryId: 102, id: 205 },
        //  { CityName: 'New York', CountryId: 103, id: 206 }
    ];

    // define the city DropDownList data
    let areaData = [
        // { AreaName: 'Albany', CityId: 201, id: 301 },
        // { AreaName: 'Beacon', CityId: 201, id: 302 },
        // { AreaName: 'Emporia', CityId: 202, id: 306 },
        // { AreaName: 'Hampton', CityId: 202, id: 305 },
        // { AreaName: 'Hobart', CityId: 205, id: 313 },
        // { AreaName: 'Launceston', CityId: 205, id: 314 }
    ];
    //Rearranged the data (coutry city area ) in a object

    // get the availabel(not null) data from graphQl and Rearranged depend coutry area city
    // example get data like :(.. graph ql) to return data like { country: "United Arab Emirates" , city: "" , area: "" }
    data.map((item, key) => {
        // get the nonnull values inside the graphQL to rearranged


        if (item.entityTranslation) {
            let hasFirstObj = ""
            let hasSecondObj = "";
            let hasThirdObj = "";

            let entities = item.entityTranslation.reverseFieldProjectCountryCityAreaNode.entities;

            if (entities.length > 0) {

                if (entities[0].entityTranslation) {
                    let firstObjData = entities[0].entityTranslation.queryFieldProjectCountryCityArea.entities
                    // if(firstObjData.length>0)
                    {


                        let firObject = firstObjData[0].entityTranslation
                        hasFirstObj = firObject.name

                        if (firObject.parent[0].entity) {
                            hasSecondObj = firObject.parent[0].entity.entityTranslation.entityLabel
                            if (firObject.parent[0].entity.parent[0].entity) {
                                hasThirdObj = firObject.parent[0].entity.parent[0].entity.entityTranslation.entityLabel
                            }

                        }
                        //console.log(`${key} - ${hasFirstObj} ${hasSecondObj} ${hasThirdObj}`);
                        let locationobject = createLocationObj(hasFirstObj, hasSecondObj, hasThirdObj);
                        //  console.log("--------"+locationobject.country+" / "+locationobject.city+" / "+locationobject.area)

                        let {countryObj, cityObj, areaObj} = createLocationIds(locationobject, countryData, cityData, areaData).data
                        if (countryObj != undefined) countryData.push(countryObj)
                        //console.log(countryObj,countryData)
                        // countryData.push(countryObj)//countryObj cityObj areaObj
                        if (cityObj != undefined) cityData.push(cityObj)
                        if (areaObj != undefined) areaData.push(areaObj)


                    }

                }
            }
        }
    })
    // console.log(countryData)
    //console.log("---------------------------")
    //console.log(cityData)
    // console.log("---------------------------")
    // console.log(areaData)
    return {countryData: countryData, cityData: cityData, areaData: areaData}
}

//console.log(data)