import React from 'react';
import { isNil } from 'lodash';
import { useParams } from 'react-router';
import { useAddressQuery } from '../../hooks/addresses/queries';

const AddressDetailsContainer = ({addressId}: {addressId: string}) => {
    const {data: address, isLoading, isError, error} = useAddressQuery({addressId});

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return (<p>{error.message}</p>)
    }

    const handleSubmit = () => {

    }

    return (<form noValidate onSubmit={handleSubmit}>
        <div>
            <label>Company Name</label>
            <div>
                <input type="text" value={address?.company_name ?? ''} />
            </div>
        </div>
        <div>
            <label>Location Name</label>
            <div>
                <input type="text" value={address?.location_name ?? ''} />
            </div>
        </div>
        <div>
            <label>Location Type</label>
            <div>
                <input type="text" value={address?.location_type?.name ?? ''} />
            </div>
        </div>
        <div>
            <label>Facility ID</label>
            <div>
                <input type="text" value={address?.facility_id ?? ''} />
            </div>
        </div>
        <div>
            <button>Cancel</button>
            <button type="submit">Update</button>
        </div>
    </form>)
};

const AddressDetailsContainerWithRouter = () => {
    const {addressId} = useParams();

    if (isNil(addressId)) {
        return null;
    }

    return <AddressDetailsContainer addressId={addressId} />
}

export default AddressDetailsContainerWithRouter;