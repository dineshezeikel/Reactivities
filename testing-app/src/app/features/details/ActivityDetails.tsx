import React, { useContext, useEffect } from 'react'
import { Card, Image, Button, ButtonGroup } from 'semantic-ui-react'

import ActivityStore from '../../store/activityStore'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps } from 'react-router';
import LoadingComponent from '../dashboard/LoadingComponent';
import { Link } from 'react-router-dom';

interface IDetails {
    id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<IDetails>> = ({ match, history }) => {

    const activityStore = useContext(ActivityStore);
    const { selectedActivity: activity, loadActivity, initialLoading } = activityStore;

    useEffect(() => {
        loadActivity(match.params.id);
    }, [loadActivity, match.params.id]);

    if (initialLoading || !activity) return <LoadingComponent content="Loading activity...."></LoadingComponent>


    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity!.catergoty}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{activity!.title}</Card.Header>
                <Card.Meta>
                    {activity!.date}
                </Card.Meta>
                <Card.Description>
                    {activity!.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths={2}>
                    <Button as={Link} to={`/manage/${activity.id}`} basic content='Edit' color='red'></Button>
                    <Button onClick={() => history.push('/activities')} basic content='Cancel' color='grey'></Button>
                </ButtonGroup>
            </Card.Content>
        </Card>
    );
};

export default observer(ActivityDetails);
