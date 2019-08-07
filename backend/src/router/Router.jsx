import React from 'react';
import cn from 'classnames';
import { Link, Switch, Route, Redirect } from 'react-router-dom';

// documents
import DocumentListContainer from 'containers/Document/List';
import DocumentAddContainer from 'containers/Document/Add';
import DocumentEditContainer from 'containers/Document/Edit';

import styles from './Router.module.scss';

class Router extends React.Component {
  render() {
    let selectedMenuItem = 0;
    if (window.location.pathname.startsWith('/files')) {
      selectedMenuItem = 0;
    }
    return (
      <div className={styles.wrapper}>
        <header>Inaday Admin</header>
        <div className={styles.container}>
          <div className={styles.sidebar}>
            <Link
              to='/files'
              className={cn(
                styles.menuitem,
                selectedMenuItem === 0 && styles['menuitem-selected']
              )}
            >
              Files
            </Link>
          </div>
          <div className={styles.content}>
            <Switch>
              <Route path='/files/add' component={DocumentAddContainer} />
              <Route
                path='/files/edit/:id'
                component={DocumentEditContainer}
              />
              <Route path='/files' component={DocumentListContainer} />
              <Redirect to='/files' />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default Router;
