import React, { useState, FormEvent } from 'react'
import { Form, Segment, Button } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid'

interface IProps {
    setEditMode: (editMode: boolean) => void;
    activity: IActivity;
    editActivity: (activity: IActivity) => void;
    createActivity: (activity: IActivity) => void;
}

const ActivityForm: React.FC<IProps> = ({ setEditMode, activity: initialActivityValues, editActivity, createActivity }) => {

    const InitializeForm = (): IActivity => {
        if (initialActivityValues)
            return initialActivityValues;
        else {
            return {
                id: "",
                title: "",
                date: "",
                description: "",
                catergoty: "",
                city: "",
                venue: ""
            };
        }
    };

    const [activity, setActivity] = useState<IActivity>(InitializeForm);

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value });
    };

    const handleSubmitForm = (): void => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity);
           
        } else {
            editActivity(activity);
        }
    };

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmitForm} >
                <Form.Input onChange={handleInputChange} name='title' placeholder='Title' value={activity.title} ></Form.Input>
                <Form.TextArea onChange={handleInputChange} name="description" rows={2} placeholder='Description' value={activity.description}></Form.TextArea>
                <Form.Input onChange={handleInputChange} name="date" type='datetime-local' placeholder='Date' value={activity.date}></Form.Input>
                <Form.Input onChange={handleInputChange} name='catergoty' placeholder='Catergory' value={activity.catergoty} ></Form.Input>
                <Form.Input onChange={handleInputChange} name='city' placeholder='City' value={activity.city}></Form.Input>
                <Form.Input onChange={handleInputChange} name='venue' placeholder='Venue' value={activity.venue} ></Form.Input>
                <Button type='submit' content='Submit' positive floated='right'></Button>
                <Button onClick={() => setEditMode(false)} type='button' content='Cancel' floated='right'></Button>

            </Form>
        </Segment>


    );
};

export default ActivityForm;
