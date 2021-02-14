import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon
} from "@ionic/react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import MonetaryInput from "../../../components/MonetaryInput";
import { checkmark } from "ionicons/icons";
import './WizardCapital.css';
import store from "../../../store/store";
import { addCapitalEntry } from "../../../store/finance/finance.actions";
import { MonetaryAmount } from "../../../model/MonetaryAmount.model";
import { CustomDate } from "../../../model/CustomDate";
import { RootState } from "../../../store/reducer";
import { connect } from "react-redux";

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
      <form onSubmit={ handleSubmit(onSubmit) }>
        <Controller
            name="amount"
            control={ control }
            render={ ({ onChange, value }) =>
                <MonetaryInput value={ value } onChange={ onChange }/>
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