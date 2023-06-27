import React, { useState } from "react";
import { useNavigate } from "react-router";
import { AddressList } from "../../components";
import { usePaginatedAddressQuery } from "../../hooks";
import { useSearchAddressQuery } from "../../hooks/addresses/queries";

const AddressListContainer = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchText, setSearchText] = useState("");
  const {
    data,
    isLoading,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isFetching,
    fetchNextPage,
    fetchPreviousPage,
  } = usePaginatedAddressQuery();

  const searchAddressQuery = useSearchAddressQuery({ searchText });

  const showLoader = Boolean(
    isLoading || isFetchingNextPage || isFetchingPreviousPage || searchAddressQuery.isLoading
  );

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
    fetchNextPage();
  };
  const handlePreviousClick = () => {
    if (currentPage - 1 < 0) {
      return;
    }
    setCurrentPage(currentPage - 1);
    fetchPreviousPage();
  };

  return (
    <main>
      <div></div>
      <div>
        <div role="navigation">
          <button disabled={isFetching} onClick={handlePreviousClick}>
            Previous
          </button>
          <button
            onClick={handleNextClick}
          >
            Next
          </button>
        </div>
        <div role="search">
          <label id="address-search-label">Search for address</label>
          <div>
            <input
              role="searchbox"
              name="addressSearch"
              aria-labelledby="address-search-label"
              type="text"
              value={searchText}
              placeholder="Joe's coffee"
              onChange={(e) => setSearchText(e.currentTarget.value)}
            />
          </div>
        </div>
        {searchText?.length ? (<>
          <AddressList
            onEditClick={(id) => navigate('/' + id)}
            items={searchAddressQuery.data?.results?.map(
                    (addressBookEntry) => ({
                      id: addressBookEntry.id,
                      companyName: addressBookEntry.company_name,
                      facilityId: addressBookEntry.facility_id,
                    })
          )} />
        </>) : null}
        {!searchText?.length ? (
          <>
            <div>
              Page {currentPage + 1} of{" "}
              {data?.pages?.length ? data?.pages[currentPage]?.totalPages : 0}
            </div>
            <div>
              {!showLoader && data?.pages?.length ? (
                <AddressList
                  onEditClick={(id) => navigate('/' + id)}
                  items={data?.pages[currentPage].results.map(
                    (addressBookEntry) => ({
                      id: addressBookEntry.id,
                      companyName: addressBookEntry.company_name,
                      facilityId: addressBookEntry.facility_id,
                    })
                  )}
                />
              ) : null}
              {showLoader ? <div>Loading</div> : null}
            </div>
          </>
        ) : null}
      </div>
    </main>
  );
};

export default AddressListContainer;
