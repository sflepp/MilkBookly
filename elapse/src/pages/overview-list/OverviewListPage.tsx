import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { CashFlowEntry } from "../../store/finance/finance.state";
import { RootState } from "../../store/reducer";
import { rate } from "../../model/MonetaryAmountRate.model";
import { add } from "ionicons/icons";
import NewCashFlowEntryModal from "./components/NewCashFlowEntryModal";
import CashFlowListEntry from "./components/CashFlowListEntry";

interface Props {
  cashFlow: CashFlowEntry[]
}

const mapStateToProps = (state: RootState) => {
  return {
    cashFlow: state.finance.cashFlow
  }
}

const OverviewListPage: React.FC<Props> = (props) => {

  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');

  const timeFrame = 'DAY';

  const filtered = searchText !== '' ? props.cashFlow.filter(e => e.description.includes(searchText)) : props.cashFlow;

  const entries = filtered
      .map((c) => {
        return {
          rate: rate(timeFrame, c),
          entry: c
        }
      })
      .sort((a, b) => b.rate.amount - a.rate.amount)

  const income = entries.filter(c => c.entry.type === 'income');
  const expense = entries.filter(c => c.entry.type === 'expense');

  return <IonPage>
    { showModal && <NewCashFlowEntryModal onClose={ () => setShowModal(false) }/> }
    <IonHeader>
      <IonToolbar>
        <IonTitle>Übersicht</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Übersicht</IonTitle>
          <IonButtons slot="primary">
            <IonButton onClick={ () => {
              setShowModal(true)
            } }>
              <IonIcon slot="icon-only" icon={ add }/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonToolbar style={ { marginTop: '16px' } }>
        <IonSearchbar placeholder="Suche" onIonChange={ e => setSearchText(e.detail.value!) }/>
      </IonToolbar>
      { income.length > 0 && (<IonList>
        <IonListHeader>
          <IonLabel>Einnahmen</IonLabel>
        </IonListHeader>
        { income.map((e) =>
            <CashFlowListEntry key={e.entry.id} others={ filtered } timeFrame={ timeFrame } entry={ e.entry } rate={ e.rate }/>)
        }
      </IonList>) }
      { expense.length > 0 && (<IonList>
        <IonListHeader>
          <IonLabel>Ausgaben</IonLabel>
        </IonListHeader>
        { expense.map((e) =>
            <CashFlowListEntry key={e.entry.id} others={ filtered } timeFrame={ timeFrame } entry={ e.entry } rate={ e.rate }/>)
        }
      </IonList>) }
    </IonContent>
  </IonPage>
}

export default connect(mapStateToProps)(OverviewListPage);
