import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GetFile = () => {
  const { filepath} = useParams();
  const [fileURL, setFileURL] = useState(null);
  console.log(fileURL)

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/files/get/${filepath}`)
      .then((response) => response.json())
      .then((data) => {
          setFileURL(data.url);
      })
      .catch((error) => {
       
        console.error(error);
      });
  }, [filepath]);

  return (
    <div>
      {fileURL ? (
        <a href={fileURL} download>
          Download File
        </a>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GetFile;



// import { useState } from "react";
// import { useParams, useSearchParams } from "react-router-dom";

// const GetFile = () => {
//   const{descrpfilePath}=useParams();
//   let [searchParams, setSearchParams] = useSearchParams();
//   return (
//     <div>
//       {/* <img src={`http://127.0.0.1:8000/files/get/${searchParams.get(
//         "filepath"
//       )}`} alt="" /> */}
//       <a
//         href={`http://127.0.0.1:8000/files/get/${searchParams.get(
//           "filepath"
//         )}`}
//         download
//       >
//         Get File
//       </a>
//     </div>
//   );
// };

// export default GetFile;