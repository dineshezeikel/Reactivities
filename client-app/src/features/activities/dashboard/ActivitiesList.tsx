import React from 'react'
import { Item, Segment, Button, Label } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity';

interface IProps {
    activities: IActivity[];
    _selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
}

const ActivitiesList: React.FC<IProps> = ({ activities, _selectActivity, deleteActivity }) => {
    return (
        <Segment clearing>
            <Item.Group divided>
                {activities.map((_activity) => (
                    <Item key={_activity.id} >
                        <Item.Content>
                            <Item.Header as='a'>{_activity.title}</Item.Header>
                            <Item.Meta>{_activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{_activity.description}</div>
                                <div>{_activity.city}, {_activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => _selectActivity(_activity.id)} content='View' color='blue' floated='right' ></Button>
                                <Button onClick={() => deleteActivity(_activity.id)} content='Delete' color='red' floated='right' ></Button>
                                <Label basic content={_activity.catergoty} ></Label>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}

            </Item.Group>
        </Segment>
    );
};

export default ActivitiesList;
