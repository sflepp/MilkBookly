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
import { checkmark } from "ionicons/icons";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { connect } from "react-redux";
import MonetaryInput from "../../../components/MonetaryInput";
import TimeFrameInput from "../../../components/TimeFrameInput";
import { CustomDate } from "../../../model/CustomDate";
import { MonetaryAmount } from "../../../model/MonetaryAmount.model";
import { startOfTimeFrame, TimeFrame } from "../../../model/TimeFrame.model";
import { addCashFlowEntry } from "../../../store/finance/finance.actions";
import { RootState } from "../../../store/reducer";
import store from "../../../store/store";
import './WizardWage.css';

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
      start: startOfTimeFrame(props.currentTime, 'YEAR'),
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="amount"
          control={control}
          rules={{
            required: true, validate: (v) => v.amount > 0
          }}
          render={({ onChange, value }, { invalid }) =>
            <MonetaryInput invalid={invalid} value={value} onChange={onChange}/>
          }
        />
        <Controller
          name="period"
          control={control}
          rules={{ required: true }}
          render={({ onChange, value }, { invalid }) =>
            <IonItem>
              <IonLabel color={invalid ? 'danger' : undefined}>Wiederholung</IonLabel>
              <TimeFrameInput value={value} onChange={onChange}/>
            </IonItem>
          }
        />

        <IonButton type="submit" className="ok-button">
          <IonIcon slot="icon-only" icon={checkmark}/>
        </IonButton>
      </form>
    </IonCardContent>
  </IonCard>)
};

export default connect(mapStateToProps)(WizardWage);