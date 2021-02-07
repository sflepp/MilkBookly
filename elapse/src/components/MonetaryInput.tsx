import { IonInput, IonSelect, IonSelectOption } from '@ionic/react';
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
    props.onChange({
      ...props.value,
      amount: parseFloat(e.detail.value!)
    })
  }

  const onCurrencyChange = (e: CustomEvent<SelectChangeEventDetail>) => {
    props.onChange({
      ...props.value,
      currency: e.detail.value!
    })
  }

  return (
      <div className={ 'monetary-input' }>
        <IonSelect value={ props.value.currency || defaultValue.currency }
                   okText="OK" cancelText="Abbrechen"
                   style={{paddingLeft: 0}}
                   onIonChange={ onCurrencyChange }>
          { AllCurrencies.map(c =>
              <IonSelectOption key={ c } value={ c }>{ c }</IonSelectOption>
          ) }
        </IonSelect>
        <IonInput value={ props.value.amount || defaultValue.amount }
                  type='number'
                  placeholder=""
                  onIonChange={ onAmountChange }/>
      </div>
  );
};

export default MonetaryInput;
