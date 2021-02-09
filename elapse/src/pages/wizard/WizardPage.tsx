import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './WizardPage.css';
import WizardWage from "./components/WizardWage";
import { CashFlowEntry } from "../../store/finance/finance.state";
import { RootState } from "../../store/reducer";
import { connect } from "react-redux";
import Tip from "./components/Tip";
import React from "react";

interface Props {
  cashFlow: CashFlowEntry[]
  showTip: boolean
}

const mapStateToProps = (state: RootState) => {
  return {
    cashFlow: state.finance.cashFlow,
    showTip: state.settings.showTip
  }
}

const WizardPage: React.FC<Props> = (props) => {

  const wizard = props.cashFlow.some((c) => c.category === 'wage') ? 'tip' : 'wage';

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
          { wizard === 'tip' && props.showTip && <Tip/> }
        </IonContent>
      </IonPage>
  );
};

export default connect(mapStateToProps)(WizardPage);
