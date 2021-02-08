import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  IonActionSheet,
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
import { add, repeat, returnDownBack } from "ionicons/icons";
import NewCashFlowEntryModal from "./components/NewCashFlowEntryModal";
import CashFlowListEntry from "./components/CashFlowListEntry";
import { TimeFrame } from "../../model/TimeFrame.model";

interface Props {
  cashFlow: CashFlowEntry[]
  preferredTimeFrame: TimeFrame
}

const mapStateToProps = (state: RootState) => {
  return {
    cashFlow: state.finance.cashFlow,
    preferredTimeFrame: state.settings.preferredTimeFrame
  }
}

const OverviewListPage: React.FC<Props> = (props) => {

  const [showModal, setShowModal] = useState<'one-time' | 'continuous' | undefined>();
  const [showActionSheet, setShowActionSheet] = useState<boolean>(false);
  const [searchText, setSearchText] = useState('');

  const filtered = searchText !== '' ? props.cashFlow.filter(e => e.description.includes(searchText)) : props.cashFlow;

  const entries = filtered
      .map((c) => {
        return {
          rate: rate(props.preferredTimeFrame, c),
          entry: c
        }
      })
      .sort((a, b) => b.rate.amount - a.rate.amount)

  const income = entries.filter(c => c.entry.type === 'income');
  const expense = entries.filter(c => c.entry.type === 'expense');

  return <IonPage>
    { showModal === 'continuous' && <NewCashFlowEntryModal onClose={ () => setShowModal(undefined) }/> }
    <IonHeader>
      <IonToolbar>
        <IonTitle>Finanzdaten</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Finanzdaten</IonTitle>
          <IonButtons slot="primary">
            <IonButton onClick={ () => {
              setShowActionSheet(true)
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
            <CashFlowListEntry key={ e.entry.id } others={ filtered } timeFrame={ props.preferredTimeFrame } entry={ e.entry }
                               rate={ e.rate }/>)
        }
      </IonList>) }
      { expense.length > 0 && (<IonList>
        <IonListHeader>
          <IonLabel>Ausgaben</IonLabel>
        </IonListHeader>
        { expense.map((e) =>
            <CashFlowListEntry key={ e.entry.id } others={ filtered } timeFrame={ props.preferredTimeFrame } entry={ e.entry }
                               rate={ e.rate }/>)
        }
      </IonList>) }


      <IonActionSheet
          isOpen={ showActionSheet }
          onDidDismiss={ () => setShowActionSheet(false) }
          buttons={ [{
            text: 'Wiederholend',
            icon: repeat,
            handler: () => {
              setShowModal('continuous');
            }
          }, {
            text: 'Einmalig',
            icon: returnDownBack,
            handler: () => {
              setShowModal('one-time');
            }
          }, {
            text: 'Abbrechen',
            role: 'cancel',
            handler: () => {
              setShowActionSheet(false)
            }
          }] }
      >
      </IonActionSheet>
    </IonContent>
  </IonPage>
}

export default connect(mapStateToProps)(OverviewListPage);
