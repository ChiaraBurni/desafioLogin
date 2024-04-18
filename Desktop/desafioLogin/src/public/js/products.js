const cid = "65fb791d402eeb46629002ea"
const cards = document.querySelectorAll('.card')

cards.forEach(card => {
  const _id = card.id
  const addCart = card.querySelector(".addCart")
  addCart.addEventListener("click", () => {
    fetch(`/api/carts/${cid}/product/${_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          Swal.fire({
            title: "Success!",
            text: `${data.message}`,
            icon: "success",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3500
          })
        } else if (data.status === "error") {
          Swal.fire({
            title: "Error!",
            text: `${data.message}`,
            icon: "error",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3500
          })
        }
      })
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: `${e.error}`,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3500
        })
      })
  })
})




