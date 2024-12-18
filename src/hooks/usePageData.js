import { useEffect, useState } from 'react';

const usePagedData = (data, newFilteredArr) => {
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState(null);
  const [currentFilteredItems, setCurrentFilteredItems] = useState(null);

  useEffect(() => {
    let items = data ? data : [];
    let totalItems = items.length;
    if (newFilteredArr) {
      items = newFilteredArr;
      totalItems = items.length;
    }

    const endOffset = itemOffset + itemsPerPage;
    const slicedItems = items.slice(itemOffset, endOffset);

    if (newFilteredArr) {
      setCurrentFilteredItems(slicedItems);
      setPageCount(Math.ceil(totalItems / itemsPerPage));
    } else {
      setCurrentItems(slicedItems);
      setPageCount(Math.ceil(totalItems / itemsPerPage));
    }
  }, [data, newFilteredArr, itemOffset, itemsPerPage]);

  const handlePageChange = event => {
    const items = newFilteredArr ? newFilteredArr : data;
    const totalItems = items.length;
    const newOffset = (event.selected * itemsPerPage) % totalItems;
    setItemOffset(newFilteredArr ? newOffset : newOffset);
  };

  return {
    currentItems,
    currentFilteredItems,
    pageCount,
    handlePageChange,
    setItemsPerPage,
  };
};

export default usePagedData;
