import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { connect } from 'react-redux'
import { CapitalEntry, CashFlowEntry } from '../../store/finance/finance.state'
import { RootState } from '../../store/reducer'
import './ChartsPage.css';
import LiveIncome from "./components/LiveIncome";
import Tip from './components/Tip'
import TotalIncomeRate from "./components/TotalIncomeRate";
import WizardCapital from './components/WizardCapital'
import WizardWage from './components/WizardWage'

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

  let wizard;
  if (!props.cashFlow.some((c) => c.category === 'wage') && props.showWizard) {
    wizard = 'wage'
  } /* else if (props.capital.length === 0 && props.showWizard) {
    wizard = 'capital'
  }*/  else   {
    wizard = 'tip'
  }

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
            <IonTitle size="large"><span style={{ position: 'relative', top: '3px' }}>Übersicht</span></IonTitle>
          </IonToolbar>
        </IonHeader>
        {wizard === 'wage' && <WizardWage/>}
        {wizard === 'capital' && <WizardCapital/>}
        <TotalIncomeRate/>
        <LiveIncome/>
        {wizard === 'tip' && props.showTip && <Tip/>}
      </IonContent>
    </IonPage>
  );
};

export default connect(mapStateToProps)(ChartsPage);