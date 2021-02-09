import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel } from '@ionic/react';
import React from 'react';
import { trash } from "ionicons/icons";
import IncomeRate from "./IncomeRate";
import { CashFlowEntry } from "../../../store/finance/finance.state";
import { MonetaryAmountRate } from "../../../model/MonetaryAmountRate.model";
import { TimeFrame } from "../../../model/TimeFrame.model";
import store from "../../../store";
import { removeCashFlowEntry } from "../../../store/finance/finance.actions";

interface Props {
  entry: CashFlowEntry,
  rate: MonetaryAmountRate,
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
          <IonLabel>{ props.entry.description }</IonLabel>
          <IonLabel slot="end" style={ { textAlign: 'right' } }>
            <IncomeRate others={ props.others } cashFlow={ props.entry } timeFrame={ props.timeFrame }/>
          </IonLabel>
        </IonItem>
      </IonItemSliding>
  );
};

export default CashFlowListEntry;
