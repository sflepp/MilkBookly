import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './WizardPage.css';
import WizardWage from "./components/WizardWage";
import { CapitalEntry, CashFlowEntry } from "../../store/finance/finance.state";
import { RootState } from "../../store/reducer";
import { connect } from "react-redux";
import Tip from "./components/Tip";
import React from "react";
import WizardCapital from "./components/WizardCapital";

interface Props {
  cashFlow: CashFlowEntry[]
  capital: CapitalEntry[]
  showTip: boolean
}

const mapStateToProps = (state: RootState) => {
  return {
    cashFlow: state.finance.cashFlow,
    capital: state.finance.capital,
    showTip: state.settings.showTip
  }
}

const WizardPage: React.FC<Props> = (props) => {

  let wizard;
  if (!props.cashFlow.some((c) => c.category === 'wage')) {
    wizard = 'wage'
   } /*else if(props.capital.length === 0) {
    wizard = 'capital'
  } */ else {
    wizard = 'tip'
  }

  return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Wizard</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>

          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Wizard</IonTitle>
            </IonToolbar>
          </IonHeader>
          { wizard === 'wage' && <WizardWage/> }
          { wizard === 'capital' && <WizardCapital/> }
          { wizard === 'tip' && props.showTip && <Tip/> }
        </IonContent>
      </IonPage>
  );
};

export default connect(mapStateToProps)(WizardPage);
