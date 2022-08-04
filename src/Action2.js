import { useEffect, useState } from "react";
import "./App.css"
import up from "./uparrow.jpeg";
import down from "./downarrow.jpeg";

export default function User () {
    var [tbody, setTbody] = useState([]);  
    var [ascendingName, setAscendingName] = useState(down); 
    var [ascendingEmail, setAscendingEmail] = useState(down); 
   
    useEffect(() => {
        var users = require("./users.json");
        var allUsers = users.map( (user,k1) => {
            var serial = k1 + 1;
            var email = user["email"];
            var name = user["name"]["firstname"] +" "+ user["name"]["lastname"];
            var address = user["address"]["number"] + "," + user["address"]["street"];
    
            var row = [serial,name,email,address];
            return row;
        })
        setTbody(allUsers);
    },[])

    var sortName = () => {
        if (ascendingName === down){
            console.log("hi")
            setTbody(tbody.sort(function(a,b){
                return a[1].localeCompare(b[1]);
            }))
            setAscendingName(up)
        }
        else{
            setTbody(tbody.reverse(function(a,b){
                return a[1].localeCompare(b[1]);
            }))
            setAscendingName(down)
        }
    }

    var sortEmail = () => {
        if (ascendingEmail === down){
            setTbody(tbody.sort(function(a,b){
                return a[2].localeCompare(b[2]);
            }))
            setAscendingEmail(up)
        }
        else{
            setTbody(tbody.reverse(function(a,b){
                return a[2].localeCompare(b[2]);
            }))
            setAscendingEmail(down)
        }
    }

    var thead = ["Serial No.","Name (first name last name)","Email","Address(number, street)"].map((a,k1) => {
        if (a === "Name (first name last name)"){
            return <th key={k1}>{a} <button onClick={sortName}><img src={ascendingName} alt="Arrow keys"></img></button></th>
        }
        else if (a === "Email"){
            return <th key={k1}>{a} <button onClick={sortEmail}><img src={ascendingEmail} alt="Arrow keys"></img></button></th>
        }
        else { return <th key={k1}>{a}</th>}
    });

    return <table>
        <thead><tr>{thead}</tr></thead>
        <tbody>
                {
                    tbody.map((user,k2) => {
                        var row = user.map((a,k3) => <td key={k3}>{a}</td>);
                        return <tr key={k2}>{row}</tr>;
                    })
                }
        </tbody>
    </table>
}