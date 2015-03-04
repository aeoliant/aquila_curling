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
    row.append($("<td><strong>" + rowData.name + "</strong></td>"));
    row.append($("<td>" + arrToString(rowData.topFour) + "</td>"));
    row.append($("<td>" + arrToString(rowData.midSix) + "</td>"));
    row.append($("<td>" + arrToString(rowData.botFour) + "</td>"));
    row.append($("<td><small>" + rowData.score + "</small></td>"));
    row.append($("<td class='text-muted'><small>" + rowData.exactScore + "</small></td>"));
}

function drawStandingsRow(seperatedScores) {
    var row = $("<tr />")
    $("#picks").append(row);
    row.append($("<td></td>"));
    row.append($("<td class='text-'><strong>" + arrToString(seperatedScores.topFour, "etch") + "</strong></td>"));
    row.append($("<td class='text-'><strong>" + arrToString(seperatedScores.midSix, "etch") + "</strong></td>"));
    row.append($("<td class='text-'><strong>" + arrToString(seperatedScores.botFour, "etch") + "</strong></td>"));
    row.append($("<td></td>"));
    row.append($("<td></td>"));
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

function arrToString(arr, tag) {
    var ret = "";
    var i = 0;
    for (; i < arr.length; i++) {
        if (tag != undefined) {
            ret += "<" + tag + ">" + arr[i] + "</" + tag + ">, ";
        }
        else {
            ret += arr[i] + ", ";
        }
    }
    ret = ret.substring(0, ret.length - 2);
    return ret;
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
                picks[i].topFour[j] = "<em>" + picks[i].topFour[j] + "</em>";
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
                picks[i].midSix[j] = "<em>" + picks[i].midSix[j] + "</em>";
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
                picks[i].botFour[j] = "<em>" + picks[i].botFour[j] + "</em>";
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
        $("#curlcast a").attr("href", "http://curlcast.ca" + $("#curlcast a").attr("href"));
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
