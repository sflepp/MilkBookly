import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel
} from "@ionic/react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import MonetaryInput from "../../../components/MonetaryInput";
import { checkmark } from "ionicons/icons";
import TimeFrameInput from "../../../components/TimeFrameInput";
import './WizardWage.css';
import store from "../../../store";
import { addCashFlowEntry } from "../../../store/finance/finance.actions";
import { TimeFrame } from "../../../model/TimeFrame.model";
import { MonetaryAmount } from "../../../model/MonetaryAmount.model";

interface FormData {
  period: TimeFrame,
  amount: MonetaryAmount
}

const WizardWage: React.FC = () => {
  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      amount: {
        amount: 0,
        currency: 'CHF'
      },
      period: 'MONTH',
    }
  });

  const onSubmit = (data: FormData) => {
    store.dispatch(addCashFlowEntry({
      description: 'Lohn',
      type: 'income',
      category: 'wage',
      amount: data.amount,
      recurrence: {
        type: 'continuous',
        repetition: data.period
      },
      retention: {
        timeFrame: data.period,
        fn: 'linear'
      }
    }))
  }

  return (<IonCard>
    <IonCardHeader>
      <IonCardSubtitle>Lohn</IonCardSubtitle>
      <IonCardTitle>Was ist dein aktueller Lohn?</IonCardTitle>
    </IonCardHeader>

    <IonCardContent>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <Controller
            name="amount"
            control={ control }
            render={ ({ onChange, value }) =>
                <MonetaryInput value={ value } onChange={ onChange }/>
            }
        />
        <Controller
            name="period"
            control={ control }
            render={ ({ onChange, value }) =>
                <IonItem>
                  <IonLabel>Wiederholung</IonLabel>
                  <TimeFrameInput value={ value } onChange={ onChange }/>
                </IonItem>
            }
        />

        <IonButton type="submit" className="ok-button">
          <IonIcon slot="icon-only" icon={ checkmark }/>
        </IonButton>
      </form>
    </IonCardContent>
  </IonCard>)
};

export default WizardWage;