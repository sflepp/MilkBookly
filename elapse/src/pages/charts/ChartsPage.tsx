import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { connect } from 'react-redux'
import { CapitalEntry, CashFlowEntry } from '../../store/finance/finance.state'
import { RootState } from '../../store/reducer'
import './ChartsPage.css';
import LiveIncome from "./components/LiveIncome";
import TotalIncomeRate from "./components/TotalIncomeRate";
import WizardCapital from '../wizard/components/WizardCapital'
import WizardWage from '../wizard/components/WizardContinuous'

interface Props {
  cashFlow: CashFlowEntry[]
  capital: CapitalEntry[]
  showTip: boolean,
  showWizard: boolean
}

const mapStateToProps = (state: RootState) => {
  return {
    cashFlow: state.finance.cashFlow,
    capital: state.finance.capital,
    showTip: state.settings.showTip,
    showWizard: state.settings.showWizard
  }
}


const ChartsPage: React.FC<Props> = (props) => {
  return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Übersicht</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large"><span style={ { position: 'relative', top: '3px' } }>Übersicht</span></IonTitle>
            </IonToolbar>
          </IonHeader>
          <TotalIncomeRate/>
          <LiveIncome/>
        </IonContent>
      </IonPage>
  );
};

export default connect(mapStateToProps)(ChartsPage);