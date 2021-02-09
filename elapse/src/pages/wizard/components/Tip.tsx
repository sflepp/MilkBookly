import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/react";
import React from "react";

const Tip: React.FC = () => {
  return <IonCard style={ { marginTop: '32px' } }>
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
}

export default Tip
