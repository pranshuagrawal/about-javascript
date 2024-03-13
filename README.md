# about-javascript

## Learning

### Polling with requestAnimationFrame, WebSockets and Socket.io 
https://btholt.github.io/complete-intro-to-realtime/ 

### requestAnimationFrame
https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame


### Frontend Atomic Design
https://atomicdesign.bradfrost.com/chapter-2/#:~:text=Atoms%20are%20UI%20elements%20that,discrete%20sections%20of%20an%20interface.

![](https://atomicdesign.bradfrost.com/images/content/atomic-design-process.png)

### Micro Frontend Architecture
https://www.youtube.com/watch?v=lKKsjpH09dU&t=392s
https://single-spa.js.org/docs/getting-started-overview - Nicer way of handling micro frontend across platform
https://bit.dev/

<pre>
new ModuleFederationPlugin({
  name: "home",
  filename: "remoteEntry.js",
  remotes: {}, // Add remote in the child pages
  exposes: {
    "./Header": "./src/Header",
    "./Footer": "./src/Footer",
  }, // What the parent is exposing
  shared: {
    ...deps,
    react: {
      singleton: true,
      requiredVersion: deps.react,
    },
    "react-dom": {
      singleton: true,
      requiredVersion: deps["react-dom"],
    },
  },
}),
</pre>



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

<pre>
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    const request = entry.responseStart - entry.requestStart;
    if (request > 0) {
      console.log(`${entry.name}: Request time: ${request}ms`);
    }
  });
});

observer.observe({ type: "resource", buffered: true });
</pre>

[PerformanceObserver API](!https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/Resource_timing) is used to understand the performance of new resources.

Everything is again performed in requireIdleCallback.

Times are calculated using `window.performance.now()`;

### Testing

End to end testing - Cypress (Screen record to fetch the event using cypress chrome extension and add in the file e2e_spec.js and run cypress test)

### Page Weight
https://almanac.httparchive.org/en/2020/page-weight#fig-2


### Frontend Performance

- Bundle Splitting
  - Loading pattern is Loading Script > Parsing Script > Compiling Script > Executing Script > FCP > LCP > TTI
- Compressing Javascript
  - Brottli has higher compression ratio than Gzip [BrotliWebpackPlugin - Static Compression at build time]
  - HTTP Compression
  - Static Compression when resource is compressed in build time, higher compression. Dynamic Compression when resources are compressed on the fly, lower compressions as higher compression will take more time to do.
  - Can be checked using content-encoding header. content-encoding: br
- Dyamic Import using React lazy and suspense
- Import on Interaction 
  - Google drive share button
  - Youtube rendering a play icon and once clicked it loads the player
  - Sign In With Goggle
  - Chat widgets
- Import On Visibility
- Optimise Loading Sequence
  - By the time FCP fires, the hero image should be available for firing LCP.
  - By the time LCP fires, the JavaScript (JS) should be downloaded, parsed and ready (or already executing) to unblock interaction (FID).
  - Full Network/ CPU Utilisation - if you download the scripts sequentially, the CPU can start processing the first one as soon as it is downloaded. This results in better CPU and Network utilization.
  - Load critical CSS First (preload) required for FCP.
  - Preconnect the font domains
  - Load Above the fold images first (visible to the user on first render) (preconnect if external)
    - Parse the HTML	
    - Parse FCP resources (critical CSS, font)	
    - First Contentful Paint (FCP)	
    - Render LCP resources (Hero image, text)	
    - Largest Contentful Paint (LCP)	
    - Render important ATF images	
    - Parse Non-critical (async) CSS	
    - Execute 1P JS and hydrate	
    - First Input Delay (FID)	
- Prefetch - 
  - Magic Comment - `const EmojiPicker = import(/* webpackPrefetch: true */ "./EmojiPicker");`
  - 

- Web Accessibility
  - 30 A Criteria, 20 AA Criteria, 28 AAA Criteria
  - Perceivable, Operable, Understandable, and Robust (POUR)
  - Perceivable
    - This principle states that users must be able to perceive all essential information on the screen, and it must be conveyed to multiple senses.
    - Adding text alternatives to all non-decorative images and essential icons.
    - Adding captions, transcripts, and audio descriptions to videos.
    - Ensuring color is not the only method of conveying meaning.
  - Operable
    - For this principle, users must be able to operate the digital product's interface. The interface cannot require interaction that a user cannot perform.
    - Adding keyboard and touchscreen support to all active elements.
    - Ensuring slideshows and videos have all of the necessary controls available.
    - Giving users enough time to fill out a form or a method to extend the time.
  - Understandable
    - For this principle, users must understand the information and the operation of the user interface.
    - Writing simply—don't use a complex word when a simple one will do.
    - Ensuring your digital product has predictable navigation.
    - Ensuring error messages are clear and easy to resolve.
  - Robust
    - This principle focuses on supporting assistive technologies and ensuring that, as devices and user agents evolve, the digital product remains accessible.
    - Testing keyboard-only navigation.
    - Testing with different screen reader technologies.
    - Ensuring all of the content and functionality can be accessed, regardless of device size or orientation.
  - Aria Attributes (role, aria-describedby, aria-pressed, aria-label, aria-hidden etc) 
  - Content Structure and Semantic HTML
    - Use elements like Nav, Header, Table with th and td, Main etc.
  - Document
    - Title
    - lang="en" in html tag
    - lang="et" in inside sections if applicable
    - title in iframe tag
  - Keyboard Focus
    - tabindexes - use with caution
    - Add skip to main content so that user doesnt have to navigate through a lot of main menu links.
    - Focus Styling
  - Javascript
    - Dont use onClick on div. Keyboard functionality is not automatically applied to it. Use button instead.
    - Use aria-expanded or aria-collapsed when programatically expanding or collapsing a list.
  - Images
    - Use alt attribute on the images
  - Forms
    - Use labels on input `<label for="input">`
    - Add aria-describedby="tel-validation" on label this links the description with the label
    - Error Handling. Use required attribute, aria-required
  
### Security
- Content Security Policy - What content can be loaded, which hosts and which protocl.
- frame-ancestory policy
- XSS - Compares the length of string without html entities and see if anything is malicious there.. 
- XSRF - xsrf token header is appended to each request. on backend it is stored on session.
- Akamai
- SQL Injections - ORM handles it internally.
- nonce

### Web Vitals
- LCP <2.5s good >4s poor
- FID  <100ms is good
- CLS <0.1 is good (impact fraction*distance fraction)
- Interaction to Next Paint <200ms is good.

### Implement Custom Promise
[Solution](solution/custom-promise.js)

### How v8 Works

https://dev.to/lydiahallie/javascript-visualized-the-javascript-engine-4cdf

- The HTML parser encounters a script tag
- Response is the requested script as a stream of bytes
- Byte stream decoder decodes the stream of bytes as it’s being downloaded.
- Byte stream decoder creates tokens from the decoded stream of bytes
- For example, 0066 decodes to f, 0075 to u, 006e to n, 0063 to c, 0074 to t, 0069 to i, 006f to o, and 006e to n followed by a white space. Seems like you wrote function
- This is a reserved keyword in JavaScript, a token gets created, and sent to the parser
- The parser creates nodes based on the tokens it receives from the byte stream decoder.
- With these nodes, it creates an Abstract Syntax Tree, or AST.
- Interpreter which walks through the AST, and generates byte code
- Once the byte code has been generated fully, the AST is deleted, clearing up memory space
- The optimizing compiler takes the byte code and type feedback, and generates highly optimized machine code from these.
