import React, { useState, useEffect, useRef } from "react";
import '../index.css'
import axios from "axios";
import { Link } from "react-router-dom";
function Home() {

    const [resturants, setResturants] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/resturant/")
            .then((res) => {
                setResturants(res.data);
            }).catch((err) => {
                alert.apply(err.message)
            })
    }, []);

    const deleteHandler = async (id) => {
        await axios.delete(`http://localhost:8000/resturant/delete/${id}`)
            .then(() => {
                alert("Resturant is successfully deleted!!")
                setResturants(resturants.filter(resturant => resturant._id !== id));

            }
            )
            .catch((err) => {
                console.error("Error deletiing resturant", err);
            });

    }

    const [noResults, setNoResults] = useState(false);
    return (
        <>
            <h1 className="font-sans text-5xl font-bold text-blue-400"> Resturant App</h1>
            <br/>
            <div className="container mx-auto p-4">

                <div className="flex justify-center space-x-2 mb-4">
                    <Link to={`/add/`} className="bg-blue-400 text-white px-3 py-2 rounded-md hover:bg-green-400">
                        Add Restaurant
                    </Link>
                    <Link to={`/`} className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-indigo-400">
                        View Restaurants
                    </Link>
                    
                </div>
                <table class="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-indigo-300">
                            <th className="border border-gray-300 px-4 py-2">Resturant Name</th>
                            <th className="border border-gray-300 px-4 py-2">Address</th>
                            <th className="border border-gray-300 px-4 py-2">Telephone Number</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {resturants && resturants.map((Resturant, i) => (
                            <tr key={i} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2">{Resturant.resturantName}</td>
                                <td className="border border-gray-300 px-4 py-2">{Resturant.address}</td>
                                <td className="border border-gray-300 px-4 py-2">{Resturant.telephoneNo}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <Link to={`/update/${Resturant._id}`} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-400 mr-2"> Update</Link>
                                    <Link to={`/get/${Resturant._id}`} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-400 mr-2"> view</Link>
                                    
                                    <button onClick={() => deleteHandler(Resturant._id)} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-400 mr-2">Delete</button>
                                </td>


                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        </>
    )
}
export default Home