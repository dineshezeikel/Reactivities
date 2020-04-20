import React, { SyntheticEvent } from 'react'
import { Grid, Container } from 'semantic-ui-react'
import ActivitiesList from './ActivitiesList'
import { IActivity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface IProps {
    activities: IActivity[];
    _selectActivity: (id: string) => void;
    selectedActivity: IActivity | null;
    setSelectedAcitivty: (activity: IActivity | null) => void;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    editActivity: (activity: IActivity) => void;
    createActivity: (activity: IActivity) => void;
    deleteActivity: (id: string, e: SyntheticEvent<HTMLButtonElement>) => void;
    submitting: boolean;
    target:string;
}

const ActivitiesDashboard: React.FC<IProps> = ({ activities, _selectActivity, selectedActivity, setSelectedAcitivty, editMode, setEditMode, editActivity, createActivity, deleteActivity, submitting, target }) => {
    return (
        <Container style={{ marginTop: '6em' }}>
            <Grid>
                <Grid.Column width={10}>
                    <ActivitiesList
                        activities={activities}
                        _selectActivity={_selectActivity}
                        deleteActivity={deleteActivity}
                        submitting={submitting}
                        target={target}
                    ></ActivitiesList>
                </Grid.Column>
                <Grid.Column width={6} >
                    {
                        selectedActivity && !editMode && (<ActivityDetails
                            activity={selectedActivity}
                            setSelectedAcitivty={setSelectedAcitivty}
                            setEditMode={setEditMode}>
                        </ActivityDetails>)
                    }
                    {editMode && <ActivityForm key={selectedActivity && selectedActivity.id || 0}
                        setEditMode={setEditMode}
                        activity={selectedActivity!}
                        editActivity={editActivity}
                        createActivity={createActivity}
                        submitting={submitting}
                    ></ActivityForm>}

                </Grid.Column>
            </Grid>
        </Container>
    );
};

export default ActivitiesDashboard;
