import React, { useState } from 'react';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
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
import { checkmark, close, pin } from "ionicons/icons";
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

const NewContinuousCashFlowEntryModal: React.FC<Props> = (props) => {

  const [ title, setTitle ] = useState<string>();
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
                <IonButtons slot="end">
                  <IonButton onClick={ props.onClose }>
                    <IonIcon icon={ close }/>
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonCard>
                <IonCardHeader>
                  <IonCardSubtitle>Wiederholend</IonCardSubtitle>
                  <IonCardTitle>{title || 'Beschreibung'}</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  <form onSubmit={ handleSubmit(onSubmit) }>
                    <Controller
                        name="description"
                        control={ control }
                        render={ ({ onChange, value }) =>
                            <IonItem>
                              <IonLabel>Beschreibung</IonLabel>
                              <IonInput style={ { textAlign: 'right' } } value={ value }
                                        onIonChange={ (e) => {
                                          setTitle(e.detail.value!)
                                          onChange(e.detail.value!)
                                        } }/>
                            </IonItem>
                        }
                    />
                    <Controller
                        name="type"
                        control={ control }
                        render={ ({ onChange, value }) =>
                            <IonItem>
                              <IonLabel>Typ</IonLabel>
                              <CashFlowEntryTypeInput value={ value } onChange={ onChange }/>
                            </IonItem>
                        }
                    />
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
                      Hinzufügen
                    </IonButton>
                  </form>
                </IonCardContent>
              </IonCard>
            </IonContent>
          </IonPage>
        </IonModal>
      </>
  );
};

export default NewContinuousCashFlowEntryModal