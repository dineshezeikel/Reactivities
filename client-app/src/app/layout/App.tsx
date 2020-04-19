import React from 'react'
import { useEffect, useState, Fragment } from 'react'
import { IActivity } from '../models/activity'
import axios from 'axios'
import NavBar from '../../features/nav/NavBar'
import ActivitiesDashboard from '../../features/activities/dashboard/ActivitiesDashboard'

const App = () => {

  const [activities, setActivities] = useState<IActivity[]>([]);

  const [selectedActivity, setSelectedAcitivty] = useState<IActivity | null>(null);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<IActivity[]>("http://localhost:5000/api/activities").then((response) => {

      let transformedActitivies: IActivity[] = [];
      response.data.forEach((_activity) => {
        _activity.date = _activity.date.split(".")[0];
        transformedActitivies.push(_activity);
      });
      setActivities(transformedActitivies);
    });
  }, []);

  const handleSelectedActivity = (id: string): void => {
    setSelectedAcitivty(activities.filter((a => a.id === id))[0]);
    setEditMode(false);
  };

  const handleCreateActivityOpenForm = (): void => {
    setSelectedAcitivty(null);
    setEditMode(true);
  };

  const handleEditActivity = (activity: IActivity): void => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity]);
    setSelectedAcitivty(activity);
    setEditMode(false);
  };

  const handleDeleteActivity = (id: string): void => {
    setActivities([...activities.filter(a => a.id !== id)]);
  };

  const handleCreateActivity = (activity: IActivity): void => {
    setActivities([...activities, activity]);
    setSelectedAcitivty(activity);
    setEditMode(false);
  };

  return (
    <Fragment>
      <NavBar CreateActivityOpenForm={handleCreateActivityOpenForm} ></NavBar>
      <ActivitiesDashboard
        activities={activities}
        _selectActivity={handleSelectedActivity}
        selectedActivity={selectedActivity}
        setSelectedAcitivty={setSelectedAcitivty}
        editMode={editMode}
        setEditMode={setEditMode}
        editActivity={handleEditActivity}
        createActivity={handleCreateActivity}
        deleteActivity={handleDeleteActivity}
      ></ActivitiesDashboard>

    </Fragment>
  );
};

export default App;
