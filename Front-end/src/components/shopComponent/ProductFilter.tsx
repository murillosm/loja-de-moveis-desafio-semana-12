import React from "react";
import filterIcon from "../../assets/filtering.svg";
import gridIcon from "../../assets/ci_grid-big-round.svg";
import listIcon from "../../assets/bi_view-list.svg";

interface ProductFilterHeaderProps {
  startIndex: number;
  endIndex: number;
  sortedProductsLength: number;
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
  sortOption: string;
  setSortOption: (value: string) => void;
  onFilterClick: () => void;
}

const ProductFilter: React.FC<ProductFilterHeaderProps> = ({
  startIndex,
  endIndex,
  sortedProductsLength,
  itemsPerPage,
  setItemsPerPage,
  sortOption,
  setSortOption,
  onFilterClick,
}) => {
  return (
    <div className="relative w-full min-h-[100px] bg-customColor-1 flex flex-wrap items-center px-4 py-3 md:px-[98px] justify-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-4 md:gap-[23px] justify-center sm:justify-between">
        <button className="flex items-center font-poppins font-medium gap-3 w-[80px]" onClick={onFilterClick}>
          <img
            src={filterIcon}
            alt="Filter Icon"
            className="w-[20px] h-[20px] md:w-[25px] md:h-[25px]"
          />
          Filter
        </button>
        <button>
          <img src={gridIcon} alt="Grid Icon" className="w-7 h-7" />
        </button>
        <button>
          <img src={listIcon} alt="List Icon" className="w-6 h-6" />
        </button>
        <div className="h-[37px] w-[3px] bg-customColor-1 sm:bg-[#9F9F9F] mx-[15px]" ></div>
        <div className="font-poppins font-medium">
          Showing {startIndex}–{endIndex} of {sortedProductsLength} results
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4 md:gap-[29px] mt-4 md:mt-0">
        <div className="font-poppins font-medium flex items-center  gap-0 sm:gap-[15px] sm:flex-row flex-col">
          Show
          <select
            className="p-2 border border-gray-300 rounded"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            title="Items per page"
          >
            <option value={8}>8</option>
            <option value={16}>16</option>
            <option value={24}>24</option>
            <option value={32}>32</option>
          </select>
        </div>
        <div className="font-poppins font-medium flex items-center gap-0 sm:gap-[15px] sm:flex-row flex-col">
          Short by
          <select
            className="p-2 border border-gray-300 rounded"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            title="Category"
          >
            <option value="default">Default</option>
            <option value="new">New</option>
            <option value="old">Old</option>
            <option value="highPrice">High Price</option>
            <option value="lowPrice">Low Price</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;