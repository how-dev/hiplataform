import React, { useState, useEffect } from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import { useDispatch } from "react-redux";
import { changeDetThunk } from "../../../store/modules/clicked/thunk";

import "./index.css"

interface Props {
    label: string;
    children: any;
    TChildren: any;
    isChecked: boolean;
    userID: string;
    childrenList: any;
    action: boolean;
    newData: any;
    fatherID: string;
}

const ToggleChildren: React.FC<Props> = ({action, newData, childrenList, label, children,  TChildren, isChecked, userID, fatherID}) => {

    let dataChildren = Object.values(children);
    const dispatch = useDispatch();

    const [check, setCheck] = useState(JSON.parse(localStorage.getItem(userID) as string));
    const [rotated, setRotate] = useState(true);
    const [determinated, setDeterminated] = useState(action);

    childrenList = Object.values(childrenList)
    let myChildrens = childrenList.filter((elt: any) => elt.id === userID)[0].children
    let me = childrenList.filter((elt: any) => elt.id === userID)[0]

    let myFather: any = undefined;
    if (newData) {
        myFather = newData.filter((elt: any) => elt.id === me.father)[0]
    }
    myChildrens = Object.values(myChildrens)
    const handleChange = () => {
        setCheck(!check)
        localStorage.removeItem("Determinated" + userID)
        localStorage.setItem(userID, JSON.stringify(!check))
        myChildrens.forEach((elt: any) => {
            elt.isChecked = check;
            localStorage.setItem(elt.id, JSON.stringify(!check));
        })

        let amountChildren = childrenList.length;
        let amountChildrenChecked = childrenList.filter((elt: any) => JSON.parse(localStorage.getItem(elt.id) as string)).length;
        myFather && localStorage.setItem("Determinated" + myFather.id, JSON.stringify(!(amountChildrenChecked >= 1 && amountChildrenChecked < amountChildren && amountChildrenChecked !== 0 &&amountChildrenChecked < amountChildren)));

    };
    const handleRotate = () => {
        console.log(JSON.parse(localStorage.getItem(userID) as string))
        setRotate(!rotated)
    }

    useEffect(() => {

        myChildrens.forEach((elt: any) => {
            elt.isChecked = isChecked;
            localStorage.setItem(elt.id, JSON.stringify(isChecked));
        })

        setCheck(isChecked)
    }, [isChecked])

    let click = JSON.parse(localStorage.getItem(userID) as string)
    useEffect(() => {
        dispatch(changeDetThunk(click))
    }, [click])


    return (
        <div className="LabelControlChildren" >
            <div className="LabelControlInChildren">
                <FormControlLabel
                    control= { determinated ? (
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
                            color="primary"
                            indeterminate
                        />
                    )}

                    label={label}

                />
                {dataChildren.length > 0 && <ExpandLessIcon  onClick={handleRotate} className={rotated ? "ArrowIcon" : "ArrowIconRot"}/>}
            </div>

            {!rotated && dataChildren.map((elt: any, index: number) => <TChildren key={index} action={true} fatherID={userID} childrenList={myChildrens} label={elt.name} children={elt.children} TChildren={TChildren} isChecked={check} userID={elt.id}/>)}
        </div>

    )
};

export default ToggleChildren;
