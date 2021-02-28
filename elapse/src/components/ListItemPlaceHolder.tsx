import { IonItem } from "@ionic/react"
import React, { FC } from "react"
import "./ListItemPlaceHolder.css"

interface Props {
  width: number
}

const ListItemPlaceHolder: FC<Props> = ({ width }) => {
  return <IonItem>
    <span className="list-item-placeholder" style={{width: width + '%' }}/>
  </IonItem>
}

export default ListItemPlaceHolder