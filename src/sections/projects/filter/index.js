import React from "react";

import PropTypes from "prop-types";
import {injectIntl, FormattedMessage} from "gatsby-plugin-intl";

import FilterSlider from "../../../components/filterSlider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import img_reload from "../../../images/projects/reload.png";
import img_arrow from "../../../images/projects/right-arrow.png";
import img_expand from "../../../images/projects/mobile-expand.png";
import img_close from "../../../images/projects/mobile-close.png";
import * as JsSearch from "js-search";

import "./_filter_en.scss";
import "./_filter_ar.scss";

// const defaultItemCountry = { CountryName: "Country" };
//const defaultItemCity = { CityName: "defaultItemCity" };
//const defaultItemArea = { AreaName: "defaultItemArea" };

class Filter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			projects: props.projects,
			search: [],
			searchResults: [],
			isLoading: true,
			isError: false,
			searchQuery: "",
			country: null,
			city: null,
			area: null,
			areas: props.taxLocationData.areaData,
			cities: props.taxLocationData.cityData,
			defaultItemCountry: {
				CountryName: props.intl.messages["projects.filter.country"]
			},
			defaultItemCity: {
				CityName: props.intl.messages["projects.filter.city"]
			},
			defaultItemArea: {
				AreaName: props.intl.messages["projects.filter.area"]
			},
			hasCity: false,
			projectType: props.intl.messages["projects.filter.type"],
			projectBuyRent: `${props.intl.messages["projects.filter.buy"]}`,
			projectState: props.intl.messages["projects.filter.status"],
			bedroomSlider: [2, 6],
			priceSlider: [1, 160000]
		};
		this.onExpand = this.onExpand.bind(this);
		this.onClose = this.onClose.bind(this);
	}
	componentDidMount() {
		this.rebuildIndex();
	}
	countryChange = event => {
		let idx = event.target.selectedIndex;
		let { countryName } = event.target.options[idx].dataset;
		const countryId = event;
		console.log("sdfsdfdsfsdfsd", this.props.taxLocationData.cityData);
		const cities = this.props.taxLocationData.cityData.filter(
			city => city.CountryId == countryId
		);
		console.log("cities after filtering", cities);

		this.setState({
			country: countryName,
			cities: cities,
			areas: [this.state.defaultItemArea],
			city: null,
			area: null
		});
	};
	cityChange = event => {
		let idx = event.target.selectedIndex;
		let { cityName } = event.target.options[idx].dataset;
		const cityId = event;
		console.log("sdfsdfdsfsdfsd", this.props.taxLocationData.areaData);

		const city = event;
		const areas = this.props.taxLocationData.areaData.filter(
			area => area.CityId == cityId
		);
		console.log(" areas after filtering", areas);
		this.setState({
			city: cityName,
			areas: [this.state.defaultItemArea, ...areas],
			area: null
		});
	};
	areaChange = event => {
		let idx = event.target.selectedIndex;
		let { areaName } = event.target.options[idx].dataset;
		console.log("-------------------", areaName);
		this.setState({ area: areaName });
	};
	projectTypeChange = event => {
		let projectType = event.target.value;
		console.log("projectTyp", projectType);
		this.setState({ projectType });
	};
	projectBuyRentCahnge = event => {
		let projectBuyRent = event.target.value;
		console.log("projectBuyRent", projectBuyRent);
		this.setState({ projectBuyRent });
	};
	projectCompletionStatusChange = event => {
		let projectState = event.target.value;
		console.log("projectBuyRent", projectState);
		this.setState({ projectState });
	};
	bedroomSliderChange = (event, newValue) => {
		let bedroomSlider = newValue;
		console.log("bedroomSlider", bedroomSlider);
		this.setState({ bedroomSlider });
	};
	priceSliderChange = (event, newValue) => {
		let priceSlider = newValue;
		console.log("priceSlider", priceSlider);
		this.setState({ priceSlider });
	};

	rebuildIndex = () => {
		const { projects } = this.state;
		const dataToSearch = new JsSearch.Search(["entityTranslation", "entityId"]);
		dataToSearch.tokenizer = {
			tokenize(term) {
				return term.toString().replace("/[\u0600-\u06FF]/", "");
				// Convert text to an Array of strings and return the Array
			}
		};

		/**
		 *  defines a indexing strategy for the data
		 * more more about it in here https://github.com/bvaughn/js-search#configuring-the-index-strategy
		 */
		dataToSearch.indexStrategy = new JsSearch.PrefixIndexStrategy();
		/**
		 * defines the sanitizer for the search
		 * to prevent some of the words from being excluded
		 *
		 */
		dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer();
		/**
		 * defines the search index
		 * read more in here https://github.com/bvaughn/js-search#configuring-the-search-index
		 */
		dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex([
			"entityTranslation",
			"entityId"
		]);
		dataToSearch.addIndex(["entityTranslation", "title"]); // sets the index attribute for the data
		// dataToSearch.addIndex(["project", "author"]); // sets the index attribute for the data
		console.log(
			"---------------------data to search Index------------------",
			dataToSearch
		);
		dataToSearch.addDocuments(projects); // adds the data to be searched
		this.setState({ search: dataToSearch, isLoading: false });
	};
	searchData = event => {
		const { search } = this.state;

		console.log("queryResult", search);
		const queryResult = search.search(event.target.value);

		this.setState(
			{ searchQuery: event.target.value, searchResults: queryResult },
			() => {
				console.log("call back set state", this.state);
				this.handleProjectDataChange();
			}
		);
	};
	// handleSubmit = event => {
	//   event.preventDefault();
	// };
	handleProjectDataChange = () => {
		this.props.onChangeData(this.state.searchResults);
	};

	handleApplyChange = () => {
		let {
			country,
			city,
			area,
			projectType,
			projectBuyRent,
			projectState,
			priceSlider,
			bedroomSlider
		} = this.state;
		let query = {
			country,
			city,
			area,
			projectType,
			projectBuyRent,
			projectState,
			priceSlider,
			bedroomSlider
		};

		// let query = `${country} ${city} ${area} ${projectType} ${projectBuyRent} ${projectState} ${
		//   priceSlider[0]
		// } ${priceSlider[1]} ${bedroomSlider[0]} ${bedroomSlider[1]} `;

		console.log("the query is ", query);
		this.props.onChangeQuery(this.requering(query));
	};

	handleResetFilterChange = () => {
		console.log("hellooo my name is moussaaab");
		this.setState({
			projectType: "",
			projectBuyRent: "",
			projectState: "",
			country: this.props.taxLocationData.countryData,
			cities: [],
			areas: [this.state.defaultItemArea],
			city: null,
			area: null
		});
	};
	requering = query => {
		let country = null;
		if (query.country != null) country = query.country;
		if (query.city != null) country = query.city;
		if (query.area != null) country = query.area;

		return {
			country: country, //"Abu Dhabi",
			bedroomSlider: query.bedroomSlider,
			priceSlider: query.priceSlider,
			projectBuyRent: query.projectBuyRent,
			projectState: query.projectState,
			projectType: query.projectType
		};
	};
	onExpand() {
		this.filter.classList.add("mobile-filter-visible");
		this.filter.classList.remove("mobile-filter-invisible");
		this.expand.classList.add("mobile-filter-invisible");
		this.expand.classList.remove("mobile-filter-visible");
		this.close.classList.remove("mobile-filter-invisible");
		this.close.classList.add("mobile-filter-visible");
	}
	onClose() {
		this.filter.classList.add("mobile-filter-invisible");
		this.filter.classList.remove("mobile-filter-visible");
		this.expand.classList.add("mobile-filter-visible");
		this.expand.classList.remove("mobile-filter-invisible");
		this.close.classList.remove("mobile-filter-visible");
		this.close.classList.add("mobile-filter-invisible");
	}
	render() {
		const {
			intl,
			taxProjectType,
			taxBuyRent,
			taxLocationData,

			taxCompletionStatus
		} = this.props;
		const {
			projects,
			searchResults,
			searchQuery,
			city,
			areas,
			country,
			cities,
			projectType,
			projectBuyRent,
			projectState,
			defaultItemCountry,
			defaultItemCity,
			defaultItemArea
		} = this.state;
		const queryResults = searchQuery === "" ? projects : searchResults;

		const hasCountry = country && country !== defaultItemCountry;
		const hasCity = city && city !== defaultItemCity;

		// console.log("inside the filter", this.props);

		return (
			<section className={"filter-section " + intl.locale}>
				<div
					className="container filter-container wow fadeInLeft"
					data-wow-duration="2s"
					data-wow-delay="0.5s"
				>
					<div className="filter-title-container">
						<h1>
							{intl.messages["projects.filter.filter"]}
							{queryResults.length}
						</h1>
						<div className="reset-container">
							<h2 className="desktop-filter">
								{intl.messages["projects.filter.reset"]}
							</h2>
							<img
								src={img_reload}
								className="desktop-filter"
								onClick={this.handleResetFilterChange}
							/>
							<img
								src={img_expand}
								className="mobile-filter-visible"
								onClick={this.onExpand}
								ref={c => (this.expand = c)}
							/>
							<img
								src={img_close}
								className="mobile-filter-invisible close-img"
								onClick={this.onClose}
								ref={c => (this.close = c)}
							/>
						</div>
					</div>
					<div
						className="filter-input-container desktop-filter"
						ref={c => (this.filter = c)}
					>
						<div className="search-box">
							<input
								className="search-input"
								type="text"
								value={searchQuery}
								placeholder={intl.messages["projects.filter.search"]}
								onChange={this.searchData}
							/>
							<p className="btn-search">
								{" "}
								<FontAwesomeIcon icon={faSearch} />
							</p>
						</div>
						<div className="input-select-div">
							<select value={projectType} onChange={this.projectTypeChange}>
								<option disabled>{intl.messages["projects.filter.type"]}</option>
								{taxProjectType.map((item, key) => {
									let { name } = item.entityTranslation;
									return <option key={key}>{name}</option>;
								})}
							</select>
						</div>
						<div className="input-select-div">
							<select value={projectBuyRent} onChange={this.projectBuyRentCahnge}>
							<option disabled>{`${intl.messages["projects.filter.buy"]}`}</option>
								{/* <option disabled>{`${intl.messages["projects.filter.buy"]} / ${
									intl.messages["projects.filter.rent"]
									}`}</option>
								{taxBuyRent.map((item, key) => {
									let { name } = item.entityTranslation;
									return <option key={key}>{name}</option>;
								})} */}
							</select>
						</div>
						<div className="input-select-div">
							<select
								onChange={this.countryChange}
								defaultValue={defaultItemCountry.CountryName}
							>
								<option disabled>{intl.messages["projects.filter.country"]}</option>
								{taxLocationData.countryData.map((item, key) => (
									<option
										data-country-name={item.CountryName}
										key={key}
										value={item.id}
									>
										{item.CountryName}
									</option>
								))}
							</select>
						</div>
						<div className="input-select-div">
							<select
								disabled={!hasCountry}
								onChange={this.cityChange}
								defaultValue={defaultItemCity.CityName}
							>
								<option disabled>{intl.messages["projects.filter.city"]}</option>
								{cities.map((item, key) => (
									<option
										data-city-name={item.CityName}
										key={key}
										value={item.id}
										key={item.id}
									>
										{item.CityName}
									</option>
								))}
							</select>
						</div>
						<div className="input-select-div">
							<select
								disabled={!hasCity}
								onChange={this.areaChange}
								defaultValue={defaultItemArea.AreaName}
							>
								<option disabled>{intl.messages["projects.filter.area"]}</option>
								{areas.map((item, key) => (
									<option
										data-area-name={item.AreaName}
										key={key}
										value={item.id}
										key={key}
									>
										{item.AreaName}
									</option>
								))}
							</select>
						</div>
						<div className="slider-container">
							<div className="slider-text">
								<p>{intl.messages["projects.filter.bedroom"]}</p>
							</div>
							<FilterSlider
								onChange={this.bedroomSliderChange}
								start={2}
								end={6}
								min={0}
								max={10}
							/>
						</div>
						<div className="slider-container">
							<div className="slider-text">
								<p>{intl.messages["projects.filter.price"]}</p>
								<p> {intl.messages["projects.filter.aed"]}</p>
							</div>
							<FilterSlider
								onChange={this.priceSliderChange}
								start={500}
								end={10000000}
								min={0}
								max={20000000}
								step={500}
							/>
						</div>
						<div className="input-select-div">
							<select
								value={projectState}
								onChange={this.projectCompletionStatusChange}
							>
								<option disabled>{intl.messages["projects.filter.status"]}</option>
								{taxCompletionStatus.map((item, key) => {
									let { name } = item.entityTranslation;
									return <option key={key}>{name}</option>;
								})}
							</select>
						</div>
						<div className="apply-btn" onClick={this.handleApplyChange}>
							<p>{intl.messages["projects.filter.apply"]}</p>
							<img src={img_arrow} />
						</div>
						<div className="mobile-reset-container">
							<h2 className="desktop-filter">
								{intl.messages["projects.filter.reset"]}
							</h2>
							<img src={img_reload} className="desktop-filter" />
						</div>
					</div>
				</div>
			</section>
		);
	}
}

Filter.propTypes = {
    intl: PropTypes.object.isRequired
};

export default injectIntl(Filter);
