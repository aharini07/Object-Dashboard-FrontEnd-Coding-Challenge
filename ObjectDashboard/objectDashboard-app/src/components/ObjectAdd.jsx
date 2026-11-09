import { useState } from "react"
import axios from "axios"

function ObjectAdd({ onObjectAdded }) {
    const [name, setName] = useState("")
    const [year, setYear] = useState("")
    const [price, setPrice] = useState("")
    const [cpu, setCpu] = useState("")
    const [color, setColor] = useState("")
    const [errMsg, setErrMsg] = useState("")

    const apiUrl = 'https://api.restful-api.dev/objects'

    const addObject = async () => {
        let objectObj = {
            'name': name,
            'data': {
                'Year': year !== "" ? Number(year) : null,
                'Price': price !== "" ? Number(price) : null,
                'CPU': cpu !== "" ? cpu : null,
                'Color': color !== "" ? color : null
            }
        }
        try {
            
            const response = await axios.post(
                apiUrl, 
                objectObj, 
                {
                    headers: {
                        "x-api-key": "5a5c26c1-91ba-4d11-84b9-96119d9cbe2f" 
                    }
                }
            )
            console.log(`APIs response after saving obj: ${JSON.stringify(response.data)}`)

            onObjectAdded(response.data)

            // reset form
            setName("")
            setYear("")
            setPrice("")
            setCpu("")
            setColor("")
        }
        catch (err) {
            console.log(err?.response?.data)
            setErrMsg(err?.response?.data?.message || "Unable to add object")
        }
    }

    return (
        <div className="card mt-2 mb-4">
            <div className="card-header">
                <h5 className="mb-0">Add New Object</h5>
            </div>
            <div className="card-body">
                {errMsg && (
                    <p style={{ color: 'red', fontSize: '1.2rem' }}>{errMsg}</p>
                )}

                <div className="row">
                    <div className="col-12 col-md-6 mb-3">
                        <label>Name</label>
                        <input type="text" className="form-control" value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <label>Year</label>
                        <input type="number" className="form-control" value={year}
                            onChange={(e) => setYear(e.target.value)} />
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <label>Price</label>
                        <input type="number" step="0.01" className="form-control" value={price}
                            onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <label>CPU</label>
                        <input type="text" className="form-control" value={cpu}
                            onChange={(e) => setCpu(e.target.value)} />
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <label>Color</label>
                        <input type="text" className="form-control" value={color}
                            onChange={(e) => setColor(e.target.value)} />
                    </div>
                </div>

                <button type="button" className="btn btn-primary" onClick={() => addObject()}>
                    + Add Object
                </button>
            </div>
        </div>
    )
}

export default ObjectAdd