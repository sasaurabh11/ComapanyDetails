import React, { useEffect, useContext, useState } from 'react';
import dataprovider from '../ContextApi/dataprovider';
import { getCompanyDetails, addCompanyDetails, getCompaniesbyLocation, searchCompanies } from '../Service/api'; 
import './Home.css';

function Home() {
    const { companyDetails, setCompanyDetails } = useContext(dataprovider);
    const [ loading, setLoading ] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [formData, setFormData] = useState({
        CompanyName: '',
        CompanyEmailID: '',
        FoundedYear: '',
        KeyWords: '',
        Location: '',
        Revenue: ''
    });

    useEffect(() => {
        async function fetchCompanyDetails() {
            try {
                const fetchedCompanies = await getCompanyDetails();
                setCompanyDetails(fetchedCompanies);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching company details:', error);
            }
        }   
        fetchCompanyDetails();
    }, [setCompanyDetails]);


    useEffect(() => {
        async function fetchCompanies() {
            try {
                const companies = await getCompaniesbyLocation(locationFilter);
                setCompanyDetails(companies);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        }
        fetchCompanies();
    }, [locationFilter]);


    // useEffect(() => {
    //     async function search() {
    //         try {
    //             const results = await searchCompanies(searchQuery);
    //             setCompanyDetails(results);
    //         } catch (error) {
    //             console.error('Error searching companies:', error);
    //         }
    //     }

    //     const timeoutId = setTimeout(() => {
    //         if (searchQuery.trim() !== '') {
    //             search();
    //         } else {
    //             fetchCompanyDetails();
    //         }
    //     }, 300);

    //     return () => clearTimeout(timeoutId);
    // }, [searchQuery]);

    const handleLocationFilterChange = (e) => {
        setLocationFilter(e.target.value);
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleClearFilter = () => {
        setLocationFilter('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addCompanyDetails(formData);
            const fetchedCompanies = await getCompanyDetails();
            setCompanyDetails(fetchedCompanies);
            setFormData({
                CompanyName: '',
                CompanyEmailID: '',
                FoundedYear: '',
                KeyWords: '',
                Location: '',
                Revenue: ''
            });
        } catch (error) {
            console.error('Error adding company details:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='HomeCompo'>
            <h2 className='text-center home-title'>Company List</h2>
            <form className='company-form' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Company Name:</label>
                    <input
                        type="text"
                        name="CompanyName"
                        value={formData.CompanyName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Company Email ID:</label>
                    <input
                        type="email"
                        name="CompanyEmailID"
                        value={formData.CompanyEmailID}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Founded Year:</label>
                    <input
                        type="text"
                        name="FoundedYear"
                        value={formData.FoundedYear}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Keywords:</label>
                    <input
                        type="text"
                        name="KeyWords"
                        value={formData.KeyWords}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Location:</label>
                    <input
                        type="text"
                        name="Location"
                        value={formData.Location}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Revenue:</label>
                    <input
                        type="text"
                        name="Revenue"
                        value={formData.Revenue}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button className='btn-add-company' type="submit">Add Company</button>
            </form>

            <h2>All company Details</h2>

            <div className='filter-container'>
                <label htmlFor='locationFilter'>Filter by Location:</label>
                <input
                    type='text'
                    id='locationFilter'
                    value={locationFilter}
                    onChange={handleLocationFilterChange}
                    placeholder='Enter location...'
                />
                <button onClick={() => setLocationFilter('')}>Clear</button>
            </div>

            {/* <div className='search-container'>
                <label htmlFor='searchInput'>Search:</label>
                <input
                    type='text'
                    id='searchInput'
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    placeholder='Search by name, email, etc...'
                />
            </div> */}

            <table className='company-table'> 
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Company Email ID</th>
                        <th>Founded Year</th>
                        <th>Keywords</th>
                        <th>Location</th>
                        <th>Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    {companyDetails.map(company => (
                        <tr key={company.id}>
                            <td>{company.CompanyName}</td>
                            <td>{company.CompanyEmailID}</td>
                            <td>{company.FoundedYear}</td>
                            <td>{company.KeyWords}</td>
                            <td>{company.Location}</td>
                            <td>{company.Revenue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>

    );
}

export default Home;
