import { useEffect } from "react";
import { useHistory } from "react-router";

export default function NotFound() {
  const history = useHistory();
  useEffect(() => {
    history.push("/login");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
