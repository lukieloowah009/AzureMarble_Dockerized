import React, {useState} from 'react';
import ParticlesBg from "particles-bg";

export default function BgToggle(props) {

    if (props.toggle === false) {
        return (
            <ParticlesBg type="cobweb" bg={true}/>
        )
    } else {
        return null;
    }
}
