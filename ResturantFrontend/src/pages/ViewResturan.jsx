import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";

function ViewResturant() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [resturant, setResturant] = useState({
        resturantName: "",
        address: "",
        telephoneNo: ""
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

    return (
        <>
            <h1 className="font-sans text-5xl font-bold text-blue-400 text-center mt-6">Resturant App</h1>
            <div className="container mx-auto p-4">
                <div className="flex justify-center space-x-4 mb-4">
                    <Link to={`/add/`} className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-green-400">
                        Add Restaurant
                    </Link>
                    <Link to={`/`} className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-indigo-400">
                        View Restaurants
                    </Link>
                </div>
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="border-b border-gray-300 pb-6">
                        <h2 className="text-2xl font-semibold leading-7 text-gray-900 mb-6 text-center">View Data</h2>
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <tbody>
                                <tr className="border border-gray-300 px-4 py-2">
                                    <td className="bg-indigo-300 px-4 py-2 font-semibold">Resturant Name:</td>
                                    <td className="px-4 py-2">{resturant.resturantName}</td>
                                </tr>
                                <tr className="border border-gray-300 px-4 py-2">
                                    <td className="bg-indigo-300 px-4 py-2 font-semibold">Resturant Address:</td>
                                    <td className="px-4 py-2">{resturant.address}</td>
                                </tr>
                                <tr className="border border-gray-300 px-4 py-2">
                                    <td className="bg-indigo-300 px-4 py-2 font-semibold">Resturant Telephone Number:</td>
                                    <td className="px-4 py-2">{resturant.telephoneNo}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button 
                            type="button" 
                            className="text-sm font-semibold leading-6 text-gray-900" 
                            onClick={() => navigate('/')}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewResturant;
