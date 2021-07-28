import { COMMENT_ADD, COMMENT_DELETE } from "../types";
import { commentOrder } from "./currentOrderAction";

export const addComment = (data) => ({
  type: COMMENT_ADD,
  payload: data,
});

export const addCommentToOrder =
  (id, comment, userName) => async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3001/orders/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment, userName }),
      });
      const data = await response.json();
      dispatch(addComment(data.newComment));
      dispatch(commentOrder(data.updOrder));
    } catch (error) {
      console.log(error);
    }
  };

// export const deleteComment = () => ({
//   type: COMMENT_DELETE,
// });

// export const deleteCurrentComment = (commentId, id) => async (dispatch) => {
//   try {
//     const response = await fetch(
//       `http://localhost:3001/orders/${id}/comments`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ commentId }),
//       }
//     );
//     if (response.status === 200) {
//       dispatch(deleteComment());
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
