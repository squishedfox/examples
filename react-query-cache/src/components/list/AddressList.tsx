import React from 'react';
import './index.css';

export declare type AddressListComponentProps = {
    items?: {id?: string|null, companyName?: string|null, facilityId?: string|null,}[]
    onEditClick: (id: string) => void,
}

/**
 * Displays columns and information on the table for address book entries.
 */
const AddressListComponent = ({items, onEditClick}: AddressListComponentProps) => (<table role="table">
    <thead>
        <tr role="row">
            <th role="rowheader">ID</th>
            <th role="rowheader">Company Name</th>
            <th role="rowheader">Facility ID</th>
            <th role="rowheader">Actions</th>
        </tr>
    </thead>
    <tbody>
        {items ? items.map((item) => (<tr key={item.id} role="row">
            <td>{item.id}</td>
            <td>{item.companyName ?? '--'}</td>
            <td>{item.facilityId ?? '--'}</td>
            <td><button onClick={() => onEditClick(item.id as string)}>Edit</button></td>
        </tr>)) : null}
    </tbody>
</table>);


export default AddressListComponent;