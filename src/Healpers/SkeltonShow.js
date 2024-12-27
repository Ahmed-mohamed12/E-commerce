import React from "react";
import Skeleton from "react-loading-skeleton";

export default function SkeltonShow(props) {
  const skeltonshow = Array.from({ length: props.length }).map((_,index) => (
    <div className= {props.classes} key={index}>
      <div className="mx-1">
        <Skeleton height={props.height} width={props.width}/>
      </div>
    </div>
  ));
  return <>{skeltonshow}</>;
}
// col-lg-1 col-md-6 col-12