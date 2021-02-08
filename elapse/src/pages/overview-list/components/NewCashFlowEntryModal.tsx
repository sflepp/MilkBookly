import React from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { checkmark } from "ionicons/icons";
import { Controller, useForm } from "react-hook-form";
import MonetaryInput from "../../../components/MonetaryInput";
import TimeFrameInput from "../../../components/TimeFrameInput";
import store from "../../../store";
import { addCashFlowEntry } from "../../../store/finance/finance.actions";
import { TimeFrame } from "../../../model/TimeFrame.model";
import { MonetaryAmount } from "../../../model/MonetaryAmount.model";
import CashFlowEntryTypeInput from "../../../components/CashFlowEntryTypeInput";
import { CashFlowEntryType } from "../../../model/CashFlowEntryType.model";

interface Props {
  onClose: () => void
}

interface FormData {
  description: string
  type: CashFlowEntryType
  period: TimeFrame
  amount: MonetaryAmount
}

const NewCashFlowEntryModal: React.FC<Props> = (props) => {
  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      description: '',
      type: 'expense',
      amount: {
        amount: 0,
        currency: 'CHF'
      },
      period: 'MONTH',
    }
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    store.dispatch(addCashFlowEntry({
      description: data.description,
      type: data.type,
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

    props.onClose()
  }

  return (
      <>
        <IonModal isOpen={ true } cssClass='my-custom-class'>
          <IonPage>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Neuer Eintrag</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <form onSubmit={ handleSubmit(onSubmit) }>
                <Controller
                    name="description"
                    control={ control }
                    render={ ({ onChange, value }) =>
                        <IonItem>
                          <IonLabel position="floating">Beschreibung</IonLabel>
                          <IonInput value={ value } onIonChange={ (e) => onChange(e.detail.value!) }/>
                        </IonItem>
                    }
                />
                <Controller
                    name="type"
                    control={ control }
                    render={ ({ onChange, value }) =>
                        <IonItem>
                          <IonLabel position="floating">Typ</IonLabel>
                          <CashFlowEntryTypeInput value={ value } onChange={ onChange }/>
                        </IonItem>
                    }
                />
                <Controller
                    name="amount"
                    control={ control }
                    render={ ({ onChange, value }) =>
                        <IonItem>
                          <IonLabel position="floating">Wert</IonLabel>
                          <MonetaryInput value={ value } onChange={ onChange }/>
                        </IonItem>
                    }
                />
                <Controller
                    name="period"
                    control={ control }
                    render={ ({ onChange, value }) =>
                        <IonItem>
                          <IonLabel position="floating">Wiederholung</IonLabel>
                          <TimeFrameInput value={ value } onChange={ onChange }/>
                        </IonItem>
                    }
                />

                <IonButton type="submit" className="ok-button">
                  <IonIcon slot="icon-only" icon={ checkmark }/>
                </IonButton>
              </form>
            </IonContent>
          </IonPage>
        </IonModal>
      </>
  );
};

export default NewCashFlowEntryModal