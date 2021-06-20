import React, { useEffect, useState } from 'react';
import axios from 'axios';

import PropertyCard from '../PropertyCard';
import './PropertyListing.scss';

const propertiesUrl = '/api/properties'

const PropertyListing = () => {
    const [properties, setProperties] = useState([]);
    const getProperties = async () => {
        const response = await axios.get(propertiesUrl, { params: {} });

        setProperties(response.data);
    };

    useEffect(() => {
        getProperties();
    }, []);

    return (
        <div className="PropertyListing">
            {
                properties
                    .map((property, index) => <PropertyCard key={index} {...property}/>)
            }
        </div>
    )
};

export default PropertyListing;
