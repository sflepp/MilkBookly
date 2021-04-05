import { IonItem, IonLabel } from '@ionic/react';
import React, { useRef, useState } from 'react';
import './MonetaryInput.css';
import { Currency, MonetaryAmount } from "../model/MonetaryAmount.model";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducer";
import CurrencyInput from "react-currency-input-field";

interface Props {
  invalid: boolean
  defaultValue?: MonetaryAmount
  value: MonetaryAmount
  onChange: (value: MonetaryAmount) => void
}

const MonetaryInput: React.FC<Props> = (props) => {

  const [amount, setAmount] = useState<string>(props.value.amount === 0 ? '0' : props.value.amount + '')
  const currency = useSelector<RootState, Currency>(state => state.settings.preferredCurrency)
  const ref = useRef<HTMLInputElement>(null);

  const onChange = (newValue: string | undefined) => {
    setAmount(newValue || '0')

    props.onChange({
      currency: currency,
      amount: parseFloat(newValue || '0')
    })
  }
  return (
      <>
        <IonItem>
          <IonLabel onClick={ () => ref.current?.focus() }
                    color={ props.invalid ? 'danger' : undefined }>Betrag</IonLabel>
          <CurrencyInput
              ref={ref}
              className={ 'monetary-input' }
              prefix={ currency + ' ' }
              value={ amount }
              decimalsLimit={ 2 }
              groupSeparator={ `'` }
              allowNegativeValue={ false }
              onValueChange={ onChange }
          />
        </IonItem>
      </>
  );
};

export default MonetaryInput;
