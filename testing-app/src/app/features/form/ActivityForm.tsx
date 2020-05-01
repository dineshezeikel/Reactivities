import React, { useContext, useState, FormEvent, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Form, Segment, Button } from 'semantic-ui-react'

import ActivityStore from '../../store/activityStore'
import { IActivity } from '../../model/Activity'

import { v4 as uuid } from 'uuid';
import { RouteComponentProps } from 'react-router'

interface IDetailsParms {

    id: string;
}

const ActivityForm: React.FC<RouteComponentProps<IDetailsParms>> = ({ match, history }) => {

    const activityStore = useContext(ActivityStore);
    const { ClearActivity,  CreateActivity, UpdateActivity, submitting, loadActivity, selectedActivity } = activityStore;

   

    const [activity, setActivity] = useState<IActivity>({
        id: "",
        title: "",
        description: "",
        date: "",
        catergoty: "",
        city: "",
        venue: ""

    }
    );

    useEffect(() => {
        if (match.params.id && activity.id.length === 0) {
            loadActivity(match.params.id).then(() => {
                selectedActivity && setActivity(selectedActivity)
            });
        }
        return (() => {
            ClearActivity();
        });
    }, [loadActivity, ClearActivity, match.params.id, selectedActivity, activity.id.length]);




    const handleSubmit = () => {
        if (activity.id.length === 0) {

            let newActivity = {
                ...activity,
                id: uuid()
            };
            CreateActivity(newActivity).then(() => {
                history.push(`/activities/${newActivity.id}`);
            })


        }
        else {
            UpdateActivity(activity).then(() => {
                history.push(`/activities/${activity.id}`);
            });
        }
    };

    const onInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value });
    };

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} >
                <Form.Input onChange={onInputChange} name="title" placeholder='Title' value={activity.title} ></Form.Input>
                <Form.TextArea onChange={onInputChange} name="description" rows={2} placeholder='Description' value={activity.description}  ></Form.TextArea>
                <Form.Input onChange={onInputChange} name="date" type='datetime-local' placeholder='Date' value={activity.date}  ></Form.Input>
                <Form.Input onChange={onInputChange} name="catergoty" placeholder='Catergory' value={activity.catergoty}  ></Form.Input>
                <Form.Input onChange={onInputChange} name="city" placeholder='City' value={activity.city}  ></Form.Input>
                <Form.Input onChange={onInputChange} name="venue" placeholder='Venue' value={activity.venue}  ></Form.Input>
                <Button loading={submitting} positive type='submit' content='Submit' floated='right' ></Button>
                <Button onClick={() => history.push('/activities')} type='button' content='Cancel' floated='right' ></Button>
            </Form>
        </Segment>
    );
};

export default observer(ActivityForm);
