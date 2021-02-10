import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './ChartsPage.css';
import TotalIncomeRate from "./components/TotalIncomeRate";
import LiveIncome from "./components/LiveIncome";

const ChartsPage: React.FC = () => {
  return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Übersicht</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Übersicht</IonTitle>
            </IonToolbar>
          </IonHeader>
          <TotalIncomeRate/>
          <LiveIncome/>
        </IonContent>
      </IonPage>
  );
};

export default ChartsPage;
