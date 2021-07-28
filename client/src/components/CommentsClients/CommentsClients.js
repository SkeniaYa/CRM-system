import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getComments } from "../../redux/actions/currentClient.action";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import { getDeleteComment } from "../../redux/actions/currentClient.action";

export default function CommentsClients() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { id } = useParams();

  const user = useSelector((state) => state.user);
  const userId = user?._id;
  const userName = user?.name;
  const items = useSelector((state) => state.currentClient);
  const comments = items?.comments;

  const authorId = items?._id;

  const onSubmit = (data) => {
    dispatch(getComments(data, id, userId, userName));
    reset();
  };

  const deleteHandler = (id) => {
    dispatch(getDeleteComment(id));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Ваш комментарий..."
        className="commentClientInput"
        {...register("comments")}
      ></input>
      <Button variant="contained" type="submit">
        Подтвердить
      </Button>
      <div className="commentsList">
        {comments?.map((el) => (
          <>
            <div className="oneComment">
              <div>
                {" "}
                <b>{el.body}</b>
              </div>
              <div>
                <i>
                  {el.author}, {el.date}
                </i>
              </div>

              <hr />
            </div>
            {userId === el.authorId && (
              <Button onClick={() => deleteHandler(el._id)} variant="contained">
                Удалить
              </Button>
            )}
          </>
        ))}
      </div>
    </form>
  );
}
