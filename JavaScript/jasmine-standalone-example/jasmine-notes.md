Matchers
- toBe - tests with ===
- toBeCloseTo - takes a precision and tests that the actual falls within the precision range of the expected
- toBeDefined - tests that value is not undefined
- toBeFalsy - tests that value is one of the falsy values
- toBeGreaterThan - 
- toBeLessThan
- toBeNaN
- toBeNull
- toBeTruthy
- toBeUndefined
- toContain
- toEqual
- toHaveBeenCalled - for spies
- toHaveBeenCalledWith - to test spies were called with a specific set of arguments
- toMatch - tests that a string contains a match against a regular expression
- toThrow
- toThrowError

describe - defines a suite of specs
xdescribe - used to describe a suite that will not be run
fdescribe - used to focus a suite, which makes it the only run suite
it - defines a spec
xit - used to describe a test that will not be run but will be marked as pending
fit - used to focus a spec, which will make it the only run spec
beforeEach - a function that is defined within a describe block and run once before each spec within the block 
afterEach - a function that is defined within a describe block and run once after each spec within the block
beforeAll - run once within a describe block before all tests are run (not reset between each spec in the block)
afterAll - run once within a describe block after all tests are run (not reset between each spec in the block)
expect - a function that takes an actual value for an expectation which is compared with a matcher
pending - if called anywhere within a spec, the spec will be marked as pending
fail - used to explicitly fail a spec with a message
spyOn - removed after each spec (so must be used with a beforeEach for multiple specs), a spy can serve as a test double 
for any function or method and by default blocks the continuation of the call and tracks all arguments of the call

##spyOn methods
callThrough - still tracks but calls the actual implementation
returnValue - sets a specific value for all calls to return
returnValues - same as above but returns multiple values for method chaining, etc
throwError - all calls to spy will throw the prescribed error
callFake - delegates the tracked spy to call the fake function
stub - can be called in a spec to return a function to its original stubbing behavior (the defined behavior before the
temporary behavior used for a call strategy)

###other tracking properties
- calls property
- calls.any() - false if the spy has not been called at all, true if called
- call.count() - returns # of times the spy has been called
- call.argsFor(index) - returns args passed to the call numbered (index)
- call.allArgs() - returns the arguments to all calls
- calls.all() - returns the context (this) passed to all calls
- calls.mostRecent - returns the context (this) of the most recent call
- call.first() - returns the context (this) of the first call
- calls.reset() - clears the tracking for a spy

createSpy - creates an empty spy with no implementation behind it
createSpyObj - creates a mock object with multiple spies (each subsequent string in the declaration is a method as a 
on the object that is a spy

jasmine.any takes a constructor as an expected value and returns true if the constructor matches the constructor of the 
actual value

jasmine.anything - true if the actual value is not null or undefined

jasmine.objectContaining - returns true if the expected object contains the key/value pairs inside the object passed as
argument

jasmine.arrayContaining - returns true if all of the values in the array passed as an argument are contained in the 
array passed as the expected value

jasmine.stringMatching - used in a portion of anything passed to match a string a larger object exactly, or match a 
portion of a string in a spy expectation

jasmine.asymmetricMatch - used to define rules for how an actual value in a matcher can be modified to meet certain 
matching criteria

jasmine.clock()
jasmine.clock().mockDate()

##Async
- use the optional single argument done to pass to beforeEach, it, and afterEach as a callback that controls flow when 
async works is done
- specs do not start until the done() in before each is called
- specs do not complete until the done() in the it block is called
- afterEach calls do not move on until done() is called within the afterEach
- Jasmine defaults to wating 5 seconds before failing a test by causing a timeout failure
- jasmine.DEFAULT_TIMEOUT_INTERVAL can be used to set the timeout for a suite

##Testing ajax functions
- download jasmine-ajax plugin as mock-ajax.js
- use jasmine.Ajax.install() in beforeEach for all specs in a suite to stub out XMLHttpRequest
- use uninstall() to remove it for any that do real ajax calls
- use mostRecent() to return an object with the properties on the most recent ajax call
- use respondWith to specify an object with properties that correspond to real http request response
- use responseText to return the response as a string
- use stubRequest with the url when you want to immediately return the request and use andReturn() to return what would 
be returned in respondWith
