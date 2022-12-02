import { PureComponent } from "react";
import CategorySelection from "../components/CategorySelection";
import MainMenu from "../components/MainMenu/MainMenu";
import * as moisturiser from "../images/skin.png";

const categoryConfig = [
  {
    name: "Moisturisers",
    key: "productCategories",
    value: "Moisturiser",
    imageUrl: moisturiser,
  },
  {
    name: "Cleansers",
    key: "productCategories",
    value: "Cleanser",
    imageUrl: moisturiser,
  },
  {
    name: "Exfoliators",
    key: "productCategories",
    value: "Exfoliators",
    imageUrl: moisturiser,
  },
];

const skinConcernConfig = [
  {
    name: "Dry Skin",
    key: "skinConcerns",
    value: "dry-skin",
    imageUrl: moisturiser,
  },
  {
    name: "Sensitive Skin",
    key: "skinConcerns",
    value: "sensitive-skin",
    imageUrl: moisturiser,
  },
  {
    name: "Oily Skin",
    key: "skinConcerns",
    value: "oily-skin",
    imageUrl: moisturiser,
  },
  {
    name: "Anti Aging",
    key: "skinConcerns",
    value: "anti-aging",
    imageUrl: moisturiser,
  },
  { name: "Acne", key: "skinConcerns", value: "acne", imageUrl: moisturiser },
];

class HomePage extends PureComponent {
  render() {
    const { userCountry, handleCountryChange } = this.props;
    return (
      <div class="min-h-screen pb-6 mx-auto">
        {/* <Navbar userCountry={this.props.userCountry} /> */}
        {/* <div class="h-60px"></div> */}
        <div>
          <MainMenu
            userCountry={userCountry}
            handleCountryChange={handleCountryChange}
          />
        </div>
        <div class="flex flex-col md:pt-8 pb-7 px-2 font-montserrat">
          <div class="pb-8">Shop by category</div>
          <CategorySelection config={categoryConfig} />
          <div class="py-8">Shop by skin type or concern</div>
          <CategorySelection config={skinConcernConfig} />
        </div>
      </div>
    );
  }
}

export default HomePage;
