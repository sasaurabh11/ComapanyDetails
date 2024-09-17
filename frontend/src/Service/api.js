import axios from 'axios'

const url = 'https://comapanydetails.onrender.com'

export const getCompanyDetails = async () => {
    try {
        const response = await axios.get(`${url}/companies`);
        console.log("get user response ", response)
        return response.data;

    } catch (error) {
        console.error('error in getComapanyDetails API', error.message)
    }
}

export const addCompanyDetails = async (formData) => {
    try {
        const response = await axios.post(`${url}/companies`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;

    } catch (error) {
        console.error('Error in addCompanyDetails API', error.message);
        throw error;
    }
}

export const getCompaniesbyLocation = async (locationFilter) => {
    try {
        const response = await axios.get(`${url}/companies/location`, {
            params: {
                location: locationFilter
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error in getCompaniesByLocation API:', error.message);
        throw error;
    }
};

export const searchCompanies = async (searchQuery) => {
    try {
        const response = await axios.get(`${url}/companies/search`, {
            params: { query: searchQuery }
        });
        return response.data;
    } catch (error) {
        console.error('Error in searchCompanies API:', error.message);
        throw error;
    }
};

export const fetchCompanyData = async () => {
    try {
        const response = await axios.get(`${url}/companyupdate`);
        console.log("get user response ", response)
        return response.data;

    } catch (error) {
        console.error('error in getComapanyDetails API', error.message)
    }
}