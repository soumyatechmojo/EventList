import { useEffect, useState } from "react";
import "./App.css"
import up from "./uparrow.jpeg";
import down from "./downarrow.jpeg";

export default function Products () {
    var [tbody, setTbody] = useState([]);  
    var [ascendingTitle, setAscendingTitle] = useState(down); 
    var [ascendingCat, setAscendingCat] = useState(down); 
    
    var products = require("./products.json");
    var allProducts = products.map((product) => {
        var [title,category,price] = [product["title"],product["category"],product["price"]];
        var rating = product["rating"]["rate"];
        var row = [title,category,price,rating];
        return row;
    })

    useEffect(() => {
        var products = require("./products.json");
        var allProducts = products.map((product) => {
            var [title,category,price] = [product["title"],product["category"],product["price"]];
            var rating = product["rating"]["rate"];
            var row = [title,category,price,rating];
            return row;
        })
        setTbody(allProducts);
    },[])

    var filterTitle = (e) => {
        var fil = allProducts.filter((a) => a[0].toLowerCase().startsWith(e.target.value))
        setTbody(fil)
    }

    var filterCategory = (e) => {
        var filC = allProducts.filter((a) => a[1].toLowerCase().startsWith(e.target.value))
        setTbody(filC)     
    }

    var print = () => {
        tbody.map((a) => console.log(a[0]))
    }

    var sortTitle = () => {
        if (ascendingTitle === down){
            setTbody(tbody.sort(function(a,b){
                return a[0].localeCompare(b[0]);
            }))
            setAscendingTitle(up)
        }
        else{
            setTbody(tbody.reverse(function(a,b){
                return a[0].localeCompare(b[0]);
            }))
            setAscendingTitle(down)
        }
    }

    var sortCat = () => {
        if (ascendingCat === down){
            setTbody(tbody.sort(function(a,b){
                return a[1].localeCompare(b[1]);
            }))
            setAscendingCat(up)
        }
        else{
            setTbody(tbody.reverse(function(a,b){
                return a[1].localeCompare(b[1]);
            }))
            setAscendingCat(down)
        }
    }

    var thead = ["Product title","Category","Price","Rating"].map((a,k1) => {
        if (a === "Product title"){
            return <th key={k1}>{a} <button onClick={sortTitle}><img src={ascendingTitle} alt="Arrow keys"></img></button></th>
        }
        else if (a === "Category"){
            return <th key={k1}>{a} <button onClick={sortCat}><img src={ascendingCat} alt="Arrow keys"></img></button></th>
        }
        else { return <th key={k1}>{a}</th>}
    });

    return (
        <>
        <input onChange={filterTitle} placeholder="Enter Title"></input>
        <input onChange={filterCategory} placeholder="Enter Category"></input>
        <button onClick={print} type="submit">Submit</button>
            <table>
                <thead><tr>{thead}</tr></thead>
                <tbody>
                    {
                        tbody.map((product,k2) => {
                            var row = product.map((a,k3) => <td key={k3}>{a}</td>);
                            return <tr key={k2}>{row}</tr>;
                        })
                    }
                </tbody>
            </table>
        </>
    )
}