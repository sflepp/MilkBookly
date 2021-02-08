import { IonInput, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import React from 'react';
import './MonetaryInput.css';
import { AllCurrencies, MonetaryAmount } from "../model/MonetaryAmount.model";
import { InputChangeEventDetail, SelectChangeEventDetail } from "@ionic/core";

interface Props {
  defaultValue?: MonetaryAmount
  value: MonetaryAmount
  onChange: (value: MonetaryAmount) => void
}

const MonetaryInput: React.FC<Props> = (props) => {

  const defaultValue = props.defaultValue || {
    amount: 0,
    currency: 'CHF'
  }

  const onAmountChange = (e: CustomEvent<InputChangeEventDetail>) => {
    const number = parseFloat(e.detail.value!);
    if (!isNaN(number)) {
      props.onChange({
        ...props.value,
        amount: number
      })
    } else {
      props.onChange({
        ...props.value,
        amount: 0
      })
    }
  }

  const onCurrencyChange = (e: CustomEvent<SelectChangeEventDetail>) => {
    props.onChange({
      ...props.value,
      currency: e.detail.value!
    })
  }

  return (
      <>
        <IonItem>
          <IonLabel>Betrag</IonLabel>
          <IonInput value={ props.value.amount === 0 ? '' : props.value.amount }
                    type='text'
                    inputMode="decimal"
                    style={ { textAlign: 'right' } }
                    onIonChange={ onAmountChange }/>
        </IonItem>
        <IonItem>
          <IonLabel>Währung</IonLabel>
          <IonSelect value={ props.value.currency || defaultValue.currency }
                     interface="action-sheet"
                     style={ { paddingLeft: 0 } }
                     onIonChange={ onCurrencyChange }>
            { AllCurrencies.map(c =>
                <IonSelectOption key={ c } value={ c }>{ c }</IonSelectOption>
            ) }
          </IonSelect>
        </IonItem>
      </>
  );
};

export default MonetaryInput;
