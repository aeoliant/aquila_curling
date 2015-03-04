function drawPicksTable(data, seperatedScores) {
    for (var i = 0; i < data.length; i++) {
        drawPicksRow(data[i]);
        if (i == Math.floor(data.length / 2)) {
            drawStandingsRow(seperatedScores);
        }
    }
}

function drawPicksRow(rowData) {
    var row = $("<tr />")
    $("#picks").append(row);
    row.append($("<td class='edge'><strong>" + rowData.name + "</strong></td>"));
    row.append($(arrToString(rowData.topFour, "td", false, true)));
    row.append($(arrToString(rowData.midSix, "td", false, true)));
    row.append($(arrToString(rowData.botFour, "td", false, false)));
}

function drawStandingsRow(seperatedScores) {
    var row = $("<tr />")
    $("#picks").append(row);
    row.append($("<td class='edge'></td>"));
    row.append($(arrToString(seperatedScores.topFour, "td", true, true)));
    row.append($(arrToString(seperatedScores.midSix, "td", true, true)));
    row.append($(arrToString(seperatedScores.botFour, "td", true, false)));
}

function drawScoreTable(data) {
    for (var i = 0; i < data.length; i++) {
        drawScoreRow(data[i]);
    }
}

function drawScoreRow(rowData) {
    var row = $("<tr />")
    $("#scores").append(row);
    row.append($("<td><strong>" + rowData.name + "</strong></td>"));
    row.append($("<td>" + rowData.score + "</td>"));
    row.append($("<td class='text-muted'><small>" + rowData.exactScore + "</small></td>"));
}

function arrToString(arr, tag, standings, edge) {
    var ret = "";
    var i = 0;
    for (; i < arr.length; i++) {
        if (edge && i == arr.length - 1) {
            ret += "<" + tag + " class='edge'>";
        }
        else {
            ret += "<" + tag + ">";
        }
        if (standings) {
            ret += "<strong><etch>";
        }
        ret += printTransform(arr[i]);
        if (standings) {
            ret += "</etch></strong>";
        }
        ret += "</" + tag + "> ";
    }
    return ret;
}

function printTransform(provinceCode) {
    var nwt = provinceCode.indexOf("NWT");
    console.log(provinceCode, nwt);
    if (nwt >= 0) {
        return provinceCode.substring(0, nwt) + "NW" + provinceCode.substring(nwt + 3, provinceCode.length);
    }
    var pei = provinceCode.indexOf("PEI");
    console.log(provinceCode, pei);
    if (pei >= 0) {
        return provinceCode.substring(0, pei) + "PE" + provinceCode.substring(pei + 3, provinceCode.length);
    }
    return provinceCode;
}

function score(scores) {
    var i = 0;
    var ret = [];
    for (; i < picks.length; i++) {
        var ele = {};
        ele.name = picks[i].name;
        var score = 0;
        var exactScore = 0;
        var j = 0;
        for (; j < 4; j++) {
            if (scores.topFour.indexOf(picks[i].topFour[j]) >= 0) {
                score++;
                if (scores.topFour[j] == picks[i].topFour[j]) {
                    picks[i].topFour[j] = "<mark><strong>" + picks[i].topFour[j] + "</strong></mark>";
                    exactScore++;
                }
                else {
                    picks[i].topFour[j] = "<highlight><strong>" + picks[i].topFour[j] + "</strong></highlight>";
                }
            }
            else {
                picks[i].topFour[j] = "<wrong><strong>" + picks[i].topFour[j] + "</strong></wrong>";
            }
        }
        for (j = 0; j < 6; j++) {
            if (scores.midSix.indexOf(picks[i].midSix[j]) >= 0) {
                score++;
                if (scores.midSix[j] == picks[i].midSix[j]) {
                    picks[i].midSix[j] = "<mark><strong>" + picks[i].midSix[j] + "</strong></mark>";
                    exactScore++;
                }
                else {
                    picks[i].midSix[j] = "<highlight><strong>" + picks[i].midSix[j] + "</strong></highlight>";
                }
            }
            else {
                picks[i].midSix[j] = "<wrong><strong>" + picks[i].midSix[j] + "</strong></wrong>";
            }
        }
        for (j = 0; j < 4; j++) {
            if (scores.botFour.indexOf(picks[i].botFour[j]) >= 0) {
                score++;
                if (scores.botFour[j] == picks[i].botFour[j]) {
                    picks[i].botFour[j] = "<mark><strong>" + picks[i].botFour[j] + "</strong></mark>";
                    exactScore++;
                }
                else {
                    picks[i].botFour[j] = "<highlight><strong>" + picks[i].botFour[j] + "</strong></highlight>";
                }
            }
            else {
                picks[i].botFour[j] = "<wrong><strong>" + picks[i].botFour[j] + "</strong></wrong>";
            }
        }
        ele.exactScore = exactScore;
        ele.score = score;
        ret[i] = ele;
    }
    return ret;
}

function getTeamCode(teamName) {
    if (teamName == "Northern Ontario (Jacobs)") {
        return "NO";
    }
    if (teamName == "Newfoundland and Labrador (Gushue)") {
        return "NL";
    }
    if (teamName == "Ontario (Kean)") {
        return "ON";
    }
    if (teamName == "Saskatchewan (Laycock)") {
        return "SK";
    }
    if (teamName == "Prince Edward Island (Casey)") {
        return "PEI";
    }
    if (teamName == "British Columbia (Cotter)") {
        return "BC";
    }
    if (teamName == "Québec (Ménard)") {
        return "QC";
    }
    if (teamName == "Team Canada (Morris)") {
        return "TC";
    }
    if (teamName == "Alberta (Koe)") {
        return "AB";
    }
    if (teamName == "Manitoba (Carruthers)") {
        return "MB";
    }
    if (teamName == "New Brunswick (Mallais)") {
        return "NB";
    }
    if (teamName == "Northwest Territories (Koe)") {
        return "NWT";
    }
    // Nova Scotia and Yukon already out
}

function makeScores(standings) {
    var scores = {};
    var j = 0;
    scores.topFour = [];
    scores.midSix = [];
    scores.botFour = [];
    for (; j < 4; j++) {
        scores.topFour.push(standings[j].name);
    }
    for (; j < 10; j++) {
        scores.midSix.push(standings[j].name);
    }
    for (; j < 12; j++) {
        scores.botFour.push(standings[j].name);
    }
    // Nova Scotia and Yukon already out
    scores.botFour.push("YK");
    scores.botFour.push("NS");
    return scores;
}

function stableScoreSort(a, b) {
    if (a.score == b.score) {
        if (a.exactScore == b.exactScore) {
            return b.position - a.position;
        }
        return b.exactScore - a.exactScore;
    }
    return b.score - a.score;
}

$(function() {

    $.getJSON('http://whateverorigin.org/get?url=' + encodeURIComponent("http://curlcast.ca/stats/organizations/qw4LUsJ1_aQ/competitions/1630-2015-tim-hortons-brier/standings") + '&callback=?', function(data) {
        var otherPage = $('<div/>').html(data.contents).contents();
        $("#curlcast").append(otherPage.find("table")[0]);
        $("#curlcast table").removeClass("table-bordered table-condensed");
        $("#curlcast table").addClass("table-striped");
        $.each($("#curlcast a"), function(index, atag) {
            var jtag = $(atag);
            jtag.attr("href", "http://curlcast.ca" + jtag.attr("href"));
        });
        $("#curlcast a").attr("title", "");
        $("#curlcast a").attr("target", "_blank");
        var standingsTable = $("#curlcast table tr").map(function() {
            return $(this).find("td").map(function() {
                return $(this).html();
            }).get();
        }).get();
        var i = 0;
        var standings = [];
        for (; i < standingsTable.length; i += 3) {
        	var index = Math.floor(i / 3);
            standings[index] = {};
            standings[index].name = getTeamCode($(standingsTable[i]).text());
            standings[index].wins = standingsTable[i + 1];
            standings[index].losses = standingsTable[i + 2];
            standings[index].ratio = standings[index].wins / standings[index].losses;
        }
        var seperatedScores = makeScores(standings);
        var scores = score(seperatedScores);
        for (i = 0; i < scores.length; i ++) {
            scores[i].position = i;
            picks[i].position = i;
            picks[i].score = scores[i].score;
            picks[i].exactScore = scores[i].exactScore;
        }

        scores.sort(stableScoreSort);
        picks.sort(stableScoreSort);

        drawScoreTable(scores);
        drawPicksTable(picks, seperatedScores);
        $("#curlcast").append("<p class='text-muted'>Note: Yukon and Nova Scotia were eliminated in the pre-qualifier round robin.</p>");
    });
});
