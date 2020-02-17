import React from 'react';

import PropTypes from 'prop-types';
import {injectIntl} from "gatsby-plugin-intl";
import * as moment from "moment";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import "react-tabs/style/react-tabs.css";

import img_arrow from '../../../images/project/arrow.png';

import './_history_en.scss';
import './_history_ar.scss';

class History extends React.Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);

        this.state = {
            dates: [],
            type: [],
            history: [],
            currentDate: null
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    componentWillMount(){
        this.getDates();
    }

    getDates = () => {
        const {history} = this.props;

        var historyCollection = {};
        var dates = [];
        var types = [];

        history.map(function (value, index) { //grouping history items into year historyCollection
            var item = history[index].entityTranslation;
            var year = moment(item.fieldHistoryDate.value).format("YYYY");
            var type = item.type.entity.entityTranslation.entityLabel.toLowerCase();

            if (!historyCollection[year]) {
                historyCollection[year] = [];
                dates.push(year);
            }

            if (!historyCollection[year][type]) {
                historyCollection[year][type] = [];
            }

            if (types.indexOf(type) === -1) {
                types.push(type);
            }

            var historyItem = {text: item.fieldHistorySubTitle, img: item.fieldHistoryImage.url};

            historyCollection[year][type].push(historyItem);
        });

        var currentDate = dates.reduce(function (a, b) {
            return Math.max(a, b);
        });

        this.setState({dates, types, history:historyCollection, currentDate});
    }

    next() {
        this.slider.slickNext();
    }

    previous() {
        this.slider.slickPrev();
    }

    handleSelect(e) {
        var currentDate = e.target.value;
        this.setState({currentDate});
    }

    render() {
        const {intl, whyDamac} = this.props;

        const settings = {
            className: "history-slider",
            slidesToShow: 1,
            fade: true,
            slidesToScroll: 1,
            focusOnSelect: true,
            infinite: true,
            speed: 700,
            // rtl: (intl.locale == "ar" ? true : false),
        };

        const links = [];
        const tabs = [];
        const tabPanels = [];

        Object.keys(this.state.history).forEach(name => {
            links.push(
                <option key={name} value={name}>{name}</option>
            );

            if (name != this.state.currentDate) return;

            this.state.types.map((type) => {
                if (this.state.history[name][type]) {
                    const typeString = "whyDamac.history.nav-text." + type;
                    tabs.push(
                        <Tab key={type + "-" + name} className="history-tab">
                            <label className="select-nav btn">
                                <p>{intl.messages[typeString]}</p>
                                <div className="underline"></div>
                            </label>
                        </Tab>
                    )

                    const historyItems = this.state.history[name][type];

                    const tabContents = [];

                    historyItems.map((item) => {

                        if (intl.locale == "ar") {
                            tabContents.push(
                                <div key={item + "-" + type + "-" + name} className="history-item">
                                    <div className="col-md-6">
                                        <img className="img-history" src={item.img}/>
                                    </div>
                                    <div className="col-md-6">
                                        <h1 className="year-text">{name}</h1>
                                        <div>
                                            <p className="year-explain">{item.text}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        } else {
                            tabContents.push(
                                <div key={item + "-" + type + "-" + name} className="history-item">
                                    <div className="col-md-6">
                                        <h1 className="year-text">{name}</h1>
                                        <div>
                                            <p className="year-explain">{item.text}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <img className="img-history" src={item.img}/>
                                    </div>
                                </div>
                            )
                        }
                    }); //type item loop

                    tabPanels.push(
                        <TabPanel key={type + "-" + name} className="history-tab-panel row">
                            <Slider {...settings} ref={d => (this.slider = d)}>
                                {tabContents}
                            </Slider>
                            {tabContents && tabContents.length > 1 && (
                                <div className="slider-btn-container">
                                    <button onClick={intl.locale == "ar" ? this.next : this.previous}><img
                                        src={img_arrow} className="left-arrow"/></button>
                                    <button onClick={intl.locale == "ar" ? this.previous : this.next}><img
                                        src={img_arrow} className="right-arrow"/></button>
                                </div>
                            )}
                        </TabPanel>
                    );
                }
            }); // types loop
        });

        return (
            <section className={"whyDamac-history-section " + intl.locale}>
                <div className="title-container container wow fadeInLeft">
                    <h1>{whyDamac.historyTitle}</h1>
                    <p>{whyDamac.historySubTitle}</p>
                </div>

                <div className="content-container container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="input-select-div wow fadeInLeft">
                                <select className="year-select" defaultValue={this.state.currentDate}
                                        onChange={this.handleSelect}>
                                    <option value="default"
                                            disabled>{intl.messages["whyDamac.history.year-select"]}</option>
                                    {links}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="wow fadeInLeft">
                        <Tabs
                            selectedTabClassName="history-selected"
                            selectedTabPanelClassName="history-tab-panel-selected"
                        >
                            <TabList className="navbar-group history-tab-list">{tabs}</TabList>
                            {tabPanels}
                        </Tabs>
                    </div>
                </div>

                {/*<div className="content-container container">
                 <div className="row">
                 <div className="col-md-6">
                 <select className="year-select" defaultValue="default">
                 <option value="default"
                 disabled>{intl.messages["whyDamac.history.year-select"]}</option>
                 <option value="2018">2018</option>
                 <option value="2018">2019</option>
                 </select>

                 <div className="navbar-group" data-toggle="buttons">
                 <label className="select-nav btn">
                 <input type="radio" name="plans"/>
                 <p>{intl.messages["whyDamac.history.nav-text.deliveries"]}</p>
                 <div className="underline"></div>
                 </label>
                 <label className="select-nav btn active">
                 <input type="radio" name="plans" checked readOnly/>
                 <p>{intl.messages["whyDamac.history.nav-text.announcements"]}</p>
                 <div className="underline"></div>
                 </label>
                 <label className="select-nav btn">
                 <input type="radio" name="plans"/>
                 <p>{intl.messages["whyDamac.history.nav-text.corporate"]}</p>
                 <div className="underline"></div>
                 </label>
                 </div>
                 </div>
                 </div>

                 <div className="row">
                 <Slider {...settings} ref={d => (this.slider = d)}>
                 <div className="history-item">
                 <div className="col-md-6">
                 <h1 className="year-text">2018</h1>
                 <p className="year-explain">{intl.messages["whyDamac.history.year-explain"]} 1</p>
                 </div>
                 <div className="col-md-6">
                 <img className="img-history" src={img_history}/>
                 </div>
                 </div>
                 <div className="history-item">
                 <div className="col-md-6">
                 <h1 className="year-text">2019</h1>
                 <p className="year-explain">{intl.messages["whyDamac.history.year-explain"]} 2</p>
                 </div>
                 <div className="col-md-6">
                 <img className="img-history" src={img_history}/>
                 </div>
                 </div>
                 </Slider>

                 <div className="slider-btn-container">
                 <button onClick={intl.locale == "ar" ? this.next : this.previous}><img src={img_arrow}
                 className="left-arrow"/>
                 </button>
                 <button onClick={intl.locale == "ar" ? this.previous : this.next}><img src={img_arrow}
                 className="right-arrow"/>
                 </button>
                 </div>
                 </div>

                 </div>*/}
            </section>
        );
    }
}
;

History.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(History);