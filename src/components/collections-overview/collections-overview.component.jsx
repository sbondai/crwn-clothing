import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CollectionPreview from "../collections-preview/collection-preview.component.jsx";
import { selectorCollectionsForPreview } from "../../redux/shop/shop.selector.js";
import "./collections-overview.styles.scss";

const CollectionsOverview = ({ collections }) => {
  return (
    <div className="collections-overview">
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  collections: selectorCollectionsForPreview,
});
export default connect(mapStateToProps)(CollectionsOverview);
