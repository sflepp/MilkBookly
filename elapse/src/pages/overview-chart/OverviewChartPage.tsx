import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './OverviewChartPage.css';

const OverviewChartPage: React.FC = () => {
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
          <div>asdf</div>

        </IonContent>
      </IonPage>
  );
};

export default OverviewChartPage;
