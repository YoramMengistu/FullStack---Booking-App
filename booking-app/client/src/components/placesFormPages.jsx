import React, { useEffect, useState } from "react";
import Perks from "./perks";
import PhotoUploader from "./photoUploader";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "./accountNav";

function PlacesFormPages() {
  const { id } = useParams();
  console.log(id);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("http://localhost:5000/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  const savePlace = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        //update
        await axios.put(
          `http://localhost:5000/places/${id}`,
          {
            title,
            address,
            perks,
            addedPhotos,
            description,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setRedirect(true);
      } else {
        // new place
        await axios.post(
          "http://localhost:5000/places",
          {
            title,
            address,
            perks,
            addedPhotos,
            description,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setRedirect(true);
      }
    } catch (err) {
      console.error("Error adding new place:", err);
    }
  };
  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        <h2 className="text-xl mt-2">Title</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <h2 className="text-xl mt-4">Address</h2>
        <p className="text-gray-500 text-sm">Address to your place</p>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />

        <h2 className="text-xl mt-4">photos</h2>
        <p className="text-gray-500 text-sm">More = Better</p>

        <PhotoUploader onChange={setAddedPhotos} addedPhotos={addedPhotos} />
        <h2 className="text-xl mt-4">Description</h2>
        <p className="text-gray-500 text-sm">Description of the place</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <h2 className="text-xl mt-4">Perks</h2>
        <p className="text-gray-500 text-sm">
          Select all the perks of your place
        </p>
        <div className="mt-2 grid gap-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onchange={setPerks} />
        </div>
        <h2 className="text-xl mt-4">Extra info</h2>
        <p className="text-gray-500 text-sm">House rules etc</p>
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        <h2 className="text-xl mt-4">Check in&out times</h2>
        <p className="text-gray-500 text-sm">Add check in and out </p>
        <div className=" grid gap-2 grid-cols-2 md:grid-cols-4 ">
          <div>
            <h3 className="mt-2 -mb-2">Check in time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              placeholder="14"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-2">Check out time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              placeholder="11"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-2">Max number of guests</h3>
            <input
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              type="number"
            />
          </div>
        </div>
        <div>
          <h3 className="mt-2 -mb-2">Price per night</h3>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
          />
        </div>
        <div>
          <button className="primary my-4 ">Save</button>
        </div>
      </form>
    </div>
  );
}

export default PlacesFormPages;
