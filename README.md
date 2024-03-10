# about-javascript

## Learning

### Polling with requestAnimationFrame, WebSockets and Socket.io 
https://btholt.github.io/complete-intro-to-realtime/ 

### requestAnimationFrame
https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame


### Frontend Atomic Design
https://atomicdesign.bradfrost.com/chapter-2/#:~:text=Atoms%20are%20UI%20elements%20that,discrete%20sections%20of%20an%20interface.

![](https://atomicdesign.bradfrost.com/images/content/atomic-design-process.png)

### How browsers work?

https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work

### How does DNS Resolution works? 
https://www.cloudflare.com/learning/dns/what-is-dns/

- Navigation
  - DNS Lookup
    - Browser Cache
    - OS Cache
    - DNS Recursive Resolver
    - DNS Root Nameserver
    - DNS TLD Nameserver
    - Authoritative Nameserver
  - TCP Handshake - Three step process SYN, SYN-ACK, ACK
  - TLS Negotiation - 5 Steps in TLS 1.2 and 2 Steps in TLS 1.3
- Response
  - Browser sends initial GET Request and receives the response with response headers and content. Time here to first byte received here is called TTFB. - First load can not be more than 14KB.
  - Congestion Control (TCP Slow Start) - Response is broken into multiple TCP Packets and furthr into segments. For certain segments received, client sends ACK to the server. The number of transmitted segments are decided on the basis of network load and is called TCP Slow Start algorithm. Where the start is slow and is gradually increased basis on network bandwidth.
- Parsing - browser takes to turn the data into the DOM and CSSOM, to be used by the renderer to paint a page.
  - Building the DOM Tree - First step in CRP.
    - HTML Parsing - It involves tokenisation and tree construction. Tokens contains start/end tag attribute names and values. When parser finds non blocking resources like image and css it request for the resources and continue parsing. But script tag without async and defer blocks rendering and pause parsing. Preload scanner to the rescue.
    - Preload Scanner - While the browser builds the DOM tree, this process occupies the main thread and request for high-priority resources like CSS, JavaScript, and web fonts because of which we don't have to wait until the parser finds a reference to an external resource to request it.
  - Building the CSSOM tree - Second step in CRP - The CSS object model is similar to the DOM. CSSOM is generally less than the time it takes for one DNS lookup.
  - Javascript Compilation - JavaScript is parsed, compiled, and interpreted
    - Parsed into abstract syntax trees
    - Browser engines take the abstract syntax trees and pass them into a compiler, outputting bytecode.
    - Code is interpreted on the main thread. Exception web worker.
  - Building the accessibility tree - Accessibility object model (AOM) is like a semantic version of the DOM that assistive devices use to parse and interpret content.
- Render - Rendering steps include style, layout, paint, and in some cases compositing.
  - Style - Third step in CRP. - Combining the DOM and CSSOM into a render tree. Starts from the root travelling to each node. <Head /> elements with display: none; are not included. Each visible node has its CSSOM rules applied to it. The render tree holds all the visible nodes with content and computed styles 
  - Layout - Fourth step in CRP. Dimensions and location of all the nodes in the render tree are determined. The first time the size and position of each node is determined is called layout. Subsequent recalculations of are called reflows. 
  - Paint - Fifth and last step in CRP. Painting the individual nodes to the screen, the first occurrence of which is called the first meaningful paint. Painting can break the elements in the layout tree into layers. video, canvas, 3D Transform, opacity will instatiate a new layer.
  - Composting -Elements are drawn in different layers, overlapping each other, compositing ensures they are drawn to the screen in the right order and the content is rendered correctly. 
  - As the page continues to load assets, reflows can happen (image that arrived late and dimensions were not specified). A reflow sparks a repaint and a re-composite. 
- Interactivity - Once the main thread is done painting the pageand If the load includes JavaScript, the main thread might be busy, and not available for scrolling, touch, and other interactions. Time To Interactive being the point in time after the First Contentful Paint when the page responds to user interactions.


[![](https://cf-assets.www.cloudflare.com/slt3lc6tev37/3NOmAzkfPG8FTA8zLc7Li8/8efda230b212c0de2d3bbcb408507b1e/dns_record_request_sequence_recursive_resolver.png)](https://cf-assets.www.cloudflare.com/slt3lc6tev37/3NOmAzkfPG8FTA8zLc7Li8/8efda230b212c0de2d3bbcb408507b1e/dns_record_request_sequence_recursive_resolver.png)

### HTTP/2 -

- Prioritization - Once an HTTP message can be split into many individual frames, and we allow for frames from multiple streams to be multiplexed, the order in which the frames are interleaved and delivered both by the client and server becomes a critical performance consideration. To facilitate this, the HTTP/2 standard allows each stream to have an associated weight and dependency: Each stream may be assigned an integer weight between 1 and 256. Each stream may be given an explicit dependency on another stream.
- Multiplexing - The ability to break down an HTTP message into independent frames, interleave them, and then reassemble them on the other end is the single most important enhancement of HTTP/2. In fact, it introduces a ripple effect of numerous performance benefits across the entire stack of all web technologies, enabling us to: Interleave multiple requests in parallel without blocking on any one. Interleave multiple responses in parallel without blocking on any one. Use a single connection to deliver multiple requests and responses in parallel.
- Server Push -
  HTTP/2’s Server push vs. Server Sent Events (SSE)
  When I was first learning about HTTP/2 and SSE, I kept reading about “HTTP/2 server push” and I didn’t quite understand how these things related. Are they the same? Are they competing technologies? Can they be used together?
  Turns out, they are different. Server push is a way to send assets to a client before they ask. A common example would be a front-end that requests index.html. The server sends back this requested file, but instead of the browser parsing and requesting other resources in index.html, the server already knows what the client wants and “pushes” out the rest of the static assets — like style.css and bundle.js. Instead of 3 calls to the server for each of these assets, it’s done over one HTTP connection. Server push is taking advantage of the same underlying technology but the use case is slightly different.
- Header Compression (Using HPACK Compression by removing redundant bytes.)

https://web.dev/articles/performance-http2


## Frontend Monitoring

window.requestIdleCallback to be used to make sure callbacks are called during browser's idle periods.

| Common Fields | Source|
|--------|--------|
| Battery Details | navigator.getBattery |
| Browser and OS Details | navigator.userAgent |
| Device Type (Mobile or Not) | Navigator.userAgent |
| Current Location | navigator.geoLocation.getCurrentLocation() |
| Network Speed | navigator.connection.downlink |
| Network Type (slow-2g, 2g, 3g, or 4g) | navigator.connection.effectiveType |
| Page URL | window.location.href |
| Timestamp | new Date().toISOString() |

### API Log

By overriding open, send and setRequest Header methods of XMLHTTPRequest

And window.fetch method. Calculated fields are

- Header Lenght
- Body Length
- Method
- Response type
- Type (Success/ Failure)
- Error Code
- Error Message
- Endpoint
- Hostname

### JS Error

By window.addEventListener("error", handler) and using window.requestIdleCallback to do the processing of the error.

### Performance

Performance details like redirectEnd, domainLookupEnd, connectEnd, responseStart, domComplete, domeInteractive are fetched using performance API using `window.performance.getEntriesByType('navigation')[0]`

And then individual values are calculated by subtracting the previous values.

Everything is again performed in requireIdleCallback.

Times are calculated using `window.performance.now()`;