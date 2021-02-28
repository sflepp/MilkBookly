import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon
} from "@ionic/react";
import { checkmark } from "ionicons/icons";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { connect } from "react-redux";
import MonetaryInput from "../../../components/MonetaryInput";
import { CustomDate } from "../../../model/CustomDate";
import { MonetaryAmount } from "../../../model/MonetaryAmount.model";
import { addCapitalEntry } from "../../../store/finance/finance.actions";
import { RootState } from "../../../store/reducer";
import store from "../../../store/store";
import './WizardCapital.css';

interface Props {
  currentTime: CustomDate
}

interface FormData {
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
    }
  });

  const onSubmit = (data: FormData) => {
    store.dispatch(addCapitalEntry({
      date: props.currentTime,
      amount: data.amount
    }))
  }

  return (<IonCard>
    <IonCardHeader>
      <IonCardSubtitle>Vermögen</IonCardSubtitle>
      <IonCardTitle>Wie ist dein aktueller Kontostand?</IonCardTitle>
    </IonCardHeader>

    <IonCardContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="amount"
          control={control}
          rules={{required: true, validate: (v) => v.amount > 0}}
          render={({ onChange, value }, { invalid }) =>
            <MonetaryInput invalid={invalid} value={value} onChange={onChange}/>
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