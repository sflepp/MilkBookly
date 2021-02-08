import { IonSelect, IonSelectOption } from '@ionic/react';
import React from 'react';
import { SelectChangeEventDetail } from "@ionic/core";
import {
  AllCashFlowEntryTypes,
  AllCashFlowEntryTypeTranslations,
  CashFlowEntryType
} from "../model/CashFlowEntryType.model";

interface Props {
  defaultValue?: CashFlowEntryType
  value: CashFlowEntryType
  onChange: (value: CashFlowEntryType) => void
}

const CashFlowEntryTypeInput: React.FC<Props> = (props) => {

  const defaultValue = props.defaultValue || 'expense'

  const onCurrencyChange = (e: CustomEvent<SelectChangeEventDetail>) => {
    props.onChange(e.detail.value)
  }

  return (
      <IonSelect value={ props.value || defaultValue }
                 okText="OK"
                 cancelText="Abbrechen"
                 onIonChange={ onCurrencyChange }>
        { AllCashFlowEntryTypes.map(c =>
            <IonSelectOption key={ c } value={ c }>{ AllCashFlowEntryTypeTranslations[c] }</IonSelectOption>
        ) }
      </IonSelect>
  );
};

export default CashFlowEntryTypeInput;
