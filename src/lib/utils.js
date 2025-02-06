// export function handleErrorResponse(status, message) {
//   return new Response(JSON.stringify({ error: message }), {
//     status,
//     headers: { "Content-Type": "application/json" },
//   });
// }


// handleErrorResponse.js

export function handleErrorResponse(status, message, customHeaders = {}) {
  const defaultHeaders = {
    "Content-Type": "application/json",
    ...customHeaders, // Merge custom headers (like CORS headers)
  };

  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: defaultHeaders,
  });
}
