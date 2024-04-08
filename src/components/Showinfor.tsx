import PersonType from "../interface/Pesiontype";


function ShowInfo(props: PersonType): JSX.Element {
    return (
      <div className="hi">
        <h1> {`My Name:`} { props.name}  </h1>
        <h1>{'My Age:'}{props.age}</h1>
        <h1>{'my gioi tinh:'}  {props.gt ? 'Nam' : 'Nữ'}</h1>
      </div>
    );
  }



  export default ShowInfo;