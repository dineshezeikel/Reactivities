import React, { SyntheticEvent } from 'react'
import { useEffect, useState, Fragment } from 'react'
import { IActivity } from '../models/activity'
import NavBar from '../../features/nav/NavBar'
import ActivitiesDashboard from '../../features/activities/dashboard/ActivitiesDashboard'
import agent from '../api/agent'
import LoadingComponent from './LoadingComponent'

const App = () => {

  const [activities, setActivities] = useState<IActivity[]>([]);

  const [selectedActivity, setSelectedAcitivty] = useState<IActivity | null>(null);

  const [editMode, setEditMode] = useState(false);

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  const [target, setTarget] = useState('');

  useEffect(() => {

    agent.Activities.list()
      .then((response) => {
        let transformedActitivies: IActivity[] = [];
        response.forEach((_activity) => {
          _activity.date = _activity.date.split(".")[0];
          transformedActitivies.push(_activity);
        });
        setActivities(transformedActitivies);
      }).then(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent content="Loading activities..." ></LoadingComponent >

  const handleSelectedActivity = (id: string): void => {
    setSelectedAcitivty(activities.filter((a => a.id === id))[0]);
    setEditMode(false);
  };

  const handleCreateActivityOpenForm = (): void => {
    setSelectedAcitivty(null);
    setEditMode(true);
  };

  const handleEditActivity = (activity: IActivity): void => {
    setSubmitting(true);
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(a => a.id !== activity.id), activity]);
      setSelectedAcitivty(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false));

  };

  const handleDeleteActivity = (id: string, e: SyntheticEvent<HTMLButtonElement>): void => {
    setTarget(e.currentTarget.name);
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(a => a.id !== id)]);
    }).then(() => setSubmitting(false));

  };

  const handleCreateActivity = (activity: IActivity): void => {
    setSubmitting(true);
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedAcitivty(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false));

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
        submitting={submitting}
        target={target}
      ></ActivitiesDashboard>

    </Fragment>
  );
};

export default App;
