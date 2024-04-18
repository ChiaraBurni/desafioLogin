const cards = document.querySelectorAll('.cardCart')
let total = 0
const cid = "65fb791d402eeb46629002ea"

cards.forEach(card => {
  const price = parseInt(card.querySelector(".price").innerHTML)
  const quantity = card.querySelector(".quantity")
  // const quantityValue = quantity.value
  const subTotal = card.querySelector(".subTotal")
  const dlt = card.querySelector(".delete")
  const _id = card.id

  const updateSubtotal = () => {
    const quantityValue = parseInt(quantity.value);
    const subtotalValue = price * quantityValue;
    subTotal.innerHTML = subtotalValue;
    return subtotalValue;
  }

  quantity.addEventListener("change", () => {
    const subtotalValue = updateSubtotal();
    total = [...cards].reduce((acc, card) => acc + parseInt(card.querySelector(".subTotal").innerHTML), 0);
    document.getElementById("total").innerHTML = `Total: $${total}`;

    fetch(`/api/carts/${cid}/product/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        quantity: parseInt(quantity.value)
      })
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
          title: "Error!",
          icon: "error",
          text: `${e.error}`,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3500
        })
      })
  })

  dlt.addEventListener("click", () => {
    fetch(`/api/carts/${cid}/product/${_id}`, {
      method: "DELETE",
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
          setTimeout(() => {
            location.reload()
          }, 500)
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
          title: "Error!",
          icon: "error",
          text: `${e.error}`,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3500
        })
      })
  })

  total += updateSubtotal()
})

document.getElementById("total").innerHTML = `Total: $${total}`