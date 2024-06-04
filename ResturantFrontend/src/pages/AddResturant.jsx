import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
function AddResturant() {


    const [resturantName, setName] = useState("");
    const [address, setAddress] = useState("");
    const [telephoneNo, setTelephoneNo] = useState("");


    const navigate = useNavigate();

    const validateTelephoneNo = (telephoneNo) => {
        const telephonePattern = /^\d{10}$/;
        return telephonePattern.test(telephoneNo);
    };

    function sendData(e) {
        e.preventDefault();
        if (!validateTelephoneNo(telephoneNo)) {
            alert("Telephone number must be exactly 10 digits long and contain only numbers.");
            return;
        }
        const newResturant = {
            resturantName,
            address,
            telephoneNo
        }
        axios.post("http://localhost:8000/resturant/add", newResturant)
            .then(() => {
                alert("Resturant added");
                setName("");
                setAddress("");
                setTelephoneNo("");
                navigate('/');
            })
            .catch((err) => {
                alert(err);
            })
    }

    return (
        <>
            <h1 className="font-sans text-5xl font-bold text-blue-400"> Resturant App</h1>
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
                <form onSubmit={sendData} className="bg-blue-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className=" space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-2xl font-bold leading-7 text-gray-800 mb-6">Add Details</h2>

                            <div className="mt-10 grid grid-cols-1  gap-y-8 sm:grid-cols-6 justify-center">

                                <div class="sm:col-span-4">
                                    <label class="block text-sm font-medium leading-6 text-gray-900">Resturant Name:</label>
                                    <div class="mt-2">
                                        <input id="name" name="name" required type="text" value={resturantName} onChange={(e) => setName(e.target.value)} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-px" />
                                    </div>
                                </div>

                                <div class="sm:col-span-4">
                                    <label class="block text-sm font-medium leading-6 text-gray-900">Address:</label>
                                    <div class="mt-2">
                                        <input id="address" value={address} onChange={(e) => setAddress(e.target.value)} name="address" type="text" required class="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-px" />
                                    </div>
                                </div>

                                <div class="sm:col-span-4">
                                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Contact number:</label>
                                    <div class="mt-2">
                                        <input id="telephoneNo" required value={telephoneNo} onChange={(e) => setTelephoneNo(e.target.value)} name="telephoneNo" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => navigate('/')}>Cancel</button>

                        <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddResturant;
