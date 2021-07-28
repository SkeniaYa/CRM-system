import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/actions/order.action";
import { Link } from "react-router-dom";
import { ORDER_ADD } from "../../redux/types";
import { useState } from "react";
import "./AllOrders.css";
import { setDelStar } from "../../redux/actions/clients.action";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  whiteText: {
    color: "white",
  },
}));

export default function AllOrders() {
  const [arr, setArr] = useState([]);
  const classes = useStyles();
  const { values, error, loading } = useSelector((state) => state.orders);


  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    if (values?.length) {
      const tmp = values?.filter((el) => el.isDelete === false);
      console.log("TMP===>", tmp);
      setArr(tmp);
    }
  }, [values]);


  //============== SEARCH

  function translit(word) {
    var answer = "";
    var converter = {
      а: "a",
      б: "b",
      в: "v",
      г: "g",
      д: "d",
      е: "e",
      ё: "e",
      ж: "zh",
      з: "z",
      и: "i",
      й: "y",
      к: "k",
      л: "l",
      м: "m",
      н: "n",
      о: "o",
      п: "p",
      р: "r",
      с: "s",
      т: "t",
      у: "u",
      ф: "f",
      х: "h",
      ц: "c",
      ч: "ch",
      ш: "sh",
      щ: "sch",
      ь: "",
      ы: "y",
      ъ: "",
      э: "e",
      ю: "yu",
      я: "ya",

      А: "A",
      Б: "B",
      В: "V",
      Г: "G",
      Д: "D",
      Е: "E",
      Ё: "E",
      Ж: "Zh",
      З: "Z",
      И: "I",
      Й: "Y",
      К: "K",
      Л: "L",
      М: "M",
      Н: "N",
      О: "O",
      П: "P",
      Р: "R",
      С: "S",
      Т: "T",
      У: "U",
      Ф: "F",
      Х: "H",
      Ц: "C",
      Ч: "Ch",
      Ш: "Sh",
      Щ: "Sch",
      Ь: "",
      Ы: "Y",
      Ъ: "",
      Э: "E",
      Ю: "Yu",
      Я: "Ya",
    };

    for (var i = 0; i < word?.length; ++i) {
      if (converter[word[i]] == undefined) {
        answer += word[i];
      } else {
        answer += converter[word[i]];
      }
    }

    return answer;
  }

  let keyCl = ["number", "client", "status", "creator"];

  let filtredOrders = values;
  const [value, setValue] = useState("");
  if (value) {
    function helpMePlease(item) {
      for (let i = 0; i < keyCl.length; i++) {
        if (!item.hasOwnProperty(keyCl[i])) item[keyCl[i]] = "";
      }
      if (item?.number.toLowerCase().includes(value.toLowerCase().trim()))
        return true;
      if (item.client?.name?.toLowerCase().includes(value.toLowerCase().trim()))
        return true;
      if (
        item.client?.surname?.toLowerCase().includes(value.toLowerCase().trim())
      )
        return true;
      if (
        item.client?.patronymic
          ?.toLowerCase()
          .includes(value.toLowerCase().trim())
      )
        return true;
      if (item?.status.toLowerCase().includes(value.toLowerCase().trim()))
        return true;
      if (
        item?.creator?.name?.toLowerCase().includes(value.toLowerCase().trim())
      )
        return true;

      if (
        translit(item?.number.toLowerCase()).includes(
          value.toLowerCase().trim()
        )
      )
        return true;
      if (
        translit(item.client?.name?.toLowerCase()).includes(
          value.toLowerCase().trim()
        )
      )
        return true;
      if (
        translit(item.client?.surname?.toLowerCase()).includes(
          value.toLowerCase().trim()
        )
      )
        return true;
      if (
        translit(item.client?.patronymic?.toLowerCase()).includes(
          value.toLowerCase().trim()
        )
      )
        return true;
      if (
        translit(item?.status.toLowerCase()).includes(
          value.toLowerCase().trim()
        )
      )
        return true;
      if (
        translit(item?.creator?.name.toLowerCase()).includes(
          value.toLowerCase().trim()
        )
      )
        return true;
    }
    filtredOrders = values.filter(helpMePlease);
  }

  const clearInput = () => {
    setValue("");
  };

  return (
    <div className="allOrders">
      <div className="headerOrders">
        <h1>Все заказы</h1>
        <form onSubmit={() => clearInput()} className="search_form">
          <input
            onChange={(event) => setValue(event.target.value)}
            type="text"
            placeholder="Поиск заказа..."
            className="search_input"
          />
        </form>
      </div>
      {loading ? (
        <p>Загрузка...</p>
      ) : error ? (
        <p>Ошибка базы данных</p>
      ) : (
        <>
          {arr?.length === 0 ? (
            <p>Заказов нет</p>
          ) : (
            <ul className="ordersList">
              <div styles={{ flexGrow: 1 }}>
                <Grid container xs={20} spacing={8}>
                  <Grid container xs={20} item>
                    <Grid item xs={2}>
                      <h5 style={{ color: "white" }}>Номер</h5>
                    </Grid>
                    <Grid item xs={3}>
                      <h5 style={{ color: "white" }}>Клиент</h5>
                    </Grid>
                    <Grid item xs={2}>
                      <h5 style={{ color: "white" }}>Статус</h5>
                    </Grid>
                    <Grid item xs={4}>
                      <h5 style={{ color: "white" }}>
                        Ответственный сотрудник
                      </h5>
                    </Grid>
                    <hr />
                  </Grid>
                </Grid>
                {filtredOrders?.map((or) => (
                  <Link to={`/orders/${or._id}`} key={or._id}>
                    <Grid container xs={20} item>
                      <Grid item xs={2}>
                        <span class="orderItem">{or.number}</span>
                      </Grid>
                      <Grid item xs={3}>
                        <span class="orderItem">
                          {or.client?.surname}&nbsp;{or.client?.name}{" "}
                          {or.client?.patronymic}
                        </span>
                      </Grid>
                      <Grid item xs={2}>
                        <span class="orderItem">{or.status}</span>
                      </Grid>
                      <Grid item xs={4}>
                        <span class="orderItem">{or.creator?.name}</span>
                      </Grid>
                    </Grid>
                    <hr />
                  </Link>
                ))}
              </div>
            </ul>
          )}
        </>
      )}
    </div>
  );
}
