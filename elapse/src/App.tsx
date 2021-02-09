import { IonApp, IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

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
import React from 'react';
import { Redirect, Route } from "react-router-dom";
import WizardPage from "./pages/wizard/WizardPage";
import SettingsPage from "./pages/settings/SettingsPage";
import { cogOutline, colorWand, pulseOutline, readerOutline } from "ionicons/icons";
import { RootState } from "./store/reducer";
import { connect } from "react-redux";
import ChartsPage from "./pages/charts/ChartsPage";
import FinancialDataPage from "./pages/financial-data/FinancialDataPage";

interface Props {
  showWizard: boolean
}

const mapStateToProps = (state: RootState): Props => {
  return {
    showWizard: state.settings.showWizard
  }
}

const App: React.FC<Props> = (props) => {
  return (<IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/wizard">
            <WizardPage/>
          </Route>
          <Route path="/charts">
            <ChartsPage/>
          </Route>
          <Route exact path="/financial-data">
            <FinancialDataPage/>
          </Route>
          <Route exact path="/settings">
            <SettingsPage/>
          </Route>
          <Route exact path="/">
            <Redirect to={ props.showWizard ? '/wizard' : '/chart' }/>
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          { props.showWizard && <IonTabButton tab="wizard" href="/wizard">
              <IonIcon icon={ colorWand }/>
          </IonTabButton> }
          <IonTabButton tab="chart" href="/charts">
            <IonIcon icon={ pulseOutline }/>
          </IonTabButton>
          <IonTabButton tab="overview-list" href="/financial-data">
            <IonIcon icon={ readerOutline }/>
          </IonTabButton>
          <IonTabButton tab="settings" href="/settings">
            <IonIcon icon={ cogOutline }/>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>)
}

export default connect(mapStateToProps)(App)
