import React, { useContext } from 'react'
import { Item, Button, Label, Segment } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../store/activityStore'
import { Link } from 'react-router-dom';


const ActivityList = () => {

    const activityStore = useContext(ActivityStore);
    const { SortActivityByDate,  DeleteActivity, submitting, target } = activityStore;
    return (
        <Segment clearing>
            <Item.Group divided>
                {SortActivityByDate.map((activity) => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button as={Link} to={`/activities/${activity.id}`} content='View' color='blue' floated='right' ></Button>
                                <Button name={activity.id} loading={target === activity.id && submitting}
                                    onClick={(e) => DeleteActivity(e, activity.id)} content='Delete' color='red' floated='right' ></Button>
                                <Label basic content={activity.catergoty}></Label>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    );
};

export default observer(ActivityList);
