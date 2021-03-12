import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Forwarder = () => {
  const history = useHistory();
  useEffect(() => {
    history.push("/framework");
  });
  return null;
};

export default Forwarder;