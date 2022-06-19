import React, { Component } from "react";
import Input from "../components/Input/Input";
import { ReviewFormTitle } from "../components/ReviewFormTitle/ReviewFormTitle";
import SelectableOptions from "../components/SelectableOptions/SelectableOptions";
import { Dropdown } from "../components/shared/Dropdown/Dropdown";
import Navbar from "../components/Navbar/Navbar";
import { postUserProfileInformation } from "../services/ProfileInformationService/ProfileInformationService";

import {
  AGE_GROUP,
  AGE_GROUP_CODE,
  ETHNICITY_OPTION_OBJECTS,
  LOCAL_STORAGE_ITEM,
} from "../utils/enums";
import { isEmpty } from "../utils/objectUtils";
import {
  getEthnicityOptions,
  ageGroupOptions,
  genderOptions,
  skinTypeOptions,
} from "../utils/profilePageUtils/profilePageUtils";
import { additionalBaseStyle } from "../utils/styles";
import { getUserProfileImage } from "../utils/userProfileUtils/userProfileUtils";
import { postProfileImageToS3 } from "./ProfileSetupPage/utils/s3ImagePoster";
import SinglePreviewUpload from "../components/MediaUpload/SinglePreviewUpload";

class ProfileSettingsPage extends Component {
  state = {
    ageGroup: [],
    gender: [],
    ethnicity: null,
    skinTypes: [],
    firstName: "",
    lastName: "",
    displayName: "",
    isSaveButtonDisabled: true,
    isEditMode: false,
    profileImage: "",
    profileImageArrayBuffer: [],
    profileImageUpdated: false,
  };

  handleProfileImageUpload = ({ files }) => {
    this.setState({
      profileImageUpdated: true,
      profileImageArrayBuffer: files,
    });
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

  handleEditButton = () => {
    this.setState({ isEditMode: true, isSaveButtonDisabled: false });
  };

  componentDidMount() {
    const userProfileInformation = localStorage.getItem(
      LOCAL_STORAGE_ITEM.USER_PROFILE_INFORMATION
    );
    if (!isEmpty(userProfileInformation)) {
      const parsedInformation = JSON.parse(userProfileInformation);
      if (!isEmpty(parsedInformation)) {
        const {
          gender,
          ageGroupCode,
          ethnicity,
          skinTypes,
          firstName,
          lastName,
          displayName,
          profileImage,
        } = parsedInformation;
        const ageGroup = AGE_GROUP[ageGroupCode];
        this.setState({
          gender: [gender],
          ageGroup: [ageGroup],
          ethnicity,
          skinTypes,
          firstName,
          lastName,
          displayName,
          profileImage: getUserProfileImage({ profileImage }),
        });
      }
    }
  }

  handleEthnicity = (selectedOption) => {
    const { isEditMode } = this.state;
    if (!isEditMode) return;
    const { value } = selectedOption;
    this.setState({ ethnicity: value });
  };

  handleOptionSingleSelect = ({ value, fieldToUpdate }) => {
    const { isEditMode } = this.state;
    isEditMode && this.setState({ [fieldToUpdate]: [value] });
  };

  handleOptionMultiSelect = ({ value, fieldToUpdate }) => {
    const { isEditMode } = this.state;
    if (!isEditMode) return;
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

  handleSaveButton = async () => {
    const {
      ageGroup,
      gender,
      ethnicity,
      skinTypes,
      firstName,
      lastName,
      displayName,
      profileImageUpdated,
      profileImageArrayBuffer,
    } = this.state;
    const ageGroupValue = AGE_GROUP_CODE[ageGroup];
    const [genderValue] = gender;
    const userId = localStorage.getItem(LOCAL_STORAGE_ITEM.USER_ID);
    const userProfileInformation = {
      ageGroupCode: ageGroupValue,
      gender: genderValue,
      ethnicity,
      skinTypes,
      firstName,
      lastName,
      displayName,
      profileImage: `users/${userId}`,
    };
    localStorage.setItem(
      LOCAL_STORAGE_ITEM.USER_PROFILE_INFORMATION,
      JSON.stringify(userProfileInformation)
    );

    postUserProfileInformation({
      userId,
      payload: { ...userProfileInformation },
    });
    //If the profile image was changed, update the image in S3
    if (profileImageUpdated) {
      postProfileImageToS3({
        userId,
        profileImageFile: profileImageArrayBuffer,
      });
    }
    this.setState({ isEditMode: false, isSaveButtonDisabled: true });
  };

  render() {
    const {
      gender,
      ageGroup,
      skinTypes,
      ethnicity,
      isSaveButtonDisabled,
      isEditMode,
      firstName,
      lastName,
      displayName,
      profileImageArrayBuffer,
      profileImage,
    } = this.state;
    const { backgroundOpacity } = this.props;
    return (
      <div>
        <Navbar />
        <div class="h-60px"></div>
        <div
          class={`px-4 sm:px-24 lg:px-28 py-8 flex flex-col ${backgroundOpacity}`}
        >
          <div class="flex justify-between">
            <div class="uppercase tracking-wide text-lg text-slate-gray mb-12">
              Profile Settings
            </div>
            <div>
              <button
                class="flex-shrink-0 bg-lilac-400 text-white text-base font-normal py-2 px-8 rounded-full shadow-md md:hover:bg-lilac-700 focus:outline-none focus:ring-2 focus:ring-lilac-500 focus:ring-offset-2 focus:ring-offset-lilac-200 sm:mr-4 disabled:opacity-30 mr-6"
                onClick={this.handleEditButton}
                disabled={isEditMode}
              >
                Edit
              </button>
            </div>
          </div>
          <div class="flex">
            <div class="mb-4 sm:w-1/5 mr-6">
              <SinglePreviewUpload
                additionalBaseStyle={additionalBaseStyle}
                handleFiles={this.handleProfileImageUpload}
                currentImage={profileImageArrayBuffer}
                currentImageUrl={profileImage}
                disabled={!isEditMode}
              />
            </div>
            <div class="flex flex-wrap sm:w-2/3 mb-4">
              <div class="flex flex-col flex-shrink-0 w-max-150px mr-4">
                <ReviewFormTitle title="First Name" />
                <div>
                  <Input
                    handleChange={this.handleFirstNameChange}
                    value={firstName}
                    isDisabled={!isEditMode}
                  />
                </div>
              </div>
              <div class="flex flex-col flex-shrink-0 w-max-150px mr-4">
                <ReviewFormTitle title="Last Name" />
                <div>
                  <Input
                    handleChange={this.handleLastNameChange}
                    value={lastName}
                    isDisabled={!isEditMode}
                  />
                </div>
              </div>
              <div class="flex flex-col flex-shrink-0 w-max-150px">
                <ReviewFormTitle title="Display Name" isRequired={false} />
                <div>
                  <Input
                    handleChange={this.handleDisplayNameChange}
                    value={displayName}
                    isDisabled={!isEditMode}
                  />
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
                readOnly={!isEditMode}
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
                readOnly={!isEditMode}
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
                readOnly={!isEditMode}
              />
            </div>
          </div>
          <div class="mb-4 flex flex-col sm:flex-row">
            <div class="mr-4 flex items-center">
              <ReviewFormTitle title="Ethnic group" styles={"mb-2"} />
            </div>
            <div class="w-min-290px">
              <Dropdown
                value={ETHNICITY_OPTION_OBJECTS[ethnicity]}
                handleChange={this.handleEthnicity}
                options={getEthnicityOptions()}
                isDisabled={!isEditMode}
              />
            </div>
          </div>
          <div class="py-6 flex w-full justify-center">
            <button
              class="w-5/6 sm:w-1/4 flex-shrink-0 bg-lilac-400 text-white text-lg font-normal py-2 px-16 rounded-full shadow-md md:hover:bg-lilac-700 focus:outline-none focus:ring-2 focus:ring-lilac-500 focus:ring-offset-2 focus:ring-offset-lilac-200 disabled:opacity-30"
              onClick={this.handleSaveButton}
              disabled={isSaveButtonDisabled}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileSettingsPage;
