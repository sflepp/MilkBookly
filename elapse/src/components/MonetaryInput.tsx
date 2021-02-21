import { IonItem, IonLabel } from '@ionic/react';
import React, { ChangeEvent, useState } from 'react';
import './MonetaryInput.css';
import { Currency, MonetaryAmount } from "../model/MonetaryAmount.model";
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

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setAmount(value)

    props.onChange({
      currency: currency,
      amount: parseFloat(value)
    })
  }
  return (
      <>
        <IonItem>
          <IonLabel>Betrag</IonLabel>
          <input value={ amount } type="number" step="0.01" inputMode="decimal"
                 style={ { textAlign: 'right', width: '80px'} } onChange={ (e) => {
            onChange(e)
          } }/>
          <span className="currency">CHF</span>
        </IonItem>
      </>
  );
};

export default MonetaryInput;
