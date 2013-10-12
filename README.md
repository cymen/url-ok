# url-ok

url-ok is a http and https status checker for URLs with timeout

## Example of a successful run

    # url-ok http://www.google.com/ http://www.microsoft.com/ http://www.apple.com/ --verbose
    Waiting up to 120 seconds for response(s).
    Requesting http://www.google.com/
    Requesting http://www.microsoft.com/
    Requesting http://www.apple.com/
    200 'http://www.google.com/'
    200 'http://www.apple.com/'
    200 'http://www.microsoft.com/'
    Received successful response for all URLs.

    # echo $?
    0

## Example of failing run

    # url-ok http://no.such.server.localhost/ --timeout 10 --verbose
    Waiting up to 10 seconds for response(s).
    Requesting http://no.such.server.localhost/
    Aborting after 10 seconds!
    At least one URL failed to respond!

    # echo $?
    1
