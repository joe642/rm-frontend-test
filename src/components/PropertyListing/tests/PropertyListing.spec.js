import React from 'react';
import { shallow, mount } from 'enzyme';
import axios from 'axios'
import { act } from "react-dom/test-utils";

import PropertyListing from '../PropertyListing';

jest.mock("axios");

describe('PropertyListing', () => {

    it('should render without crashing', () => {
        const wrapper = shallow(<PropertyListing />);
        expect(wrapper.find('.PropertyListing')).toHaveLength(1);
    });

    it('should render five property cards with mock data', async () => {
        let wrapper;
        const DUMMY_PROPERTY = {
            id: 73864112,
            bedrooms: 3,
            summary: 'Property 1 Situated moments from the River Thames in Old Chelsea...',
            displayAddress: '1 CHEYNE WALK, CHELSEA, SW3',
            propertyType: 'Flat',
            price: 1950000,
            branchName: 'M2 Property, London',
            propertyUrl: '/property-for-sale/property-73864112.html',
            contactUrl: '/property-for-sale/contactBranch.html?propertyId=73864112',
            propertyTitle: '3 bedroom flat for sale',
            mainImage: 'https://media.rightmove.co.uk/dir/crop/10:9-16:9/38k/37655/53588679/37655_CAM170036_IMG_01_0000_max_476x317.jpg'
        };

        await act(async () => {
            const data = {
                data: Array(5).fill(DUMMY_PROPERTY)
            }

            await axios.get.mockImplementationOnce(() => Promise.resolve(data));
            wrapper = mount(<PropertyListing />);
        });

        wrapper.update();

        await expect(axios.get).toHaveBeenCalledTimes(1);
        expect(wrapper.find('PropertyCard')).toHaveLength(5);
    });
});
