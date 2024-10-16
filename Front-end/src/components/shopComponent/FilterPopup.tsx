import React, { useEffect, useRef } from "react";

interface FilterPopupProps {
  isOpen: boolean;
  categories: string[];
  tags: string[];
  selectedFilters: string[];
  onFilterChange: (filter: string) => void;
  onClose: () => void;
}

const FilterPopup: React.FC<FilterPopupProps> = ({
    isOpen,
    categories,
    tags,
    selectedFilters,
    onFilterChange,
    onClose,
  }) => {
    const popupRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
          onClose();
        }
      };
  
      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen, onClose]);
  
    if (!isOpen) return null;
  
    return (
      <div
        ref={popupRef}
        className="flex flex-col absolute bg-white p-6 rounded shadow-lg w-80 max-h-[700px] overflow-y-auto z-10 rounded-lg"
        
      >
        <h2 className="text-lg font-bold mb-4">Filter by Categories</h2>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={category}
              checked={selectedFilters.includes(category)}
              onChange={() => onFilterChange(category)}
              className="mr-2"
            />
            <label htmlFor={category} className="text-sm">
              {category}
            </label>
          </div>
        ))}
        <h2 className="text-lg font-bold mb-4">Filter by Tags</h2>
        {tags.map((tag) => (
          <div key={tag} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={tag}
              checked={selectedFilters.includes(tag)}
              onChange={() => onFilterChange(tag)}
              className="mr-2"
            />
            <label htmlFor={tag} className="text-sm">
              {tag}
            </label>
          </div>
        ))}
        <button onClick={onClose} className="mt-4 bg-customColor-1 text-white px-4 py-2 rounded-lg">
          Close
        </button>
      </div>
    );
  };
  
  export default FilterPopup;