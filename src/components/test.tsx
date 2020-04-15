import  React, { useState,useRef } from 'react';

export interface testProps {
  name : String,
  age : number,
  sex?: string
}

// const TestComponent = ({ name, age ,sex }: testProps) => {
//   const [state,setState] = useState<number | null>(5);
//   return(
//     <>
//      <p>the name is {name}</p>
//      <p>the age is {age}</p>
     
//     </>
//   )

// }

 const TestComponent : React.FC<testProps> = ({name,age,sex}) => {
  const [state,setState] = useState<number | null>(5);
  const testRef = useRef<HTMLDivElement >(null);

 return(
   <div ref={ testRef } >
    <p>the name is { name }</p>
    <p>the age is { age }</p>
   </div>
 )
}

export default TestComponent;

// import * as React from 'react';

// export interface testProps {
//   name : String,
//   age : number,
//   sex?: string
// }


// export default class testComponent extends React.Component<testProps,object>{
// render(){
//   return(
//     <>
//      <p>the name is {this.props.name}</p>
//      <p>the age is {this.props.age}</p>
       
//     </>
//   )
// }
// }