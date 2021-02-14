import { IonInput, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useState } from 'react';
import './MonetaryInput.css';
import { AllCurrencies, Currency, MonetaryAmount } from "../model/MonetaryAmount.model";
import { InputChangeEventDetail, SelectChangeEventDetail } from "@ionic/core";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducer";

interface Props {
  defaultValue?: MonetaryAmount
  value: MonetaryAmount
  onChange: (value: MonetaryAmount) => void
}

const MonetaryInput: React.FC<Props> = (props) => {

  const [amount, setAmount] = useState<string>(props.value.amount === 0 ? '' : props.value.amount + '')

  const currency = useSelector<RootState, Currency>(state => state.settings.preferredCurrency)
  const onAmountChange = (e: CustomEvent<InputChangeEventDetail>) => {

    setAmount(e.detail.value!)
    const number = parseFloat(e.detail.value!);

    if (!isNaN(number)) {
      props.onChange({
        currency: currency,
        amount: number
      })
    } else {
      props.onChange({
        currency: currency,
        amount: 0
      })
    }
  }

  return (
      <>
        <IonItem>
          <IonLabel>Betrag</IonLabel>
          <IonInput value={ amount }
                    type='number'
                    step="0.01"
                    inputMode="decimal"
                    style={ { textAlign: 'right' } }
                    onIonChange={ onAmountChange }/>
          <span className="currency">CHF</span>
        </IonItem>
      </>
  );
};

export default MonetaryInput;
