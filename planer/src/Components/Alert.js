import { React, useState} from "react";
import { AiFillAlert } from "react-icons/ai";
export default function Alert(props){
        let alertColor;
        if(props.alertProps.type == 'success'){
            alertColor = '#397a2f';
        }else if (props.alertProps.type == 'error'){
            alertColor = '#c2352b';
        }
        return(
            <div id={'alert-'+props.alertProps.id} className="message-alert" style={{backgroundColor: alertColor}}>
        <AiFillAlert/>
        <p>{props.alertProps.messageTxt}</p>
      </div>
        )
}