import React, { useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from "../store/reducer";
import { CashFlowEntry } from "../store/finance/finance.state";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { add } from "ionicons/icons";

interface Props {
  cashFlow: CashFlowEntry[]
}

const mapStateToProps = (state: RootState) => {
  return {
    cashFlow: state.finance.cashFlow
  }
}

const OverviewPage: React.FC<Props> = (props) => {

  const [searchText, setSearchText] = useState('');

  const filtered = searchText !== '' ? props.cashFlow.filter(e => e.description.includes(searchText)) : props.cashFlow;

  return <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Übersicht</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <IonToolbar>
        <IonButtons slot="primary">
          <IonButton onClick={ () => {
          } }>
            <IonIcon slot="icon-only" icon={ add }/>
          </IonButton>
        </IonButtons>
        <IonSearchbar placeholder="Suche" onIonChange={ e => setSearchText(e.detail.value!) }/>
      </IonToolbar>
      <IonList>
        { filtered.map(cashFlow => {
          return <IonItem>
            <IonLabel>{ cashFlow.description }</IonLabel>
          </IonItem>
        }) }
      </IonList>
    </IonContent>
  </IonPage>
}

export default connect(mapStateToProps)(OverviewPage);
