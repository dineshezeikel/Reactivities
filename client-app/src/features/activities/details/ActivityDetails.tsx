import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';


interface IProps {

    activity: IActivity;
    setSelectedAcitivty: (activity: IActivity | null) => void;
    setEditMode: (editMode: boolean) => void;

}

const ActivityDetails: React.FC<IProps> = ({ activity, setSelectedAcitivty, setEditMode }) => {
    return (
        <Card fluid >
            <Image src={`/assets/categoryImages/${activity.catergoty}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    {activity.date}
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button onClick={() => setEditMode(true)} basic color='red' content='Edit' ></Button>
                    <Button onClick={() => setSelectedAcitivty(null)} basic color='grey' content='Cancel' ></Button>

                </Button.Group>
            </Card.Content>
        </Card>
    );
};

export default ActivityDetails;
