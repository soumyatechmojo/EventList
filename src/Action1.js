export default function Users () {
    const json = require("./users.json")
    var users = json.map((user,key) => <li key={key}>{user["username"]}</li>)

    return <ul>{users}</ul>
}