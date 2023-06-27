import { AddressBookEntry, PaginatedAddressBookEntry } from "@shipwell/backend-core-sdk";


export declare type PaginatedAddressResponse = {
    pageSize: number,
    results: AddressBookEntry[],
    totalCount: number,
    totalPages: number,
}

export const fetchAddresses = async (token: string, params: {page: number, pageSize: number} = {page: 1, pageSize: 10}) => {
    const queryKey = `https://dev-api.shipwell.com/v2/address-book/?page=${params.page}&pageSize=${params.pageSize}`;
    const resp = await fetch(queryKey, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!resp.ok) {
        throw Error(`Received status ${resp.statusText} from ${resp.url}`);
    }
    const {page_size, results, total_count, total_pages} = await resp.json() as unknown as PaginatedAddressBookEntry;
    return {
        pageSize: page_size,
        results: results,
        totalCount: total_count,
        totalPages: total_pages,
    } as PaginatedAddressResponse;
}

export const fetchAddress = async (token: string, addressId: string) => {
    const queryKey = `https://dev-api.shipwell.com/v2/address-book/${addressId}`;
    const resp = await fetch(queryKey, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!resp.ok) {
        throw Error(`Received status ${resp.statusText} from ${resp.url}`);
    }
    return await resp.json() as unknown as AddressBookEntry;
}

export const searchAddress = async (token: string, searchText: string): Promise<PaginatedAddressResponse> => {
    const queryKey = `https://dev-api.shipwell.com/v2/address-book/?page=${1}&pageSize=${1000}&q=${searchText}`;
    const resp = await fetch(queryKey, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!resp.ok) {
        throw Error(`Received status ${resp.statusText} from ${resp.url}`);
    }
    const {page_size, results, total_count, total_pages} = await resp.json() as unknown as PaginatedAddressBookEntry;
    return {
        pageSize: page_size,
        results: results,
        totalCount: total_count,
        totalPages: total_pages,
    } as PaginatedAddressResponse;
};