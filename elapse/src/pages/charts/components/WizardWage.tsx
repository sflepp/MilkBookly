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
import store from "../../../store/store";
import { addCashFlowEntry } from "../../../store/finance/finance.actions";
import { TimeFrame } from "../../../model/TimeFrame.model";
import { MonetaryAmount } from "../../../model/MonetaryAmount.model";
import { CustomDate } from "../../../model/CustomDate";
import { RootState } from "../../../store/reducer";
import { connect } from "react-redux";

interface Props {
  currentTime: CustomDate
}

interface FormData {
  period: TimeFrame
  amount: MonetaryAmount
}

const mapStateToProps = (state: RootState): Props => {
  return {
    currentTime: state.environment.currentTime
  }
}

const WizardWage: React.FC<Props> = (props) => {
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
      start: props.currentTime,
      recurrence: {
        type: 'continuous',
        repetition: data.period
      },
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

export default connect(mapStateToProps)(WizardWage);