import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";

function UpdateResturant() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [resturant, setResturant] = useState({
        resturantName: "",
        address: "",
        telephoneNo: "",
    });

    useEffect(() => {
        axios.get(`http://localhost:8000/resturant/get/${id}`)
            .then((res) => {
                setResturant(res.data.resturant);
            })
            .catch((err) => {
                console.error("Error fetching resturant: ", err);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResturant({ ...resturant, [name]: value });
    };

    const validateTelephoneNo = (telephoneNo) => {
        const telephonePattern = /^\d{10}$/;
        return telephonePattern.test(telephoneNo);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateTelephoneNo(resturant.telephoneNo)) {
            alert("Telephone number must be exactly 10 digits long and contain only numbers.");
            return;
        }

        axios.put(`http://localhost:8000/resturant/update/${id}`, resturant)
            .then(() => {
                alert("Resturant details updated");
                navigate('/');
            })
            .catch((err) => {
                console.error("Error updating details", err);
            });
    };

    return (
        <>
            <h1 className="font-sans text-5xl font-bold text-blue-400">Resturant App</h1>
            <br />
            <div className="container mx-auto p-4">
                <div className="flex justify-center space-x-2 mb-4">
                    <Link to={`/add/`} className="bg-blue-400 text-white px-3 py-2 rounded-md hover:bg-green-400">
                        Add Restaurant
                    </Link>
                    <Link to={`/`} className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-indigo-400">
                        View Restaurants
                    </Link>
                </div>
                <form onSubmit={handleSubmit} className="bg-blue-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-2xl font-semibold leading-7 text-gray-900 mb-6">Update Resturant</h2>
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Resturant Name:</label>
                                    <div className="mt-2">
                                        <input id="name" name="resturantName" type="text" value={resturant.resturantName} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div className="sm:col-span-4">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Address:</label>
                                    <div className="mt-2">
                                        <input id="address" name="address" type="text" value={resturant.address} onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div className="sm:col-span-4">
                                    <label htmlFor="telephoneNo" className="block text-sm font-medium leading-6 text-gray-900">Contact number:</label>
                                    <div className="mt-2">
                                        <input id="telephoneNo" name="telephoneNo" type="text" value={resturant.telephoneNo} onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => navigate('/')}>Cancel</button>
                        <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default UpdateResturant;
