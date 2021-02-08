import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React from 'react';
import './SettingsPage.css';
import { connect } from "react-redux";
import { RootState } from "../../store/reducer";
import { SettingsState } from "../../store/settings/settings.state";
import { AllCurrencies } from "../../model/MonetaryAmount.model";
import store from "../../store";
import { setPreferredCurrency, setPreferredTimeFrame } from "../../store/settings/settings.actions";
import { AllTimeFrames, TimeFrameTranslations2 } from "../../model/TimeFrame.model";

const mapStateToProps = (state: RootState) => state.settings;

const SettingsPage: React.FC<SettingsState> = (props) => {
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

          <IonItem style={ { marginTop: '16px' } }>
            <IonLabel>Währung</IonLabel>
            <IonSelect value={ props.preferredCurrency }
                       interface="action-sheet"
                       onIonChange={ (e) => store.dispatch(setPreferredCurrency(e.detail.value)) }>
              { AllCurrencies.map(c => <IonSelectOption key={ c } value={ c }>{ c }</IonSelectOption>) }
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Favorisierte Einheit</IonLabel>
            <IonSelect value={ props.preferredTimeFrame }
                       interface="action-sheet"
                       onIonChange={ (e) => store.dispatch(setPreferredTimeFrame(e.detail.value)) }>
              { AllTimeFrames.map(c => <IonSelectOption key={ c } value={ c }>
                { props.preferredCurrency } pro { TimeFrameTranslations2[c] }
              </IonSelectOption>) }
            </IonSelect>
          </IonItem>

          <IonCard style={ { marginTop: '32px' } }>
            <IonCardHeader>
              <IonCardTitle>Trinkgeld ❤️</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Diese App ist kostenlos, verwendet kein Tracking und blendet keine
              Werbung ein. Das wird auch immer so bleiben.
              <br/><br/>
              Wenn dir diese App gefällt und sie dir etwas bringt, würde sich der Entwickler
              dieser App über ein kleines Trinkgeld freuen.

              <IonButton style={ { marginTop: '32px', width: '100%' } }
                         onClick={ () => alert('ToDo: InApp purchases') }>Trinkgeld geben️</IonButton>
            </IonCardContent>
          </IonCard>

        </IonContent>
      </IonPage>
  );
};

export default connect(mapStateToProps)(SettingsPage);