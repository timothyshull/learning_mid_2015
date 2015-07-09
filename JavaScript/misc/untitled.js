var dominant = function (n) {
    var result = 0, i;
    for (i = 0; i < n; i += 1) {
        result += 1;
    }
    return result;
}

// constant time
var constant = function (n) {
    var result = n * n;
    return result;
}

// logarithmic time
var logarithmic = function (n) {
    var result = 0;
    while (n > 1) {
        n = n / 2;
        result += 1;
    }
    return result;
}

// linear time
var linear = function (n, A) {
    var i;
    for (i = 0; i < n; i += 1) {
        if (A[i] === 0) {
            return 0;
        }
    }
    return 1;
}

// quadratic time
var quadratic = function (n) {
    var result = 0, i, j;
    for (i = 0; i < n; i += 1) {
        for (j = i; j < n; j += 1) {
            result += 1;
        }
    }
    return result;
}

// linear time with two variables
var linear2 = function (n, m) {
    result = 0, i, j;
    for (i = 0; i < n; i += 1) {
        result += 1;
    }
    for (j = 0; j < m; j += 1) {
        result += j;
    }
    return result;
}

// factorial computation
/**
var factorial = function (n) {
    var result = n, i;
    for (i = n - 1; i > 0; i -= 1) {
        result *= i;
    }
    return result;
}
*/

// factorial time
var factorial = function (n) {
    var looper = function (m) {
        var result = 0, i, j;
        for (i = 0; i < m; i += 1) {
            for (j = 0; j < m - 1; j += 1) {
                result += 1;
            }
        }
        return result;
    }
}