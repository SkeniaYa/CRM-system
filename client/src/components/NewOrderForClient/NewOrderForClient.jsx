import OrderAdd from "../OrderAdd/OrderAdd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function NewOrderForClient() {
  const clientsArray = useSelector((state) => state.clients.values);
  const { id } = useParams();
  const tmpClient = clientsArray?.filter((el) => el?._id == id);
  const client = tmpClient[0];
  return <OrderAdd client={client} id={id} />;
}
