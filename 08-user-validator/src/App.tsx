import { useState } from "react";
import UserInput from "./components/UserInput";
import Popup from "./components/Popup";
import UserList from "./components/UserList";

interface data {
  name: string;
  age: string;
}

function App() {
  const [data, setData] = useState<data[]>([]);

  const [error, setError] = useState<string>("");

  const onData = (data: data) => {
    setData((prev) => {
      return [data, ...prev];
    });
  };

  const onError = (message: string) => {
    setError(() => message);
  };

  return (
    <>
      <UserInput onData={onData} onError={onError} />
      {error.length > 0 ? (
        <Popup message={error} onClose={() => setError("")} />
      ) : null}
      <UserList data={data} />
    </>
  );
}

export default App;
