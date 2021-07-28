import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClients } from "../../redux/actions/clients.action";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./AllClients.css";
import Star from "./Star";
import { setDelStar } from "../../redux/actions/clients.action";
import { setAddStar } from "../../redux/actions/clients.action";

import SearchIcon from '@material-ui/icons/Search';

export default function AllClients() {
  const {
    values: clients,
    error,
    loading,
  } = useSelector((state) => state.clients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  //================== SEARCH

  let keyCl = ["surname", "patronymic", "email", "phone", "address", "addstar"];

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

    for (var i = 0; i < word.length; ++i) {
      if (converter[word[i]] == undefined) {
        answer += word[i];
      } else {
        answer += converter[word[i]];
      }
    }

    return answer;
  }

  let filtredClients = clients;
  const [value, setValue] = useState("");
  if (value) {
    function helpMePlease(item) {
      for (let i = 0; i < keyCl.length; i++) {
        if (!item.hasOwnProperty(keyCl[i])) item[keyCl[i]] = "";
      }
      if (item.name.toLowerCase().includes(value.toLowerCase().trim()))
        return true;
      if (item.surname.toLowerCase().includes(value.toLowerCase().trim()))
        return true;
      if (item.patronymic.toLowerCase().includes(value.toLowerCase().trim()))
        return true;
      if (item.email.toLowerCase().includes(value.toLowerCase().trim()))
        return true;
      if (item.phone.toLowerCase().includes(value.toLowerCase().trim()))
        return true;

      if (
        translit(item.name.toLowerCase()).includes(value.toLowerCase().trim())
      )
        return true;
      if (
        translit(item.surname.toLowerCase()).includes(
          value.toLowerCase().trim()
        )
      )
        return true;
      if (
        translit(item.patronymic.toLowerCase()).includes(
          value.toLowerCase().trim()
        )
      )
        return true;
      if (
        translit(item.email.toLowerCase()).includes(value.toLowerCase().trim())
      )
        return true;
      if (
        translit(item.phone.toLowerCase()).includes(value.toLowerCase().trim())
      )
        return true;
    }
    filtredClients = clients.filter(helpMePlease);
  }

  const clearInput = () => {
    //e.preventDefault()
    setValue("");
  };

  //============== STARS

  const currUser = useSelector((state) => state.user?._id);

  let num;
  let clientId;
  let clientStarArr;

  const converterStars = (client) => {
    clientId = client?._id;
    clientStarArr = client.addstar;
    if (clientStarArr.length) {
      if (client.addstar.includes(currUser)) {
        num = clientStarArr.indexOf(currUser);
        clientStarArr.splice(num, 1);
        console.log("зашли на удаление");
        //     fetch('http://localhost:3001/clients/stardell', {
        //   method: "PATCH",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ clientId, currUser }),
        // }).then
        dispatch(setDelStar(client, currUser));
        return true;
      }
      clientStarArr.push(clientId);
      //   fetch('http://localhost:3001/clients/staradd', {
      //   method: "PATCH",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ clientId, currUser }),
      // }).then(() =>
      dispatch(setAddStar(client, currUser));
      return true;
    }
    clientStarArr.push(clientId);
    //   fetch('http://localhost:3001/clients/staradd', {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ clientId, currUser }),
    // }).then(() =>
    dispatch(setAddStar(client, currUser));
    return true;
  };

  function check(client) {
    if (client.addstar.length) {
      if (client.addstar.includes(currUser)) return true;
      return false;
    }
    return false;
  }

  return (
    <div className="allClients">
      <div className="conteiner">
      <h1 className="title-client">Наши клиенты</h1>
      <form onSubmit={() => clearInput()} className="search_form">
        <input
          onChange={(event) => setValue(event.target.value)}
          type="text"
          placeholder="🔎&nbsp;&nbsp; Поиск здесь..."
          className="search_input"
          
        />
      </form>
      {loading ? (
        <p>Загрузка...</p>
      ) : error ? (
        <p>Ошибка базы данных</p>
      ) : (
        <>
          {clients.length === 0 ? (
            <p>Клиентов нет</p>
          ) : (
            <ul className="clientsList">
              {filtredClients?.map((cl) => (
                <li style={{ position: "relative" }}>
                  <span className="descr">Подробнее</span>
                  <Star cl={cl} converterStars={converterStars} check={check} />
                  <Link key={cl._id} to={`/clients/client/${cl._id}`}>
                    <div className="clientsItem">
                      <div className="image">
                        <img
                          src="/profile.png"
                          alt=""
                          style={{ width: 200, height: 200 }}
                        />
                      </div>
                      <div className="clientsInfo">
                        ФИО:&nbsp;
                        {cl.surname}&nbsp;{cl.name}
                        <br /> {cl.patronymic}
                        <br />
                        email:&nbsp;{cl.email}
                        <br />
                        Номер:&nbsp;{cl.phone}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
      </div>
  );
}
