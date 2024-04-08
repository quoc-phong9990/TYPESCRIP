import ShowInfo from "./Showinfor";
import PersonType from "../interface/Pesiontype";

function ShowPeople(): JSX.Element {
    const people: PersonType[] = [
        { name: 'quoc phong1', age: 12, gt: true },
        { name: 'quoc phong2', age: 22, gt: false },
        { name: 'quoc phong3', age: 33, gt: true },
        { name: 'quoc phong4', age: 44, gt: false },
        { name: 'quoc phong5', age: 5, gt: true },
    ];

    return (
        <div>
            {people.map((person, index) => (
                <ShowInfo key={index} {...person} />
            ))}
        </div>
    );
}
export default ShowPeople