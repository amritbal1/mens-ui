import React, { PureComponent } from "react";
import AsyncSelect from "react-select/async";
import { getSelectStyles } from "../shared/Dropdown/DropdownStyles";
import { getSearchBarData } from "../../services/SearchBarService/SearchBarService";
import { getRequestPayload } from "../../services/SearchBarService/payloadCreator";
import { getFormattedOptions } from "./utils/formatOptions";
import { CustomOption } from "../shared/Dropdown/CustomOption";
import { SEARCH_BAR_OPTIONS, SORTING_FIELD } from "../../utils/enums";
import { withRouter } from "react-router-dom";
import { BASE_FONT } from "../../utils/constants";

class SearchBar extends PureComponent {
  getOptions = async (searchTerm) => {
    const payload = getRequestPayload({ searchTerm });
    const searchResults = await getSearchBarData({ payload });
    if (!searchResults) return;
    return getFormattedOptions({ searchResults });
  };

  handleOptionClick = (selectedOption) => {
    const { type } = selectedOption;
    const { history } = this.props;
    if (type === SEARCH_BAR_OPTIONS.PRODUCT) {
      const { productId } = selectedOption;
      history.push(
        `/product?productId=${productId}&skinTypes=null&skinConcerns=null&productCharacteristics=null&starRating=null&withImages=null&sort=${SORTING_FIELD.MOST_RECENT}&productCategories=null&pageNumber=1`
      );
    }
    if (type === SEARCH_BAR_OPTIONS.BRAND) {
      const { value } = selectedOption;
      history.push(
        `/brand?brands=${value}&sort=${SORTING_FIELD.HIGHEST_STAR_RATING}&starRating=null&skinTypes=null&skinConcerns=null&productCharacteristics=null&minPrice=null&maxPrice=null&productCategories=null&pageNumber=1`
      );
    }
    if (type === SEARCH_BAR_OPTIONS.CATEGORY) {
      const { value } = selectedOption;
      history.push(
        `/category?productCategories=${value}&sort=${SORTING_FIELD.HIGHEST_STAR_RATING}&starRating=null&skinTypes=null&skinConcerns=null&brands=null&productCharacteristics=null&minPrice=null&maxPrice=null&pageNumber=1`
      );
    }
  };

  render() {
    const { overrideStyles } = this.props;
    return (
      <div style={{ fontFamily: BASE_FONT, fontSize: "0.875rem" }}>
        <AsyncSelect
          value=""
          cacheOptions
          loadOptions={this.getOptions}
          styles={getSelectStyles({ overrideStyles })}
          placeholder={"Search for a product..."}
          components={{ Option: CustomOption }}
          onChange={this.handleOptionClick}
          noOptionsMessage={() => null}
        />
      </div>
    );
  }
}

export default withRouter(SearchBar);
