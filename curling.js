function drawPicksTable(data) {
    for (var i = 0; i < data.length; i++) {
        drawPicksRow(data[i]);
    }
}

function drawPicksRow(rowData) {
    var row = $("<tr />")
    $("#picks").append(row);
    row.append($("<td><strong>" + rowData.name + "</strong></td>"));
    row.append($("<td>" + arrToString(rowData.topFour) + "</td>"));
    row.append($("<td>" + arrToString(rowData.midSix) + "</td>"));
    row.append($("<td>" + arrToString(rowData.botFour) + "</td>"));
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
}

function arrToString(arr) {
    var ret = "";
    var i = 0;
    for (; i < arr.length; i++) {
        ret += arr[i] + ", "
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
        var j = 0;
        for (; j < 4; j++) {
            if (scores.topFour.indexOf(picks[i].topFour[j]) >= 0) {
                picks[i].topFour[j] = "<strong>" + picks[i].topFour[j] + "</strong>"
                score++;
            }
        }
        for (j = 0; j < 6; j++) {
            if (scores.midSix.indexOf(picks[i].midSix[j]) >= 0) {
                picks[i].midSix[j] = "<strong>" + picks[i].midSix[j] + "</strong>"
                score++;
            }
        }
        for (j = 0; j < 4; j++) {
            if (scores.botFour.indexOf(picks[i].botFour[j]) >= 0) {
                picks[i].botFour[j] = "<strong>" + picks[i].botFour[j] + "</strong>"
                score++;
            }
        }
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
    scores.botFour.push("NS");
    scores.botFour.push("YK");
    return scores;
}

$(function() {

    $.getJSON('http://whateverorigin.org/get?url=' + encodeURIComponent("http://curlcast.ca/stats/organizations/qw4LUsJ1_aQ/competitions/1630-2015-tim-hortons-brier/standings") + '&callback=?', function(data) {
        var otherPage = $('<div/>').html(data.contents).contents();
        $("#curlcast").append(otherPage.find("table")[1]);
        $("#curlcast table").removeClass("table-bordered table-condensed");
        $("#curlcast table").addClass("table-striped");
        $("#curlcast a").attr("href", "http://curlcast.ca" + $("#curlcast a").attr("href"));
        $("#curlcast a").attr("title", "");
        var standingsTable = $("#curlcast table tr").map(function() {
            return $(this).find("td").map(function() {
                return $(this).html();
            }).get();
        }).get();
        var i = 0;
        var standings = [];
        for (; i < standingsTable.length; i += 3) {
            standings[i] = {};
            standings[i].name = getTeamCode($(standingsTable[i]).text());
            standings[i].wins = standingsTable[i + 1];
            standings[i].losses = standingsTable[i + 2];
            standings[i].ratio = standings[i].wins / standings[i].losses;
        }
        standings.sort(function(a, b) {
            return b.ratio - a.ratio;
        });
        var scores = score(makeScores(standings));
        scores.sort(function(a, b) {
            return b.score - a.score;
        });
        drawScoreTable(scores);
        drawPicksTable(picks);
        $("#curlcast").append("<p class='text-muted'>Note: Yukon and Nova Scotia were eliminated in the pre-qualifier round robin.</p>");
    });
});