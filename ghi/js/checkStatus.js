// Get the cookie out of the cookie store
const payloadCookie = await cookieStore.get("jwt_access_payload")
// console.log(payloadCookie)
if (payloadCookie) {
  // The cookie value is a JSON-formatted string, so parse it
  // console.log(payloadCookie.value)
  // const encodedPayload = JSON.parse(payloadCookie.value);
  const encodedPayload = payloadCookie.value;
  // console.log(encodedPayload)

  // Convert the encoded payload from base64 to normal string
  const decodedPayload = atob(encodedPayload)

  // The payload is a JSON-formatted string, so parse it
  const payload = JSON.parse(decodedPayload)

  // Print the payload
  // console.log(payload)

  // Check if "events.add_conference" is in the permissions.
  // If it is, remove 'd-none' from the link
  const permissions = payload.user.perms
  if (permissions.includes("events.add_conference")) {
    const addConference = document.getElementById("addConference")
    addConference.classList.remove("d-none")

  }

  // Check if "events.add_location" is in the permissions.
  // If it is, remove 'd-none' from the link
  if (permissions.includes("events.add_location")) {
    const addLocation = document.getElementById("addLocation")
    addLocation.classList.remove("d-none")

}

  if (permissions.includes("presentations.add_presentation")) {
    const addPresentation = document.getElementById("addPresentation")
    addPresentation.classList.remove("d-none")
  }}
