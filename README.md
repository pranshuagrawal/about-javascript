# about-javascript

## Learning

To learn about Polling, Polling with requestAnimationFrame, WebSockets and Socket.io reach out to https://btholt.github.io/complete-intro-to-realtime/ these are the coursenotes from frontend masters

requestAnimationFrame - https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

How browsers work? What happens when you enter a URL in Browser's address bar - https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work

HTTP/2 -
 - Prioritization - Once an HTTP message can be split into many individual frames, and we allow for frames from multiple streams to be multiplexed, the order in which the frames are interleaved and delivered both by the client and server becomes a critical performance consideration. To facilitate this, the HTTP/2 standard allows each stream to have an associated weight and dependency: Each stream may be assigned an integer weight between 1 and 256. Each stream may be given an explicit dependency on another stream.
 - Multiplexing - The ability to break down an HTTP message into independent frames, interleave them, and then reassemble them on the other end is the single most important enhancement of HTTP/2. In fact, it introduces a ripple effect of numerous performance benefits across the entire stack of all web technologies, enabling us to: Interleave multiple requests in parallel without blocking on any one. Interleave multiple responses in parallel without blocking on any one. Use a single connection to deliver multiple requests and responses in parallel.
 - Server Push
 - Header Compression (Using HPACK Compression by removing redundant bytes.)

   
https://web.dev/articles/performance-http2
