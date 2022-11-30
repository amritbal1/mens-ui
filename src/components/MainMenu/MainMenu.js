import MenuItem from "./MenuItem";
import * as logo from "../../images/brand-logo.png";

export default function MainMenu() {
  return (
    <div class="h-24 px-4 flex border-b items-center h-20 justify-between bg-stone">
      <div className="flex-shrink-0 px-4">
        <img
          className="h-12 w-12 cursor-pointer"
          src={logo.default}
          alt="Workflow"
        />
      </div>
      <div class="flex">
        <MenuItem
          menuTitle="Brands"
          linksArray={[
            // [[title: string, href: string], ...]
            ["Brand A", "/"],
            ["About", "/about"],
            ["Blog", "/blog"],
          ]}
        />
        <MenuItem
          menuTitle="Categories"
          linksArray={[
            ["Cleanser", "/"],
            ["About", "/about"],
            ["Blog", "/blog"],
          ]}
        />
        <MenuItem menuTitle="Blog" showChevron={false} />
      </div>
      <div class="text-navTitle">Country</div>
    </div>
  );
}
