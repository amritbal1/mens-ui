import { PureComponent } from "react";
import { XIcon } from "@heroicons/react/outline";
import { createFilterPanelOptions } from "./utils/filtersModalUtil.js";

class FiltersModal extends PureComponent {
  state = {
    isOpen: true,
  };

  filterOptions = createFilterPanelOptions({
    filterPillsConfig: this.props.filterPillsConfig,
    contextName: this.props.contextName,
  });

  handleCloseModal = () => {
    const { handleModalClose } = this.props;
    this.setState({ isOpen: false });
    handleModalClose();
  };

  render() {
    const { isOpen } = this.state;
    if (!isOpen) return null;
    return (
      <div className="flex flex-col fixed h-screen w-screen top-0 left-0 z-50 bg-white">
        {/* HEADER */}
        <div className="h-65px p-6 text-lg font-medium leading-6 text-slate-gray border-b flex justify-between">
          {/* <div class="flex justify-between"> */}
          <span />
          <span class="text-slate-gray uppercase font-light">Filters</span>
          <XIcon class="h4 w-4" onClick={this.handleCloseModal} />
          {/* </div> */}
        </div>
        {/* CONTENT */}
        <div className="px-6 pb-150px h-full overflow-y-auto">
          <div>{this.filterOptions}</div>
        </div>
        {/* FOOTER */}
        <div class="h-80px fixed bottom-0 w-full bg-white border-t flex items-center justify-end p-4">
          <button
            type="button"
            className="inline-flex justify-center px-4 py-2 text-lg text-white bg-lilac-400 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-lilac-400"
            onClick={this.handleCloseModal}
          >
            Show Results
          </button>
        </div>
      </div>
    );
  }
}

export default FiltersModal;
