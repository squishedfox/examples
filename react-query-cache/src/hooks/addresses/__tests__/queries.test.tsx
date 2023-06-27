import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { PaginatedAddressResponse, searchAddress, fetchAddresses } from '../../../api/addresses';
import {useSearchAddressQuery, usePaginatedAddressQuery, UseAddressQueryArgs} from '../queries';
// mock out the getting access token part for when we require users to be authorized
jest.mock('@auth0/auth0-react', () => ({
    useAuth0: () => ({
        getAccessTokenSilently: () => Promise.resolve('asfasdfasd'),
    })
}));
jest.mock('../../../api/addresses');

const searchAddressMock = searchAddress as jest.MockedFunction<typeof searchAddress>;

/**
 * Makes a react-query client to minpulate and putting or remove items from cache
 * with a wrapper for react-components
 * @returns 
 */
const makeQueryClientWithProvider = () => {
    const queryClient = new QueryClient();
    return {
        client: queryClient,
        componentWrapper: ({children}: React.PropsWithChildren<unknown>) => (<QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>),
    };
};

describe('useAddressQeury', () => {

    beforeEach(() => {
        searchAddressMock.mockResolvedValue({
            results: [],
            totalCount: 0,
            totalPages: 0,
            pageSize: 100,
        })
    })

    afterEach(() => {
        jest.resetAllMocks();
        jest.resetModules();
    });

    it('should use cached search results', async () => {
        // arrange
        const searchText = "My Search Text";
        const addressBookEntry = {
            id: 'my-id',
            facility_id: 'my_facility_id',
            address: {
                country: 'US',
            },
            is_default_origin: false,
            location_name: 'My Test Location'
        };
        const {client, componentWrapper} = makeQueryClientWithProvider();
        client.setQueryData(["addresses", searchText], {
            pageSize: 100,
            totalPages: 1,
            results: [addressBookEntry],
            totalCount: 1
        } as PaginatedAddressResponse);

        // act
        const {result} = renderHook(() => useSearchAddressQuery({searchText}), {wrapper: componentWrapper});

        // assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data?.results).toStrictEqual([addressBookEntry]);
        expect(searchAddressMock).not.toHaveBeenCalled();
    });

    it('should call api cached search results', async () => {
        // arrange
        const searchText = "My Search Text";
        const addressBookEntry = {
            id: 'my-id',
            facility_id: 'my_facility_id',
            address: {
                country: 'US',
            },
            is_default_origin: false,
            location_name: 'My Test Location'
        };
        const {componentWrapper} = makeQueryClientWithProvider();
        searchAddressMock.mockResolvedValueOnce({
            results: [addressBookEntry],
            totalCount: 1,
            pageSize: 100,
            totalPages: 1,
        });

        // act
        const {result} = renderHook(() => useSearchAddressQuery({searchText}), {wrapper: componentWrapper});

        // assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data?.results).toStrictEqual([addressBookEntry]);
        expect(searchAddressMock).toHaveBeenCalledTimes(1);
        expect(searchAddressMock).toHaveBeenCalledWith('asfasdfasd', searchText);
    });
});