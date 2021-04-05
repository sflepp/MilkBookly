import { IonItem, IonLabel } from '@ionic/react';
import React, {ChangeEvent, useRef, useState} from 'react';
import './MonetaryInput.css';
import { Currency, MonetaryAmount } from "../model/MonetaryAmount.model";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducer";

interface Props {
  invalid: boolean
  defaultValue?: MonetaryAmount
  value: MonetaryAmount
  onChange: (value: MonetaryAmount) => void
}

const MonetaryInput: React.FC<Props> = (props) => {

  const [amount, setAmount] = useState<string>(props.value.amount === 0 ? '' : props.value.amount + '')
  const currency = useSelector<RootState, Currency>(state => state.settings.preferredCurrency)
  const ref = useRef<HTMLInputElement>(null);

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
          <IonLabel onClick={() => ref.current?.focus()} color={props.invalid ? 'danger' : undefined}>Betrag</IonLabel>
          <span className="currency" onClick={() => ref.current?.focus()}>CHF</span>
          <input ref={ref} value={ amount } type="number" step="0.01" inputMode="decimal"
                 style={ { marginLeft: '5px', textAlign: 'right', width: Math.max(amount.toString().length * 12.5, 10) + 'px'} } onChange={ (e) => {
            onChange(e)
          } }/>

        </IonItem>
      </>
  );
};

export default MonetaryInput;
