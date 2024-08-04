import React, { useContext, useEffect, useState } from "react";
import api from "../data/api";
import { Product } from "../shared/types";
import ProductGrid from "../components/shopComponent/ProductGrid";
import ProductFilterHeader from "../components/shopComponent/ProductFilter";
import PageHeader from "../components/nav/PageHeader";
import Info from "../components/Info";
import FilterPopup from "../components/shopComponent/FilterPopup";
import { AppContext } from "../context/AppContext";


const Shop: React.FC = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("Shop must be used within an AppProvider");
  }

  const { products, setProducts, loading, setLoading } = context;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(16);
  const [sortOption, setSortOption] = useState<string>("default");
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get<Product[]>("/products");
        console.log("API Response:", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleFilterButtonClick = () => {
    setIsFilterPopupOpen(!isFilterPopupOpen);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter]
    );
  };

  if (loading) {
    return (
      <div className="w-full min-h-10">
        <i
          data-testid="loading-spinner"
          className="fa-duotone fa-solid fa-spinner fa-spin-pulse fa-2xl flex justify-center items-center"
          style={
            {
              "--fa-primary-color": "#b88e2f",
              "--fa-secondary-color": "#b88e2f",
            } as React.CSSProperties
          }
        ></i>
      </div>
    );
  }

  const getAllCategoriesAndTags = () => {
    const categories = new Set<string>();
    const tags = new Set<string>();

    products.forEach((product) => {
      categories.add(product.category);
      product.tags.forEach((tag) => tags.add(tag));
    });

    return {
      categories: Array.from(categories),
      tags: Array.from(tags),
    };
  };

  const { categories, tags } = getAllCategoriesAndTags();

  const filteredProducts = selectedFilters.length
    ? products.filter(
        (product) =>
          selectedFilters.includes(product.category) ||
          product.tags.some((tag) => selectedFilters.includes(tag))
      )
    : products;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "new":
        return b.new ? 1 : -1;
      case "old":
        return a.new ? 1 : -1;
      case "highPrice":
        return b.salePrice - a.salePrice;
      case "lowPrice":
        return a.salePrice - b.salePrice;
      default:
        return 0;
    }
  });

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, sortedProducts.length);
  const getPageNumbers = () => {
    const maxPagesToShow = windowWidth < 640 ? 2 : 3;
    const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
    let startPage = Math.max(1, currentPage - halfMaxPagesToShow);
    let endPage = Math.min(totalPages, currentPage + halfMaxPagesToShow);

    if (currentPage <= halfMaxPagesToShow) {
      endPage = Math.min(totalPages, maxPagesToShow);
    } else if (currentPage + halfMaxPagesToShow >= totalPages) {
      startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="w-full h-auto">
      <PageHeader title="Shop" currentPath="/shop" />

      <ProductFilterHeader
        startIndex={startIndex}
        endIndex={endIndex}
        sortedProductsLength={sortedProducts.length}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        sortOption={sortOption}
        setSortOption={setSortOption}
        onFilterClick={handleFilterButtonClick}
      />

      <FilterPopup
        isOpen={isFilterPopupOpen}
        categories={categories}
        tags={tags}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onClose={handleFilterButtonClick}
      />

      <div className="container mx-auto p-4 flex flex-col justify-center items-center">
        <ProductGrid products={paginatedProducts} />

        <div className="flex justify-center font-poppins font-medium mt-5 mb-[70px] gap-8">
          {currentPage > 1 && (
            <button
              className="text-xl w-[98px] h-[60px] px-4 py-2 mx-1 rounded-[10px] bg-customColor-1 font-poppins font-light"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              {"Prev"}
            </button>
          )}
          {windowWidth >= 500 &&
            getPageNumbers().map((page) => (
              <button
                key={page}
                className={`font-normal text-xl px-6 py-4 mx-1 rounded-[10px] ${
                  page === currentPage
                    ? "bg-customColor-2 text-white"
                    : "bg-customColor-1"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          {currentPage < totalPages && (
            <button
              className="text-xl w-[98px] h-[60px] px-6 py-4 mx-1 rounded-[10px] bg-customColor-1 font-poppins font-light"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              {"Next"}
            </button>
          )}
        </div>
      </div>

      <Info />
    </div>
  );
};

export default Shop;
