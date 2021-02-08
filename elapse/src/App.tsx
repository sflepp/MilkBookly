import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { barChart, colorWand, list, square } from 'ionicons/icons';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import WizardPage from "./pages/wizard/WizardPage";
import OverviewListPage from "./pages/overview-list/OverviewListPage";

const App: React.FC = () => (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/overview-list">
              <OverviewListPage/>
            </Route>
            <Route exact path="/wizard">
              <WizardPage/>
            </Route>
            <Route path="/chart">
              <Tab3/>
            </Route>
            <Route exact path="/">
              <Redirect to="/wizard"/>
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="wizard" href="/wizard">
              <IonIcon icon={ colorWand }/>
            </IonTabButton>
            <IonTabButton tab="chart" href="/chart">
              <IonIcon icon={ barChart }/>
            </IonTabButton>
            <IonTabButton tab="overview-list" href="/overview-list">
              <IonIcon icon={ list }/>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
);

export default App;
