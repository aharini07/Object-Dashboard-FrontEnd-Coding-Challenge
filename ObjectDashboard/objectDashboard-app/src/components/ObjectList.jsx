import axios from "axios"

function ObjectList({ objects, onObjectDeleted }) {

    const apiUrl = 'https://api.restful-api.dev/objects'

    const deleteObject = async (id) => {
    try {
        await axios.delete(`${apiUrl}/${id}`, {
            headers: {
                "x-api-key": "5a5c26c1-91ba-4d11-84b9-96119d9cbe2f" // Add the key here as well
            }
        })
        onObjectDeleted(id)
    } catch (err) {
        console.log(err)
        alert("Unable to delete object.")
    }
}

    const getField = (data, possibleKeys) => {
        if (!data) return null
        const keys = Object.keys(data)
        for (const pk of possibleKeys) {
            const found = keys.find(k => k.toLowerCase() === pk.toLowerCase())
            if (found) return data[found]
        }
        return null
    }

    if (!objects || objects.length === 0) {
        return <p className="text-muted">No objects to display.</p>
    }

    return (
        <div className="row">
            {objects.map((o) => {
                const color = getField(o.data, ['color', 'Color'])
                const price = getField(o.data, ['price', 'Price'])
                const cpu = getField(o.data, ['cpu', 'CPU', 'CPU model', 'Cpu'])

                return (
                    <div className="col-12 col-sm-6 col-md-4 mb-4" key={o.id}>
                        <div className="card h-100">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{o.name ?? "Unnamed Object"}</h5>
                                <h6 className="card-subtitle mb-2 text-body-secondary">
                                    {color ?? "No color"}
                                </h6>
                                <p className="card-text">
                                    Price: {price !== null && price !== undefined ? `Rs.${price}` : "N/A"}<br />
                                    CPU: {cpu ?? "N/A"}
                                </p>
                                <button
                                    className="btn btn-outline-danger btn-sm mt-auto"
                                    onClick={() => deleteObject(o.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ObjectList