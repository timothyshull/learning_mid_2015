function CSVToArray(strData, strDelimiter) {
    "use strict";
    strDelimiter = (strDelimiter || ",");
    var objPattern = new RegExp(("(\\" + strDelimiter + "|\\r?\\n|\\r|^)" + "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" + "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi"),
        arrData = [[]],
        arrMatches = null,
        strMatchedDelimiter,
        strMatchedValue;

    while (objPattern.exec(strData)) {
        arrMatches = objPattern.exec(strData);
        strMatchedDelimiter = arrMatches[1];
        if (strMatchedDelimiter.length && (strMatchedDelimiter !== strDelimiter)) {
            arrData.push([]);
        }
        if (arrMatches[2]) {
            strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");
        } else {
            strMatchedValue = arrMatches[3];
        }
        arrData[arrData.length - 1].push(strMatchedValue);
    }
    return arrData;
}
