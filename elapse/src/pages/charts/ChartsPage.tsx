import { IonCard, IonCardContent, IonCol, IonContent, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './ChartsPage.css';
import Tip from "../wizard/components/Tip";
import TotalIncomeRate from "./components/TotalIncomeRate";

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
          <IonCard>
            <IonCardContent>
              <TotalIncomeRate/>
            </IonCardContent>
          </IonCard>

        </IonContent>
      </IonPage>
  );
};

export default ChartsPage;
