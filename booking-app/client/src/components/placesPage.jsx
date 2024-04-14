import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AccountNav from "./accountNav";
function PlacesPage() {
  const { action } = useParams();
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/user-places", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        setPlaces(data);
      });
  }, []);
  return (
    <div>
      <AccountNav />
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="bg-primary gap-1 inline-flex text-white py-2 px-4 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}
      <div className="m-4">
        {places.length > 0 &&
          places.map((item, index) => (
            <Link
              to={"/account/places/" + item._id}
              key={index}
              className="bg-gray-100 gap-4 cursor-pointer flex p-2 rounded-2xl"
            >
              <div className="flex w-32 h-32  bg-gray-300 grow shrink-0">
                {item.photos.length > 0 && (
                  <img
                    className="object-cover"
                    src={"http://localohost:5000/upload" + item.photos[0]}
                    alt=""
                  />
                )}
              </div>
              <div className="grow-0 shrink-0">
                <h2 className="text-xl">{item.title}</h2>
                <p className="text-sm mt-2">{item.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default PlacesPage;
