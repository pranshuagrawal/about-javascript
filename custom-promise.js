const STATE = {
  PENDING: "PENDING",
  FULFILLED: "FULFILLED",
  REJECTED: "REJECTED",
};
function CustomPromise(executorFn) {
  this.value = undefined;
  this.state = STATE.PENDING;
  this.thenCallbacks = [];
  this.catchCallbacks = [];
  this.resolve = resolve.bind(this);
  this.reject = reject.bind(this);
  this.then = then.bind(this);
  this.catch = catchCb.bind(this);
  this.finallyCb = finallyCb.bind(this);
  this.runCallbacks = runCallbacks.bind(this);

  try {
    executorFn(this.resolve, this.reject);
  } catch (error) {
    this.reject(error);
  }

  function runCallbacks() {
    if (this.state === STATE.FULFILLED) {
      const value = this.value;
      this.thenCallbacks.forEach((callback) => callback(value));
      this.thenCallbacks = [];
    } else if (this.state === STATE.REJECTED) {
      const value = this.value;
      this.catchCallbacks.forEach((callback) => callback(value));
      this.catchCallbacks = [];
    }
  }

  function resolve(value) {
    queueMicrotask(() => {
      if (this.state !== STATE.PENDING) {
        return;
      }
      if (value instanceof CustomPromise) {
        return value.then(this.resolve, this.reject);
      }
      this.value = value;
      this.state = STATE.FULFILLED;
      this.runCallbacks();
    })
    
  }

  function reject(value) {
    queueMicrotask(() => {
      if (this.state !== STATE.PENDING) {
        return;
      }
      if (value instanceof CustomPromise) {
        return value.then(this.resolve, this.reject);
      }
      this.value = value;
      this.state = STATE.REJECTED;
      this.runCallbacks();
    })
    
  }

  function then(thenCb, catchCb) {
    const self = this;
    return new CustomPromise((resolve, reject) => {
      self.thenCallbacks.push((result) => {
        if (!thenCb) {
          return resolve(result);
        }
        try {
          resolve(thenCb(result));
        } catch(error) {
          reject(error);
        }
      });

      self.catchCallbacks.push((result) => {
        if (!catchCb) {
          return reject(result);
        }
        try {
          resolve(catchCb(result));
        } catch (error){
          reject(error);
        }
      });
      self.runCallbacks();
    });
  }

  function catchCb(error) {
    return this.then(null, error);
  }

  function finallyCb(cb) {
    return this.then(
      (result) => {
        cb();
        return result;
      },
      (result) => {
        cb();
        throw result;
      }
    );
  }
}
