import React, { useEffect, useState } from 'react';
import LiveElections from '../Election/LiveElections';
import UpcomingElections from '../Election/UpcomingElections';
import Hero from '@components/dashboard/Hero';
import { useDispatch, useSelector } from 'react-redux';
import { fetchElectionsAction } from '@features/election/electionAction';
import Loader from '@components/loader/Loader';

const Dashboard = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchElectionsAction());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      <div className="container flex-grow-1 py-4">
        {loading ? (
          <Loader text="Please wait..." />
        ) : (
          <>
            <Hero />

            <div className="mt-5">
              <LiveElections />
            </div>
            <div className="mt-4">
              <UpcomingElections />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
