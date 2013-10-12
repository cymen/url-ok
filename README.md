# url-ok

`url-ok` is a HTTP and HTTPS status checker for URLs. The default timeout is 120 seconds at
which point it will abort the checks and the process will have an exit code of 1. If all
the checks are successfull (success is defined as returning 200), the process will have an
exit code of 0.

If a URL cannot be reached, it will continue to try to reach the URL every 500 milleseconds
up to the timeout. For HTTP, it uses a HEAD request while for HTTPS it uses GET.

## Options

--timeout to set a specific timeout in seconds
--verbose to enable verbose output

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
