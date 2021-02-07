import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './WizardPage.css';
import WizardWage from "./components/WizardWage";
import { CashFlowEntry } from "../../store/finance/finance.state";
import { RootState } from "../../store/reducer";
import { connect } from "react-redux";

interface Props {
  cashFlow: CashFlowEntry[]
}

const mapStateToProps = (state: RootState) => {
  return {
    cashFlow: state.finance.cashFlow
  }
}

const WizardPage: React.FC<Props> = (props) => {

  const hasWage = props.cashFlow.some((c) => c.type === 'wage')


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Wizard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {!hasWage && <WizardWage/> }
      </IonContent>
    </IonPage>
  );
};

export default connect(mapStateToProps)(WizardPage);
