import React, { Fragment } from 'react'
import NavBar from '../features/nav/NavBar'
import ActivityDashboard from '../features/dashboard/ActivityDashboard'
import { observer } from 'mobx-react-lite'
import { Route, withRouter, RouteComponentProps } from 'react-router-dom'
import HomePage from '../features/home/HomePage'
import ActivityForm from '../features/form/ActivityForm'
import { Container } from 'semantic-ui-react'
import ActivityDetails from '../features/details/ActivityDetails'


const App: React.FC<RouteComponentProps> = ({ location }) => {

  return (
    <Fragment>
      <Route exact path='/' component={HomePage}  ></Route>

      <Route path={'/(.+)'} render={() => (
        <Fragment>
          <NavBar></NavBar>
          <Container style={{ marginTop: '6em' }} >

            <Route exact path='/activities' component={ActivityDashboard}  ></Route>
            <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm}  ></Route>
            <Route path='/activities/:id' component={ActivityDetails}></Route>
          </Container>
        </Fragment>
      )} />


    </Fragment>
  );
};

export default withRouter(observer(App));
