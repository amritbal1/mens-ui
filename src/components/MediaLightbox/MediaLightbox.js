import React, { PureComponent } from "react";
import { XIcon } from "@heroicons/react/outline";
import Carousel from "../Carousel/Carousel";
import { isEmpty } from "../../utils/objectUtils";

class MediaLightbox extends PureComponent {
  state = {
    images: [],
  };

  componentDidMount() {
    this.setState({
      images: this.props.images,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    this.setState({ images: this.props.images });
  }

  handleLightboxCloseButtonFn = () => {
    const { handleLightboxCloseButtonFn } = this.props;
    handleLightboxCloseButtonFn();
  };

  render() {
    const { images } = this.state;
    const { handleLightboxCloseButtonFn, indexToDisplay, showLightboxModal } =
      this.props;
    if (isEmpty(images) || !showLightboxModal) return null;

    return (
      <div class="z-50 fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-90 text-white text-lg">
        <div class="h-1/6 mx-4 py-10 flex">
          <div
            class="flex px-3 h-10 items-center justify-center cursor-pointer rounded-md md:hover:bg-gray-700 md:hover:border md:hover:border-white"
            onClick={handleLightboxCloseButtonFn}
          >
            <XIcon class="h4 w-4 mr-2" />
            Close
          </div>
        </div>
        <div class="h-4/6 w-full p-4 flex flex-col items-center space-y-8 relative">
          <div class="w-80vw lg:w-max-600px">
            <Carousel
              isLightbox={true}
              isFullScreen={true}
              images={images}
              slidesToShow={1}
              imageWidth={"w-80vw"}
              showCursorOnHover={false}
              initialSlide={indexToDisplay}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MediaLightbox;
