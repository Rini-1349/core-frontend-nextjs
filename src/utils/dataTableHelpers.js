// Maximum 5 pagination page buttons
export function setPaginationButtons(pagination) {
  if (pagination.currentPage < 3) {
    pagination.firstPageButton = 1;
  } else {
    pagination.firstPageButton = pagination.currentPage - 2;
  }
  if (pagination.firstPageButton + 4 > pagination.totalPages) {
    pagination.lastPageButton = pagination.totalPages;
  } else {
    pagination.lastPageButton = pagination.firstPageButton + 4;
  }

  return pagination;
}

export function removeOneItemFromPagination(pagination) {
  pagination.totalItems--;
  pagination.endItem--;

  return pagination;
}

export function definePopupParams(action) {
  return {
    popupModalStyle: action.popupModalStyle
      ? action.popupModalStyle
      : {
          top: "10%",
          height: "80%",
        },
    childDivStyle: action.childDivStyle
      ? action.childDivStyle
      : {
          height: "100%",
        },
    childDivMaxWidthClass: action.childDivMaxWidthClass ? action.childDivMaxWidthClass : "max-w-6xl",
  };
}
