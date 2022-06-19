import React, { Component } from "react";
import { ReviewFormTitle } from "../../components/ReviewFormTitle/ReviewFormTitle";
import SelectableOptions from "../../components/SelectableOptions/SelectableOptions";
import { Dropdown } from "../../components/shared/Dropdown/Dropdown";
import { withRouter } from "react-router-dom";
import { postUserProfileInformation } from "../../services/ProfileInformationService/ProfileInformationService";
import {
  genderOptions,
  ageGroupOptions,
  skinTypeOptions,
  getEthnicityOptions,
} from "../../utils/profilePageUtils/profilePageUtils";
import { AGE_GROUP_CODE, LOCAL_STORAGE_ITEM } from "../../utils/enums";
import Input from "../../components/Input/Input";
import { additionalBaseStyle } from "../../utils/styles";
import { isEmpty } from "../../utils/objectUtils";
import { postProfileImageToS3 } from "./utils/s3ImagePoster";
import Navbar from "../../components/Navbar/Navbar";
import SinglePreviewUpload from "../../components/MediaUpload/SinglePreviewUpload";

class ProfileSetupPage extends Component {
  state = {
    ageGroup: [],
    gender: [],
    ethnicity: null,
    skinTypes: [],
    firstName: "",
    lastName: "",
    displayName: "",
    profileImage: [],
  };

  componentWillUnmount() {
    this.setState({ profileImage: [] });
  }

  handleProfileImageUpload = ({ files }) => {
    this.setState({ profileImage: files });
  };

  handleFirstNameChange = ({ value }) => {
    this.setState({ firstName: value });
  };

  handleLastNameChange = ({ value }) => {
    this.setState({ lastName: value });
  };

  handleDisplayNameChange = ({ value }) => {
    this.setState({ displayName: value });
  };

  handleEthnicity = (selectedOption) => {
    const { value } = selectedOption;
    this.setState({ ethnicity: value });
  };

  handleOptionSingleSelect = ({ value, fieldToUpdate }) => {
    this.setState({ [fieldToUpdate]: [value] });
  };

  handleOptionMultiSelect = ({ value, fieldToUpdate }) => {
    const currentSelections = this.state[fieldToUpdate];
    const optionIsCurrentlySelected = currentSelections.find(
      (option) => option === value
    );
    let updatedSelections;
    if (optionIsCurrentlySelected) {
      updatedSelections = currentSelections.filter(
        (option) => option !== value
      );
    } else {
      updatedSelections = [...currentSelections, value];
    }
    this.setState({ [fieldToUpdate]: updatedSelections });
  };

  handleSubmitButton = async () => {
    const {
      ageGroup,
      gender,
      ethnicity,
      skinTypes,
      firstName,
      lastName,
      displayName,
      profileImage,
    } = this.state;
    const { history } = this.props;
    const [ageGroupValue] = ageGroup;
    const [genderValue] = gender;
    //MongoDb userId
    const userId = localStorage.getItem(LOCAL_STORAGE_ITEM.USER_ID);
    //Post image to S3
    postProfileImageToS3({ userId, profileImageFile: profileImage });
    //Create payload
    const userProfileInformation = {
      firstName,
      lastName,
      profileImage: `users/${userId}`,
      ageGroupCode: AGE_GROUP_CODE[ageGroupValue],
      gender: genderValue,
      ethnicity,
      skinTypes,
      displayName: isEmpty(displayName)
        ? `${firstName} ${lastName}`
        : displayName,
    };
    localStorage.setItem(
      LOCAL_STORAGE_ITEM.USER_PROFILE_INFORMATION,
      JSON.stringify(userProfileInformation)
    );
    postUserProfileInformation({
      userId,
      payload: { ...userProfileInformation },
    });
    history.push("/new-review");
  };

  render() {
    const {
      gender,
      ageGroup,
      skinTypes,
      ethnicity,
      firstName,
      lastName,
      profileImage,
    } = this.state;
    const { backgroundOpacity } = this.props;
    const isSubmitButtonEnabled =
      !isEmpty(ethnicity) &&
      !isEmpty(firstName) &&
      !isEmpty(lastName) &&
      !isEmpty(gender) &&
      !isEmpty(ageGroup) &&
      !isEmpty(skinTypes);

    return (
      <div>
        <Navbar />
        <div class="h-60px"></div>
        <div
          class={`px-4 sm:px-24 lg:px-28 py-8 flex flex-col ${backgroundOpacity}`}
        >
          <div class="uppercase tracking-wide text-lg text-slate-gray mb-6">
            Profile Setup
          </div>
          <div class="flex">
            <div class="mb-4 sm:w-1/5 mr-6">
              <ReviewFormTitle title="Upload a photo" styles="mb-2" />
              <div class="pb-10">
                <SinglePreviewUpload
                  additionalBaseStyle={additionalBaseStyle}
                  handleFiles={this.handleProfileImageUpload}
                  currentImage={profileImage}
                />
              </div>
            </div>
            <div class="flex flex-wrap mb-4">
              <div class="flex flex-col flex-shrink-0 w-max-150px mr-4">
                <ReviewFormTitle title="First Name" />
                <div>
                  <Input handleChange={this.handleFirstNameChange} />
                </div>
              </div>
              <div class="flex flex-col flex-shrink-0 w-max-150px mr-4">
                <ReviewFormTitle title="Last Name" />
                <div>
                  <Input handleChange={this.handleLastNameChange} />
                </div>
              </div>
              <div class="flex flex-col flex-shrink-0 w-max-150px">
                <ReviewFormTitle title="Display Name" isRequired={false} />
                <div>
                  <Input handleChange={this.handleDisplayNameChange} />
                </div>
              </div>
            </div>
          </div>

          <div class="mb-4">
            <ReviewFormTitle title="Gender" />
            <div>
              <SelectableOptions
                options={genderOptions}
                handleOptionClickFn={this.handleOptionSingleSelect}
                fieldToUpdate="gender"
                selectedOptions={gender}
              />
            </div>
          </div>
          <div class="mb-4">
            <ReviewFormTitle title="Age group" />
            <div>
              <SelectableOptions
                options={ageGroupOptions}
                handleOptionClickFn={this.handleOptionSingleSelect}
                fieldToUpdate="ageGroup"
                selectedOptions={ageGroup}
              />
            </div>
          </div>
          <div class="mb-4">
            <ReviewFormTitle title="Skin Types" />
            <div>
              <SelectableOptions
                options={skinTypeOptions}
                handleOptionClickFn={this.handleOptionMultiSelect}
                fieldToUpdate="skinTypes"
                selectedOptions={skinTypes}
              />
            </div>
          </div>
          <div class="mb-4 flex flex-col sm:flex-row">
            <div class="mr-4 flex items-center">
              <ReviewFormTitle title="Ethnic group" styles={"mb-2"} />
            </div>
            <div class="w-min-290px">
              <Dropdown
                handleChange={this.handleEthnicity}
                options={getEthnicityOptions()}
              />
            </div>
          </div>
          <div class="py-6 flex w-full justify-center">
            <button
              class="flex-shrink-0 bg-lilac-400 w-5/6 sm:w-1/4 text-white text-lg font-normal py-4 px-12 rounded-full shadow-md md:hover:bg-lilac-700 focus:outline-none focus:ring-2 focus:ring-lilac-500 focus:ring-offset-2 focus:ring-offset-lilac-200 disabled:opacity-30"
              onClick={this.handleSubmitButton}
              disabled={!isSubmitButtonEnabled}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ProfileSetupPage);
