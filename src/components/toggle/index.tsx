import React, { useState, useEffect } from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ToggleChildren from "./toggleChildren";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { User } from "../../data/formatData"
import "./index.css"

import { useSelector } from "react-redux";

interface Props {
    dataProp: any;
    label: string;
    children: any;
    userID: string;
    index: number;
}

const Toggle: React.FC<Props> = ({label, children, userID, dataProp}) => {
    const checked = JSON.parse(localStorage.getItem(userID) as string) || false;

    const Det = useSelector((determinated: {clicked: boolean}) => determinated.clicked)

    let localDet = true

    if (JSON.parse(localStorage.getItem("Determinated" + userID) as string) !== null) {
        localDet = JSON.parse(localStorage.getItem("Determinated" + userID) as string)
    }

    let newData = children.filter((elt: any) => elt.id === userID)[0];
    const [check, setCheck] = useState(checked);
    const [rotated, setRotate] = useState(true);
    const [determinated, setDeterminated] = useState(localDet)

    const handleChange = () => {
        localStorage.removeItem("Determinated" + userID)
        localStorage.setItem(userID, JSON.stringify(!check));
        setCheck(!check)
        allChildren.forEach((theChildren: any) => {
            theChildren.isChecked = check;
            localStorage.setItem(theChildren.id, JSON.stringify(!theChildren.isChecked));
        })
    };

    const handleRotate = () => {
        setRotate(!rotated);
    };

    let theToggle = newData;

    theToggle.children.forEach((theChildren: any) => {
        theChildren["father"] = theToggle["id"]
        theChildren["isChecked"] = JSON.parse(localStorage.getItem(theChildren.id) as string) || false;
    })
    let allChildren = [...theToggle.children]

    useEffect(() => {
        allChildren.forEach((theChildren: any) => {
            theChildren.isChecked = check;
        })
    }, [check])

    useEffect(() => {
        setDeterminated(localDet)
    }, [Det])

    return (
        <div className="LabelControl">
            <div className="LabelControlIn"  >
                <FormControlLabel
                    control= {determinated ? (
                        <Checkbox
                            checked={check}
                            onChange={handleChange}
                            color="primary"
                        />
                    ) : (
                        <Checkbox
                            checked={true}
                            onChange={() => {
                                setDeterminated(true)
                                handleChange()
                            }}
                            indeterminate
                            color="primary"
                        />
                    )}
                    label={label}

                />
                {newData.children.length > 0 && <ExpandLessIcon  onClick={handleRotate} className={rotated ? "ArrowIcon" : "ArrowIconRot"}/>}
            </div>

            {!rotated && allChildren.map((elt: User, index: number) => <ToggleChildren key={index} action={true} newData={dataProp} fatherID={elt.father} childrenList={allChildren} isChecked={elt.isChecked} label={elt.name} children={elt.children} userID={elt.id} TChildren={ToggleChildren}/>)}
        </div>

    )
};

export default Toggle;
