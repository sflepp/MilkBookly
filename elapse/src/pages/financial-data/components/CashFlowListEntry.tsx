import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel } from '@ionic/react';
import React from 'react';
import { trash } from "ionicons/icons";
import IncomeRate from "./IncomeRate";
import { CashFlowEntry } from "../../../store/finance/finance.state";
import { MonetaryAmountRate } from "../../../model/MonetaryAmountRate.model";
import { TimeFrame } from "../../../model/TimeFrame.model";
import store from "../../../store/store";
import { removeCashFlowEntry } from "../../../store/finance/finance.actions";
import { CustomDate } from "../../../model/CustomDate";

interface Props {
  time: CustomDate
  entry: CashFlowEntry
  rate: MonetaryAmountRate
  timeFrame: TimeFrame
  others: CashFlowEntry[]
}

const CashFlowListEntry: React.FC<Props> = (props) => {

  const removeEntry = (entry: CashFlowEntry) => {
    store.dispatch(removeCashFlowEntry(entry.id!))
  }

  return (
      <IonItemSliding key={ props.entry.id }>
        <IonItemOptions side="end">
          <IonItemOption color="danger" expandable onClick={ () => removeEntry(props.entry) }>
            <IonIcon icon={ trash }/>
          </IonItemOption>
        </IonItemOptions>
        <IonItem>
          <IonLabel style={ { width: '70%' } }>
            <b>{ props.entry.description }</b><br/>
            <span style={ {
              color: 'grey',
              fontSize: '0.85em'
            } }>{ props.entry.recurrence.type === 'continuous' ? 'Wiederkehrend' : '' }</span>
            { props.entry.end && <span style={ {
              color: 'grey',
              fontSize: '0.85em'
            } }>{new Date(props.entry.start).toLocaleDateString('de-CH')} bis { new Date(props.entry.end).toLocaleDateString('de-CH') }</span> }
          </IonLabel>
          <IonLabel slot="end" style={ { textAlign: 'right', flex: '0 0 110px' } }>
            <IncomeRate time={props.time} others={ props.others } cashFlow={ props.entry } timeFrame={ props.timeFrame }/>
          </IonLabel>
        </IonItem>
      </IonItemSliding>
  );
};

export default CashFlowListEntry;
