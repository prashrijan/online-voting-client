import React, { useEffect, useState } from 'react';
import LiveElections from '../Election/LiveElections';
import UpcomingElections from '../Election/UpcomingElections';
import Hero from '../../components/dashboard/Hero';
import { useDispatch, useSelector } from 'react-redux';
import { fetchElectionsAction } from '../../features/election/electionAction';
import Loader from '../../components/loader/Loader';

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
    <div className="h-100 bg-light">
      <div className="w-100">
        {loading ? (
          <Loader text="Please wait..." />
        ) : (
          <>
            <Hero />
            <LiveElections />
            <UpcomingElections />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
