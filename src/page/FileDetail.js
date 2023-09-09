import React from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../Myfirebase";
import { useParams, useSearchParams } from "react-router-dom";

const FileDetail = () => {
  // query stirng -> ?키=값&키=값&키=값....
  const [searchParams, setsearchParams] = useSearchParams();
  const one = searchParams.get("one"); // searchParams는 키를 매개변수로 보내 전달받은 값을 사용할 수 있음
  const two = searchParams.get("two");
  const three = searchParams.get("three");
  console.log(one, two, three);
  const fileDown = async () => {
    try {
      const url = await getDownloadURL(ref(storage, `${one}/${two}/${three}`));

      // Create a temporary anchor element to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = `${three}`; // Specify the file name you want to use
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  return (
    <div>
      <button onClick={fileDown}>sdaf</button>
    </div>
  );
};

export default FileDetail;
