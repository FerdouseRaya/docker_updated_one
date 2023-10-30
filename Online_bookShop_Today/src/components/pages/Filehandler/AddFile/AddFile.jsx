import { useState } from "react";
//import "./AddFile.scss"
import { useLocation, useParams, useNavigate } from "react-router-dom";

const AddFile = () => {
    const [file, setFile] = useState(null);
    const [res, setRes] = useState({ message: "", success: false, loading: false })
    const { bookId } = useParams();
    console.log(bookId);
    const handleSubmit = () => {
        console.log("Upload button clicked");
        setRes({ message: "", success: false, loading: true })

        const formData = new FormData();
        formData.append("file_to_upload", file[0]);
        formData.append("bookId", bookId);
        console.log(formData)
        fetch(`http://127.0.0.1:8000/files/upload-file`, {
            method: "POST",
            body: formData,
        }).then((response) => response.json()).then(json => {
            if (json.success) {
                setRes({ message: json.message, success: true, loading: false })
            } else {
                setRes({ message: "Failed to upload file", success: false, loading: false })

            }
        }).catch(err => {
            setRes({ message: "Failed to upload file", success: false, loading: false })
        });
    };

    return (
        <div className="add-file-container">
            <input
                type="file"
                name="file_to_upload" 
                onChange={(e) => setFile(e.target.files)}
            />
            <button
                onClick={handleSubmit}
            >
                Upload
            </button>
            {res.message && res.message !== "" ? <div className={`message ${res.success ? "success" : "error"}`}>{res.message}</div> : null}
        </div>
    );
};

export default AddFile;