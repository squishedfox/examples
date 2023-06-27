import { useAuth0 } from "@auth0/auth0-react";
import { useInfiniteQuery, useQuery, } from "react-query";
import { fetchAddress, fetchAddresses, searchAddress } from "../../api/addresses";
import {isNil} from 'lodash';
import { AddressBookEntry } from "@shipwell/backend-core-sdk";

export type UseAddressQueryArgs = {
    page: number,
    pageSize: number,
}
export const usePaginatedAddressQuery = () => {
    const {getAccessTokenSilently} = useAuth0();
    return useInfiniteQuery(["addresses"], async ({pageParam}) => {
        const token = await getAccessTokenSilently();
        return await fetchAddresses(token, pageParam);
    }, {
        keepPreviousData: true,
        getNextPageParam: (lastPage, pages) => {
            if (pages.length === lastPage.totalPages) {
                return undefined;
            }
            return {
                page: pages?.length ? pages.length + 1 : 1,
                pageSize: lastPage.pageSize,
            };
        },
    })
};

export const useSearchAddressQuery = ({searchText}: {searchText: string}) => {
    const {getAccessTokenSilently} = useAuth0();
    return useQuery(["addresses", searchText], async () => {
        const accessToken = await getAccessTokenSilently();
        const apiSearchResults = await searchAddress(accessToken, searchText);
        return apiSearchResults;
    }, {
        enabled: searchText.length > 4,
    });
};

export const useAddressQuery = ({addressId}: {addressId: string}) => {
    const {getAccessTokenSilently} = useAuth0();
    return useQuery<AddressBookEntry, Error, AddressBookEntry, string[]>(["addresses", addressId], async () => {
        const accessToken = await getAccessTokenSilently();
        const apiSearchResults = await fetchAddress(accessToken, addressId);
        throw Error('You failed');
        return apiSearchResults;
    }, {
        enabled: !isNil(addressId),
    });
}