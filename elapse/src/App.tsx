import { IonApp, IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import '@ionic/react/css/core.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/typography.css';
import { cogOutline, pulseOutline, readerOutline } from "ionicons/icons";
import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { CustomDate } from "./model/CustomDate";
import ChartsPage from "./pages/charts/ChartsPage";
import FinancialDataPage from "./pages/financial-data/FinancialDataPage";
import SettingsPage from "./pages/settings/SettingsPage";
import WizardPage from './pages/wizard/WizardPage'
import { tickTime } from "./store/enviornment/enviornment.actions";
import { RootState } from "./store/reducer";
import store from "./store/store";

/* Theme variables */
import './theme/variables.css';
import './App.css';
import Tip from "./modal/Tip/Tip";

interface Props {
  wizardComplete: boolean
  currentTime: CustomDate
}

const mapStateToProps = (state: RootState): Props => {
  return {
    wizardComplete: state.environment.wizardComplete,
    currentTime: state.environment.currentTime
  }
}

const App: React.FC<Props> = ({ wizardComplete }) => {

  useEffect(() => {
    const interval = setInterval(() => {
      store.dispatch(tickTime())
    }, 10000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (<IonApp>
    { wizardComplete && <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/charts">
            <ChartsPage/>
          </Route>
          <Route exact path="/financial-data">
            <FinancialDataPage/>
          </Route>
          <Route exact path="/settings">
            <SettingsPage/>
          </Route>
          <Route exact path="/">
            <Redirect to="/charts"/>
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="charts" href="/charts">
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
    </IonReactRouter> }
    { !wizardComplete && <WizardPage /> }
    <Tip/>
  </IonApp>)
}

export default connect(mapStateToProps)(App)
