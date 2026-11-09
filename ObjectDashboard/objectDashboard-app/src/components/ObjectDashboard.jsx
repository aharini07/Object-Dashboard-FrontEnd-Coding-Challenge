import axios from "axios";
import { useEffect, useState } from "react"
import ObjectList from "./ObjectList"
import ObjectAdd from "./ObjectAdd"

function ObjectsDashboard() {
    const apiUrl = 'https://api.restful-api.dev/objects';
    const [allObjects, setAllObjects] = useState([])
    const [objects, setObjects] = useState([]) 
    const [totalPages, setTotalPages] = useState(0)
    const [totalRecords, setTotalRecords] = useState(0)
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)
    const [currentPageSize, setCurrentPageSize] = useState(0)
    
    const [loading, setLoading] = useState(false)
    const [errMsg, setErrMsg] = useState("")

    const getObjectsData = async () => {
        setLoading(true)
        setErrMsg("")
        try {
            const response = await axios.get(apiUrl,{
                headers:{
                    "x-api-key" : "5a5c26c1-91ba-4d11-84b9-96119d9cbe2f"
                }
            })
            setAllObjects(response.data) 
        } catch (err) {
            console.log(err)
            setErrMsg("Unable to load objects")
        }
        setLoading(false)
    }
    useEffect(() => {
        getObjectsData()
    }, [])

    
    useEffect(() => {
        setTotalPages(Math.ceil(allObjects.length / size))
        setTotalRecords(allObjects.length)
        
        const startIndex = page * size
        const pagedData = allObjects.slice(startIndex, startIndex + size)
        
        setObjects(pagedData)
        setCurrentPageSize(pagedData.length)
    }, [allObjects, page, size])

    
    const onObjectAdded = (newObject) => {
        
        let temp = [newObject, ...allObjects]
        setAllObjects(temp)
        setPage(0)
    }

    
    const onObjectDeleted = (id) => {
        let temp = allObjects.filter(o => o.id !== id)
        setAllObjects(temp)
    }
    
    const onPageChange = (val) => {
        setPage(val)
    }

    return (
        <div className="container py-4">
            <h1 className="h3 fw-bold text-dark mb-4">Objects Dashboard</h1>

            {errMsg && (
                <p style={{ color: 'red', fontSize: '1.2rem' }}>{errMsg}</p>
            )}

            
            <ObjectAdd onObjectAdded={onObjectAdded} />

           
            {loading ? (
                <p className="text-muted">Loading objects...</p>
            ) : (
                <ObjectList
                    objects={objects}
                    onObjectDeleted={onObjectDeleted}
                />
            )}

           
            <nav aria-label="Page navigation example" style={{ "alignContent": 'center' }}>
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <button className="page-link" onClick={() => setPage(page - 1)} 
                            disabled={page === 0}>Previous</button>
                    </li>

                    {
                    Array.from({ length: totalPages }, (e, index) => (
                        <li key={index} className="page-item">
                            <button className="page-link" onClick={() => onPageChange(index)}>{index + 1}</button>
                        </li>
                    ))}

                    <li className="page-item">
                        <button className="page-link" onClick={() => setPage(page + 1)}
                            disabled={page === (totalPages - 1)} >Next</button>
                    </li>
                </ul>
                
                <p>{`Page ${page + 1} of ${totalPages} total pages`}</p>
                <p>{`Showing ${currentPageSize} records from total ${totalRecords} records`}</p>
            </nav>
        </div>
    )
}

export default ObjectsDashboard