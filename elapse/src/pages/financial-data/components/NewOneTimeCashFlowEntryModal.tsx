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
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { close } from "ionicons/icons";
import { Controller, useForm } from "react-hook-form";
import MonetaryInput from "../../../components/MonetaryInput";
import TimeFrameInput from "../../../components/TimeFrameInput";
import store from "../../../store";
import { addCashFlowEntry } from "../../../store/finance/finance.actions";
import { TimeFrame } from "../../../model/TimeFrame.model";
import { MonetaryAmount } from "../../../model/MonetaryAmount.model";
import CashFlowEntryTypeInput from "../../../components/CashFlowEntryTypeInput";
import { CashFlowEntryType } from "../../../model/CashFlowEntryType.model";
import { addNTimeFrames, CustomDate } from "../../../model/CustomDate";

interface Props {
  currentTime: CustomDate
  onClose: () => void
}

interface FormData {
  description: string
  type: CashFlowEntryType
  amortizationTimeFrame: TimeFrame
  amortizationAmount: number
  amount: MonetaryAmount
}

const NewOneTimeCashFlowEntryModal: React.FC<Props> = (props) => {

  const [title, setTitle] = useState<string>();
  const [plural, setPlural] = useState<boolean>();
  const { handleSubmit, control } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      description: '',
      type: 'expense',
      amount: {
        amount: 0,
        currency: 'CHF'
      },
      amortizationTimeFrame: 'MONTH',
      amortizationAmount: 1
    }
  });

  const onSubmit = (data: FormData) => {
    store.dispatch(addCashFlowEntry({
      description: data.description,
      type: data.type,
      category: 'wage',
      amount: data.amount,
      start: props.currentTime,
      end: addNTimeFrames(props.currentTime, data.amortizationTimeFrame, data.amortizationAmount),
      recurrence: {
        type: 'one-time',
        amortization: {
          timeFrame: data.amortizationTimeFrame,
          amount: data.amortizationAmount
        }
      },
    }))

    props.onClose()
  }

  return (
      <>
        <IonModal isOpen={ true } cssClass='my-custom-class'>
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
                <IonCardSubtitle>Einmalig</IonCardSubtitle>
                <IonCardTitle>{ title || 'Beschreibung' }</IonCardTitle>
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
                  <IonItem>
                    <IonLabel>Amortisation</IonLabel>
                    <Controller
                        name="amortizationAmount"
                        control={ control }
                        render={ ({ onChange, value }) =>
                            <IonInput type="number" style={ { textAlign: 'right' } } value={ value }
                                      onIonChange={ (e) => {
                                        const value = parseInt(e.detail.value!);

                                        if (!isNaN(value)) {
                                          setPlural(value !== 1)
                                          onChange(value)
                                        }
                                      } }/>
                        }
                    />
                    <Controller
                        name="amortizationTimeFrame"
                        control={ control }
                        render={ ({ onChange, value }) =>
                            <TimeFrameInput translation={ plural ? 'noun-plural' : 'noun' }
                                            value={ value } onChange={ onChange }/>
                        }
                    />
                  </IonItem>

                  <IonButton type="submit" className="ok-button">
                    Hinzufügen
                  </IonButton>
                </form>
              </IonCardContent>
            </IonCard>
          </IonContent>
        </IonModal>
      </>
  );
};

export default NewOneTimeCashFlowEntryModal