import React from 'react';

import PropTypes from 'prop-types';
import { injectIntl } from "gatsby-plugin-intl";

import './_content_en.scss';
import './_content_ar.scss';

class Content extends React.Component {

    render() {
        const { intl } = this.props;
        return (
            <section className={"mortgage-content-section " + intl.locale}>
                <div className="container">
                    <div className="content-container">
                        <h1 className="content-title wow fadeInUp">{intl.messages["sitemap.title"]}</h1>
                        <div className="sub-content-container wow fadeInUp">
                            <ul>
                                <li>{intl.messages["sitemap.pages.page1"]}</li>
                                <li>{intl.messages["sitemap.pages.page2"]}</li>
                                <li>{intl.messages["sitemap.pages.page3"]}</li>
                                <li>{intl.messages["sitemap.pages.page4"]}</li>
                                <li>{intl.messages["sitemap.pages.page5"]}</li>
                                <li>{intl.messages["sitemap.pages.page6"]}</li>
                                <li>{intl.messages["sitemap.pages.page7"]}</li>
                                <li>{intl.messages["sitemap.pages.page8"]}</li>
                                <li>{intl.messages["sitemap.pages.page9"]}</li>
                                <li>{intl.messages["sitemap.pages.page10"]}</li>
                                <li>{intl.messages["sitemap.pages.page11"]}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};

Content.propTypes = {
    intl: PropTypes.object.isRequired,
};


export default injectIntl(Content);
