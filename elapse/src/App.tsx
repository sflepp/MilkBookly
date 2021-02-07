import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, list, square } from 'ionicons/icons';
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
import OverviewPage from "./pages/OverviewPage";
import WizardPage from "./pages/wizard/WizardPage";

const App: React.FC = () => (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/overview">
              <OverviewPage/>
            </Route>
            <Route exact path="/tab2">
              <WizardPage/>
            </Route>
            <Route path="/tab3">
              <Tab3/>
            </Route>
            <Route exact path="/">
              <Redirect to="/tab1"/>
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="overview" href="/overview">
              <IonIcon icon={ list }/>
              <IonLabel>Übersicht</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon icon={ ellipse }/>
              <IonLabel>Tab 2</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/tab3">
              <IonIcon icon={ square }/>
              <IonLabel>Tab 3</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
);

export default App;
