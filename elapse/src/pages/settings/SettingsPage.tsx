import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
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
import { AllTimeFrames, TimeFrame, TimeFrameTranslations2 } from "../../model/TimeFrame.model";

interface Props {
  showWizard: boolean,
  showTip: boolean,
  preferredCurrency: Currency,
  preferredTimeFrame: TimeFrame
}

const mapStateToProps = (state: RootState) => {
  return {
    showWizard: state.settings.showWizard,
    showTip: state.settings.showTip,
    preferredCurrency: state.settings.preferredCurrency,
    preferredTimeFrame: state.settings.preferredTimeFrame
  }
}

const SettingsPage: React.FC<Props> = (props) => {
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
            <IonSelect value={ props.preferredTimeFrame }
                       interface="action-sheet"
                       onIonChange={ (e) => store.dispatch(setPreferredTimeFrame(e.detail.value)) }>
              { AllTimeFrames.map(c => <IonSelectOption key={ c } value={ c }>
                { TimeFrameTranslations2[c] }
              </IonSelectOption>) }
            </IonSelect>
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

        </IonContent>
      </IonPage>
  );
};

export default connect(mapStateToProps)(SettingsPage);