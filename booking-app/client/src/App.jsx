import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/Register";
import { UserContextProvider } from "./context/userContext";
import ProfilePage from "./components/accountPage";
import PlacesPage from "./components/placesPage";
import PlacesFormPages from "./components/placesFormPages";
import IndexPage from "./components/indexPage";
import PlacePageInfo from "./components/PlacePageInfo";
import BookingsPage from "./components/bookingsPage";
import Booking from "./components/booking";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <header>
          <Navbar />
        </header>

        <Routes>
          <Route index element={<IndexPage />}></Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />}></Route>
          <Route path="/account/places" element={<PlacesPage />}></Route>
          <Route
            path="/account/places/new"
            element={<PlacesFormPages />}
          ></Route>
          <Route
            path="/account/places/:id"
            element={<PlacesFormPages />}
          ></Route>
          <Route path="/place/:id" element={<PlacePageInfo />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<Booking />} />
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
