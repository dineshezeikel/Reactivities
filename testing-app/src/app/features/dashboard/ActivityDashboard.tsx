import React, { useEffect, useContext } from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import ActivityList from './ActivityList'

import { observer } from 'mobx-react-lite';
import LoadingComponent from './LoadingComponent';
// import ActivityStore from '../../store/activityStore'
// import ActivityDetails from '../details/ActivityDetails';
// import ActivityForm from '../form/ActivityForm';
import activityStore from '../../store/activityStore'


const ActivityDashboard = () => {


    const ActivityStore = useContext(activityStore);
    const { loadActivities } = ActivityStore;

    useEffect(() => {
        loadActivities();
    }, [loadActivities]);




    if (ActivityStore.initialLoading) return <LoadingComponent content="Loading activities..."></LoadingComponent>


    // const activityStore = useContext(ActivityStore);
    // const { selectedActivity, editMode } = activityStore;

    return (

        <Grid>
            <GridColumn width={10}>
                <ActivityList ></ActivityList>
            </GridColumn>
            <GridColumn width={6}>
                {/* {selectedActivity && !editMode && (<ActivityDetails></ActivityDetails>)}
                {editMode && <ActivityForm key={selectedActivity && (selectedActivity.id || 0)}
                    activity={selectedActivity!} ></ActivityForm>} */}
                <h1>Activity Filter</h1>
            </GridColumn>
        </Grid>

    );
};

export default observer(ActivityDashboard);
