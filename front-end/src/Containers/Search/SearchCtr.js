import React, { useState } from 'react';
import SearchForm from '../../Forms/SearchForm';
import ReservationList from '../ReservationList/ReservationList';

const SearchCtr = () => {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [searched, setSearched] = useState(false);

  return (
    <div>
      <div className="ml-5">
        <h1 className="d-md-flex text-center mt-3">Search</h1>
        <SearchForm setSearch={setSearched} />
      </div>
      <div className="ml-5">
        {searched ? (
          <ReservationList
            reservations={reservations}
            error={reservationsError}
          />
        ) : (
          <div>
            <p>Awaiting search....</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCtr;
