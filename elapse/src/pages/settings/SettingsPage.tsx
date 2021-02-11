import {
  IonContent,
  IonDatetime,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar
} from '@ionic/react';
import React, { useState } from 'react';
import './SettingsPage.css';
import { connect } from "react-redux";
import { RootState } from "../../store/reducer";
import { AllCurrencies, Currency } from "../../model/MonetaryAmount.model";
import store from "../../store";
import {
  setPreferredCurrency,
  setPreferredTimeFrame,
  setShowTip,
  setShowWizard
} from "../../store/settings/settings.actions";
import { TimeFrame } from "../../model/TimeFrame.model";
import TimeFrameInput from "../../components/TimeFrameInput";
import { CustomDate } from "../../model/CustomDate";
import { setCurrentTime, setUseFakeTime } from "../../store/enviornment/enviornment.actions";

interface Props {
  showWizard: boolean,
  showTip: boolean,
  preferredCurrency: Currency,
  preferredTimeFrame: TimeFrame,
  currentTime: CustomDate,
  useFakeTime: boolean
}

const mapStateToProps = (state: RootState) => {
  return {
    showWizard: state.settings.showWizard,
    showTip: state.settings.showTip,
    preferredCurrency: state.settings.preferredCurrency,
    preferredTimeFrame: state.settings.preferredTimeFrame,
    currentTime: state.environment.currentTime,
    useFakeTime: state.environment.useFakeTime
  }
}

const SettingsPage: React.FC<Props> = (props) => {

  const [timeCache, setTimeCache] = useState<CustomDate>(props.currentTime)
  const [useFakeTimeCache, setUseFakeTimeCache] = useState<boolean>(props.useFakeTime)

  return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Einstellungen</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Einstellungen</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonItem>
            <IonLabel>Währung</IonLabel>
            <IonSelect value={ props.preferredCurrency }
                       interface="action-sheet"
                       onIonChange={ (e) => store.dispatch(setPreferredCurrency(e.detail.value)) }>
              { AllCurrencies.map(c => <IonSelectOption key={ c } value={ c }>{ c }</IonSelectOption>) }
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Zeitraum</IonLabel>

            <TimeFrameInput translation="noun" value={ props.preferredTimeFrame }
                            onChange={ (e) => store.dispatch(setPreferredTimeFrame(e)) }/>
          </IonItem>

          <IonItem>
            <IonLabel>Wizard</IonLabel>
            <IonToggle slot="end" checked={ props.showWizard }
                       onIonChange={ (e) => {
                         const checked = e.detail.checked
                         if (checked !== props.showWizard) {
                           store.dispatch(setShowWizard(e.detail.checked))
                         }
                       } }/>
          </IonItem>

          <IonItem>
            <IonLabel>Trinkgeld</IonLabel>
            <IonToggle slot="end" checked={ props.showTip }
                       onIonChange={ (e) => store.dispatch(setShowTip(e.detail.checked)) }/>
          </IonItem>

          <br />

          <IonItem>
            <IonLabel><IonText><h1>Development Settings</h1></IonText></IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Fake time</IonLabel>
            <IonToggle slot="end" checked={ useFakeTimeCache }
                       onIonChange={ (e) => {
                         setUseFakeTimeCache(e.detail.checked)
                         store.dispatch(setUseFakeTime(e.detail.checked))
                       } }/>
          </IonItem>
          <IonItem>
            <IonLabel>Aktuelles Datum (dev)</IonLabel>
            <IonDatetime displayFormat="DD.MM.YYYY" max="2030" placeholder="Select Date" value={ timeCache }
                         onIonChange={ e => {
                           setTimeCache(e.detail.value!);
                           store.dispatch(setCurrentTime(e.detail.value!))
                         } }/>
          </IonItem>
        </IonContent>
      </IonPage>
  );
};

export default connect(mapStateToProps)(SettingsPage);